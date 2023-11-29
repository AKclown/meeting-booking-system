import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';
import { Between, EntityManager, Like } from 'typeorm';
import { BOOKING_STATUE, Booking } from './entity/booking.entity';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject()
  private redisService: RedisService;

  @Inject()
  private emailService: EmailService;

  async initData() {
    const user1 = await this.entityManager.findOneBy(User, {
      id: 5,
    });
    const user2 = await this.entityManager.findOneBy(User, {
      id: 6,
    });

    const room1 = await this.entityManager.findOneBy(MeetingRoom, {
      id: 1,
    });
    const room2 = await this.entityManager.findOneBy(MeetingRoom, {
      id: 2,
    });

    const booking1 = new Booking();
    booking1.room = room1;
    booking1.user = user1;
    booking1.startTime = new Date();
    booking1.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManager.save(Booking, booking1);

    const booking2 = new Booking();
    booking2.room = room2;
    booking2.user = user2;
    booking2.startTime = new Date();
    booking2.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManager.save(Booking, booking2);

    const booking3 = new Booking();
    booking3.room = room1;
    booking3.user = user2;
    booking3.startTime = new Date();
    booking3.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManager.save(Booking, booking3);

    const booking4 = new Booking();
    booking4.room = room2;
    booking4.user = user1;
    booking4.startTime = new Date();
    booking4.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManager.save(Booking, booking4);
  }

  async list(
    pageNo: number,
    pageSize: number,
    username: string,
    meetingRoomName: string,
    meetingRoomPosition: string,
    bookingTimeRangeStart: number,
    bookingTimeRangeEnd: number,
  ) {
    if (pageNo < 1) {
      throw new BadRequestException('页码最小为1');
    }

    const skipCount = (pageNo - 1) * pageSize;

    const condition: Record<string, any> = {};

    if (username) {
      condition.user = {
        username: Like(`%${username}%`),
      };
    }

    if (meetingRoomName) {
      condition.room = {
        name: Like(`%${meetingRoomName}%`),
      };
    }

    if (meetingRoomPosition) {
      if (!condition.room) {
        condition.room = {};
      }
      condition.room.location = Like(`%${meetingRoomPosition}%`);
    }

    if (bookingTimeRangeStart) {
      if (!bookingTimeRangeEnd) {
        bookingTimeRangeEnd = bookingTimeRangeStart + 60 * 60 * 1000;
      }
      condition.startTime = Between(
        new Date(bookingTimeRangeStart),
        new Date(bookingTimeRangeEnd),
      );
    }

    const [bookings, totalCount] = await this.entityManager.findAndCount(
      Booking,
      {
        skip: skipCount,
        take: pageSize,
        where: condition,
        relations: {
          user: true,
          room: true,
        },
      },
    );

    return {
      bookings: bookings.map((item) => {
        delete item.user.password;
        return item;
      }),
      totalCount,
    };
  }

  async apply(id: number) {
    return this.entityManager.update(
      Booking,
      { id },
      { status: BOOKING_STATUE.APPROVED },
    );
  }

  async reject(id: number) {
    return this.entityManager.update(
      Booking,
      { id },
      { status: BOOKING_STATUE.APPROVED_REJECTED },
    );
  }

  async unbind(id: number) {
    return this.entityManager.update(
      Booking,
      { id },
      { status: BOOKING_STATUE.DISMISSED },
    );
  }

  async urge(id: number) {
    // $ 半小时只能催办一次

    const flag = await this.redisService.get(`urge_${id}`);

    if (flag) {
      return '半小时内只能催办一次，请耐心等待';
    }

    let email = await this.redisService.get('admin_email');
    if (!email) {
      const admin = await this.entityManager.findOne(User, {
        select: {
          email: true,
        },
        where: {
          isAdmin: true,
        },
      });

      email = admin.email;
      this.redisService.set('admin_email', email);
    }

    this.emailService.sendMail({
      to: email,
      subject: '预定申请催办提醒',
      // 这里最好附带一个处理申请链接
      html: `id 为 ${id} 的预定申请正在等待审批`,
    });

    this.redisService.set('urge_' + id, 1, 60 * 30);
  }
}

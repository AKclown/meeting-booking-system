import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { generateParseIntPipe } from 'src/utils';
import { BOOKING_STATUE } from './entity/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('meetingRoomPosition') meetingRoomPosition: string,
    @Query('bookingTimeRangeStart') bookingTimeRangeStart: number,
    @Query('bookingTimeRangeEnd') bookingTimeRangeEnd: number,
  ) {
    return await this.bookingService.list(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
    );
  }

  @Get('apply/:id')
  async apply(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.apply(id);
    return BOOKING_STATUE.APPROVED;
  }

  @Get('reject/:id')
  async reject(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.reject(id);
    return BOOKING_STATUE.APPROVED_REJECTED;
  }

  @Get('unbind/:id')
  async unbind(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.unbind(id);
    return BOOKING_STATUE.DISMISSED;
  }

  @Get('urge/:id')
  async urge(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.urge(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';

export class BookingVo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  room: MeetingRoom;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;
}

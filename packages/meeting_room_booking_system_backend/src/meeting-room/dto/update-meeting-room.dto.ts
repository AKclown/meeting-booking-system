import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateMeetingRoomDto } from './create-meeting-room.dto';

export class UpdateMeetingRoomDto extends PartialType(CreateMeetingRoomDto) {
  @IsNotEmpty({
    message: '会议室ID不能为空',
  })
  id: number;
}

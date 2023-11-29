import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateMeetingRoomDto } from './create-meeting-room.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMeetingRoomDto extends PartialType(CreateMeetingRoomDto) {
  @ApiProperty()
  @IsNotEmpty({
    message: '会议室ID不能为空',
  })
  id: number;
}

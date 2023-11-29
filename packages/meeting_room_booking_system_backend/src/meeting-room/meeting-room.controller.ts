import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { generateParseIntPipe } from 'src/utils';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Controller('meeting_room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) { }

  @Get('init-data')
  async initData() {
    // !!! 生成环境不会这么去初始化数据
    this.meetingRoomService.initData();
  }

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
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
    @Query('location') location: string,

  ) {
    return await this.meetingRoomService.list(pageNo, pageSize, name, capacity, equipment, location);
  }

  @Post('create')
  async create(@Body() meetingRoomDto: CreateMeetingRoomDto) {
    await this.meetingRoomService.create(meetingRoomDto);
    return '新增成功';
  }

  @Put('update')
  async update(@Body() meetingRoomDto: UpdateMeetingRoomDto) {
    await this.meetingRoomService.update(meetingRoomDto);
    return '更新成功';
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.meetingRoomService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.meetingRoomService.delete(id);
    return '删除成功';
  }
}

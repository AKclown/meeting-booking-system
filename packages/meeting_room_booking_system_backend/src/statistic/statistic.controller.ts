import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserBookingCountVo } from './vo/user-booking-count.vo';
import { MeetingRoomUsedCountVo } from './vo/meeting-room-used-count.vo';

@ApiTags('统计模块')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) { }

  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserBookingCountVo,
    description: '用户预约次数数据',
  })
  @Get('userBookingCount')
  async userBookingCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.userBookingCount(startTime, endTime);
  }

  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MeetingRoomUsedCountVo,
    description: '会议室被使用次数数据',
  })
  @Get('meetingRoomUsedCount')
  async meetingRoomUsedCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.meetingRoomUsedCount(startTime, endTime);
  }
}

import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { generateParseIntPipe } from 'src/utils';
import { BOOKING_STATUE } from './entity/booking.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequireLogin } from 'src/custom.decorator';
import { BookingListVo } from './vo/booking-list.vo';

@ApiTags('预约模块')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNo',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'username',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'meetingRoomName',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'meetingRoomPosition',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'bookingTimeRangeStart',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'bookingTimeRangeEnd',
    type: String,
    required: false,
  })
  @ApiResponse({
    type: BookingListVo,
  })
  @RequireLogin()
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

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: '会议室ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: BOOKING_STATUE.APPROVED,
  })
  @RequireLogin()
  @Get('apply/:id')
  async apply(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.apply(id);
    return BOOKING_STATUE.APPROVED;
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: '会议室ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: BOOKING_STATUE.APPROVED_REJECTED,
  })
  @RequireLogin()
  @Get('reject/:id')
  async reject(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.reject(id);
    return BOOKING_STATUE.APPROVED_REJECTED;
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: '会议室ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: BOOKING_STATUE.DISMISSED,
  })
  @RequireLogin()
  @Get('unbind/:id')
  async unbind(@Param('id', ParseIntPipe) id: number) {
    await this.bookingService.unbind(id);
    return BOOKING_STATUE.DISMISSED;
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: '会议室ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
    description: BOOKING_STATUE.DISMISSED,
  })
  @RequireLogin()
  @Get('urge/:id')
  async urge(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.urge(id);
  }
}

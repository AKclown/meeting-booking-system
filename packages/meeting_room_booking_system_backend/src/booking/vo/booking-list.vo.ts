import { ApiProperty } from '@nestjs/swagger';
import { BookingVo } from './booking.vo';

export class BookingListVo {
  @ApiProperty({
    type: [BookingVo],
  })
  bookings: Array<BookingVo>;

  @ApiProperty()
  totalCount: number;
}

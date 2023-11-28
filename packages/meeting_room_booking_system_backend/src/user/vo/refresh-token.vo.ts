import { ApiProperty } from '@nestjs/swagger';

export class refreshTokenVo {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

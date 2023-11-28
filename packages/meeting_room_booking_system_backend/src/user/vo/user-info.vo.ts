import { ApiProperty } from '@nestjs/swagger';
export class UserDetailVo {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'akclown' })
  username: string;

  @ApiProperty({ example: '角落里' })
  nickName: string;

  @ApiProperty({ example: '1376513637@qq.com' })
  email: string;

  @ApiProperty({ example: 'akclown.png' })
  headPic: string;

  @ApiProperty({ example: '12345678910' })
  phoneNumber: string;

  @ApiProperty({ example: false })
  isFrozen: boolean;

  @ApiProperty()
  createTime: Date;
}

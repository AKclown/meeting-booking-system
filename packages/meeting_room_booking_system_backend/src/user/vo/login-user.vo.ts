import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../entities/permission.entity';

export class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'akclown' })
  username: string;

  @ApiProperty({ example: '角落里' })
  nickName: string;

  @ApiProperty({ example: '1376513637@qq.com' })
  email: string;

  @ApiProperty({ example: 'akclown.jpg' })
  headPic: string;

  @ApiProperty({ example: '12345678910' })
  phoneNumber: string;

  @ApiProperty()
  isFrozen: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createTime: number;

  @ApiProperty({ example: ['管理员'] })
  roles: string[];

  @ApiProperty({
    type: [Permission],
  })
  permissions: Permission[];
}

export class LoginUserVo {
  @ApiProperty()
  userInfo: UserInfo;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

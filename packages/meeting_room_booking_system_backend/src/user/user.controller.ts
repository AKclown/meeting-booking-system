import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  Query,
  UnauthorizedException,
  DefaultValuePipe,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user-dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserInfo as IUserInfo, LoginUserVo } from './vo/login-user.vo';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserDetailVo } from './vo/user-info.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { generateParseIntPipe } from 'src/utils';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { refreshTokenVo } from './vo/refresh-token.vo';
import { UserListVo } from './vo/user-list.vo';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage } from 'src/my-file-storage';

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get('init-data')
  async initData() {
    // !!! 生成环境不会这么去初始化数据
    await this.userService.initData();
    return '初始化数据成功';
  }

  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '验证码已失效/验证码不正确/用户已存在',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '注册成功/失败',
    type: String,
  })
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '用户不存在/密码错误',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserVo,
  })
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, false);
    vo.accessToken = this.getAccessToken(vo.userInfo);
    vo.refreshToken = this.getRefreshToken(vo.userInfo.id);
    return vo;
  }

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '用户不存在/密码错误',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserVo,
  })
  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, true);
    vo.accessToken = this.getAccessToken(vo.userInfo);

    vo.refreshToken = this.getRefreshToken(vo.userInfo.id);
    return vo;
  }

  @ApiQuery({
    name: 'refreshToken',
    description: '刷新 token',
    example: 'Bearer xxx',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'token已失效，请重新登录',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '刷新成功',
    type: refreshTokenVo,
  })
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId, false);

      const accessToken = this.getAccessToken(user);

      const newRefreshToken = this.getRefreshToken(user.id);

      const vo = new refreshTokenVo();
      vo.accessToken = accessToken;
      vo.refreshToken = newRefreshToken;

      return vo;
    } catch (error) {
      throw new UnauthorizedException('token已失效，请重新登录');
    }
  }

  @ApiQuery({
    name: 'refreshToken',
    description: '刷新 token',
    example: 'Bearer xxx',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'token已失效，请重新登录',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '刷新成功',
    type: refreshTokenVo,
  })
  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId, true);

      const accessToken = this.getAccessToken(user);
      const newRefreshToken = this.getRefreshToken(user.id);

      const vo = new refreshTokenVo();
      vo.accessToken = accessToken;
      vo.refreshToken = newRefreshToken;

      return vo;
    } catch (error) {
      throw new UnauthorizedException('token已失效，请重新登录');
    }
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: UserDetailVo,
  })
  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);
    const vo = new UserDetailVo();
    vo.id = user.id;
    vo.email = user.email;
    vo.username = user.username;
    vo.headPic = user.headPic;
    vo.phoneNumber = user.phoneNumber;
    vo.nickName = user.nickName;
    vo.createTime = user.createTime;
    vo.isFrozen = user.isFrozen;

    return vo;
  }

  @ApiBody({
    type: UpdateUserPasswordDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '验证码已失效/验证码不正确/邮箱不正确',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '密码修改成功/失败',
    type: String,
  })
  @Post(['update_password', 'admin/update_password'])
  async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
    return await this.userService.updatePassword(passwordDto);
  }

  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '验证码已失效/验证码不正确',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息修改成功/失败',
    type: String,
  })
  @Post(['update', 'admin/update'])
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'userId',
    description: '用户 id',
    example: '1024',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '冻结成功',
    type: String,
  })
  @RequireLogin()
  @Get('freeze')
  async freeze(@Query('id') userId: number) {
    await this.userService.freeze(userId);
    return '冻结成功';
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNo',
    description: '第几页',
    example: 1,
    type: String,
  })
  @ApiQuery({
    name: 'pageSize',
    description: '每页多少条',
    example: 10,
    type: String,
  })
  @ApiQuery({
    name: 'username',
    description: '用户名',
    example: 'akclown',
    type: String,
  })
  @ApiQuery({
    name: 'nickName',
    description: '昵称',
    example: '角落里',
    type: String,
  })
  @ApiQuery({
    name: 'email',
    description: '邮箱',
    example: '1376513637@qq.com',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: UserListVo,
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
    @Query('nickName') nickName: string,
    @Query('email') email: string,
  ) {
    return await this.userService.findUsersByPage(
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    );
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '文件路径',
    type: String,
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      // 自定义存储，一般线上都是直接存入到文件系统里
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      // $ 限制只能上传图片
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.jpeg', '.gif'].includes(extname)) {
          // 第一个参数为error，第二个参数为是否接收文件
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);
    return file.path;
  }

  // *********************
  // Create Token
  // *********************

  getAccessToken(
    user: Pick<
      IUserInfo,
      'id' | 'username' | 'roles' | 'permissions' | 'email'
    >,
  ) {
    return this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        permissions: user.permissions,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );
  }

  getRefreshToken(id: number) {
    return this.jwtService.sign(
      {
        userId: id,
      },
      {
        expiresIn:
          this.configService.get('jwt_refresh_token_expires_time') || '7d',
      },
    );
  }
}

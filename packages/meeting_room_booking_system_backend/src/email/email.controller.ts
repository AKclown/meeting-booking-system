import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private redisService: RedisService;

  @Get('register-captcha')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的验证码是 ${code} </p>`,
    });
    return '发送成功';
  }

  @Get('update_password/captcha')
  async updatePasswordCaptcha(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(
      `update_password_captcha_${address}`,
      code,
      5 * 60,
    );
    await this.emailService.sendMail({
      to: address,
      subject: '更改密码验证码',
      html: `<p>你的验证码是 ${code} </p>`,
    });
    return '发送成功';
  }

  @Get('update/captcha')
  async updateCaptcha(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`update_user_captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '更改用户信息验证码',
      html: `<p>你的验证码是 ${code} </p>`,
    });
    return '发送成功';
  }
}

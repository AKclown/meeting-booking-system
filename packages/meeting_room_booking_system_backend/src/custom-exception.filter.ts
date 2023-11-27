import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();

    // $ 错误存储的地方 (当ValidationPipe报错时，message是一个数组，错误的实际存储位置是在response字段里)
    // 断点打印即可
    const res = exception.getResponse() as { message: string[] };

    response
      .json({
        code: exception.getStatus(),
        message: 'fail',
        data: res?.message?.join?.(',') || exception.message,
      })
      .end();
  }
}

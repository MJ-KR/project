import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base-exception';
import { ErrorResponse } from '../../domain/dto/response/error-response';

/**
 * 全ての例外を捕捉して ErrorResponse 形式で返すフィルター
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: string[] = ['予期しないエラーが発生しました'];

    // BaseException
    if (exception instanceof BaseException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      const msg = this.extractMessages(body);
      messages = msg.length > 0 ? msg : [exception.message];
    }

    // ValidationPipe → BadRequestException
    else if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      const msg = this.extractMessages(body);
      messages = msg.length > 0 ? msg : ['リクエストが不正です'];
    }

    // NestJS -> HttpException
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();
      const msg = this.extractMessages(body);
      messages = msg.length > 0 ? msg : [exception.message];
    }

    // logging
    console.error(
      `[${new Date().toISOString()}] ${request.method} ${request.url}`,
      exception,
    );

    // ErrorResponse返却
    const errorResponse = new ErrorResponse(status, messages);
    response.status(status).json(errorResponse);
  }

  private extractMessages(res: unknown): string[] {
    if (!res) return [];

    // res が string の場合 → 配列に変換
    if (typeof res === 'string') return [res];

    // res が object の場合 → message プロパティを確認
    if (
      typeof res === 'object' &&
      Object.prototype.hasOwnProperty.call(res, 'message')
    ) {
      const msg = (res as { message?: unknown }).message;

      if (Array.isArray(msg)) {
        return msg.filter((m): m is string => typeof m === 'string');
      }
      if (typeof msg === 'string') {
        return [msg];
      }
    }

    return [];
  }
}

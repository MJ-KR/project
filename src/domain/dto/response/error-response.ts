import { HttpStatus } from '@nestjs/common';

/**
 * エラーレスポンスDTO
 * - すべてのエラー応答をこの形で返す
 */
export class ErrorResponse {
  readonly success: boolean = false;
  /** エラーコード */
  readonly statusCode: string;

  /** 表示用メッセージ */
  readonly message: string[];

  constructor(statusCode: HttpStatus, message: string[]) {
    this.statusCode = statusCode.toString();
    this.message = message;
  }
}

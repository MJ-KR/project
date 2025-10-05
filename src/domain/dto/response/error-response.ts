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

  /** エラー発生時刻（ISO形式） */
  readonly timestamp: string;

  constructor(statusCode: HttpStatus, message: string[]) {
    this.statusCode = statusCode.toString();
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

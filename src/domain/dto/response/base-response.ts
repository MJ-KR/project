import { HttpStatus } from '@nestjs/common';

/**
 * 共通レスポンスDTO
 * @template T 実際のデータ型
 */
export class BaseResponse<T> {
  /** リクエストが成功したかどうか */
  success: boolean;

  /** HTTPステータスコード */
  statusCode: HttpStatus;

  /** データ件数 */
  count: number;

  /** 実際のレスポンスデータ */
  data: T;

  constructor(
    success: boolean,
    statusCode: HttpStatus,
    data: T,
    count: number,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.count = count;
  }
}

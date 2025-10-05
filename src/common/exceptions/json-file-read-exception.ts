import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base-exception';

/**
 * JSONファイル読み込み失敗例外
 */
export class JsonFileReadException extends BaseException {
  constructor(filePath: string, cause?: unknown) {
    super(
      `JSONファイルの読み込みに失敗しました: ${filePath}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      cause,
    );
  }
}

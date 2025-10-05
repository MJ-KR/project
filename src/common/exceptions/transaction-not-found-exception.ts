import { HttpStatus } from '@nestjs/common';
import { DataNotFoundException } from './data-not-found-exception';

/**
 * 不動産取引データが見つからない場合の例外
 */
export class TransactionNotFoundException extends DataNotFoundException {
  constructor(cause?: unknown) {
    super(
      '不動産取引データが見つかりませんでした',
      HttpStatus.NOT_FOUND,
      cause,
    );
  }
}

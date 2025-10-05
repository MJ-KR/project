import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base-exception';

/**
 * DTOの必須パラメータが不足している場合に投げる例外
 */
export class InvalidQueryParameterException extends BaseException {
  constructor() {
    super(`必須パラメータが不足しています`, HttpStatus.BAD_REQUEST);
  }
}

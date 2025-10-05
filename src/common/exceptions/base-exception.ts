import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 基本例外クラス
 * - 全てのカスタム例外の基底クラス
 */
export abstract class BaseException extends HttpException {
  /** 内部用cause（画面には返さない） */
  public readonly cause: unknown;

  protected constructor(message: string, status: HttpStatus, cause?: unknown) {
    super({ message }, status, { cause: cause ?? undefined });

    this.cause = cause ?? undefined;
  }
}

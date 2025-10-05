import { BaseException } from './base-exception';

/**
 * DBデータがない場合
 */
export abstract class DataNotFoundException extends BaseException {}

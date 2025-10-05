import {
  EstateTransactionJson,
  Transaction,
  Years,
} from 'src/domain/entity/transaction';
import { TransactionRepository } from './transaction-repository.interface';
import { readFileSync } from 'node:fs';
import { join } from 'path';
import { JsonFileReadException } from '../common/exceptions/json-file-read-exception';

export class MemoryTransactionRepository implements TransactionRepository {
  private readonly store: Map<string, Transaction> = new Map<
    string,
    Transaction
  >();

  /**
   * json読み込み後、storeに保存
   */
  constructor() {
    // json読み込み
    const filePath = join(
      process.cwd(),
      'assets/json/estate_transactions.json',
    );

    let rawData: string;
    let jsonArray: EstateTransactionJson[];

    try {
      rawData = readFileSync(filePath, 'utf-8');
      jsonArray = JSON.parse(rawData) as EstateTransactionJson[];
    } catch (err) {
      // 파일 없음 / 파싱 오류 등을 전용 예외로 감싸서 throw
      throw new JsonFileReadException(filePath, err);
    }

    // データ変換後、storeに保存
    jsonArray.forEach((item) => {
      const { year, prefectureCode, type } = item;

      // Years[]変換
      const years = item.data.result.years.map(
        (y) => new Years(y.year, y.value),
      );

      // Transaction作成
      const transaction = new Transaction(
        item.data.result.prefectureCode,
        item.data.result.prefectureName,
        item.data.result.type,
        years,
      );

      // key生成
      const key = `${year}-${prefectureCode}-${type}`;

      this.store.set(key, transaction);
    });
  }

  findOne(key: string): Transaction | undefined {
    return this.store.get(key) ?? undefined;
  }
}

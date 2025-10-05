import {
  EstateTransactionJson,
  Transaction,
  Years,
} from 'src/domain/entity/transaction';
import { TransactionRepository } from './transaction-repository.interface';
import { readFileSync } from 'node:fs';
import { join } from 'path';

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
    const rawData = readFileSync(filePath, 'utf-8');
    const jsonArray = JSON.parse(rawData) as EstateTransactionJson[];

    // データ変換後、storeに保存
    jsonArray.forEach((item) => {
      const { year, prefectureCode, type } = item;
      const prefectureName = item.data.result.prefectureName;

      // Years[]変換
      const years = item.data.result.years.map(
        (y) => new Years(y.year, y.value),
      );

      // Transaction作成
      const transaction = new Transaction(
        String(prefectureCode),
        prefectureName,
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

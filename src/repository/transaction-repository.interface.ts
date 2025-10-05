import { Transaction } from '../domain/entity/transaction';

export interface TransactionRepository {
  findOne(key: string): Transaction | undefined;
}

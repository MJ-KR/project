import { Transaction } from '../domain/entity/transaction';

export interface TransactionRepository {
  findOne(): Transaction;
}

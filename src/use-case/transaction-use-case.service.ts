import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from '../common/config/tokens';
import type { TransactionRepository } from '../repository/transaction-repository.interface';

@Injectable()
export class TransactionUseCaseService {
  constructor(
    @Inject(TOKENS.TransactionRepository)
    private readonly repository: TransactionRepository,
  ) {}

  findOne() {
    this.repository.findOne();
  }
}

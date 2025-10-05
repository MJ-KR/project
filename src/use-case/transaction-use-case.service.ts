import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from '../common/config/tokens';
import type { TransactionRepository } from '../repository/transaction-repository.interface';
import { TransactionQueryDto } from '../domain/dto/request/transaction-query-dto';
import { TransactionNotFoundException } from '../common/exceptions/transaction-not-found-exception';

@Injectable()
export class TransactionUseCaseService {
  constructor(
    @Inject(TOKENS.TransactionRepository)
    private readonly repository: TransactionRepository,
  ) {}

  findOne(dto: TransactionQueryDto) {
    const result = this.repository.findOne(dto.toKey());

    if (result === undefined) {
      throw new TransactionNotFoundException();
    }

    return result;
  }
}

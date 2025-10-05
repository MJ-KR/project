import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from '../common/config/tokens';
import type { TransactionRepository } from '../repository/transaction-repository.interface';
import { TransactionQueryDto } from '../domain/dto/request/transaction-query-dto';

@Injectable()
export class TransactionUseCaseService {
  constructor(
    @Inject(TOKENS.TransactionRepository)
    private readonly repository: TransactionRepository,
  ) {}

  findOne(dto: TransactionQueryDto) {
    const result = this.repository.findOne(dto.toKey());

    if (result === undefined) {
      // TODO change to customException
      throw new NotFoundException('not found transaction data');
    }

    // TODO convert to DTO
    return result;
  }
}

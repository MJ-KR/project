import { Controller, Get } from '@nestjs/common';
import { TransactionUseCaseService } from '../use-case/transaction-use-case.service';

@Controller('townPlanning/estateTransaction')
export class TransactionControllerController {
  constructor(private readonly useCase: TransactionUseCaseService) {}

  @Get('/bar')
  getBar() {
    this.useCase.findOne();
    return 'test';
  }
}

import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { TransactionUseCaseService } from '../use-case/transaction-use-case.service';
import { TransactionQueryDto } from '../domain/dto/request/transaction-query-dto';
import { BaseResponse } from '../domain/dto/response/base-response';

@Controller('townPlanning/estateTransaction')
export class TransactionControllerController {
  constructor(private readonly useCase: TransactionUseCaseService) {}

  @Get('/bar')
  getTransaction(@Query() dto: TransactionQueryDto) {
    const result = this.useCase.findOne(dto);

    return new BaseResponse(true, HttpStatus.OK, result, 1);
  }
}

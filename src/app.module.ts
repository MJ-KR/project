import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionControllerController } from './controller/transaction-controller.controller';
import { TransactionUseCaseService } from './use-case/transaction-use-case.service';
import { TOKENS } from './common/config/tokens';
import { MemoryTransactionRepository } from './repository/memory-transaction-repository';

@Module({
  imports: [],
  controllers: [AppController, TransactionControllerController],
  providers: [
    AppService,
    TransactionUseCaseService,
    {
      provide: TOKENS.TransactionRepository,
      useClass: MemoryTransactionRepository,
    },
  ],
})
export class AppModule {}

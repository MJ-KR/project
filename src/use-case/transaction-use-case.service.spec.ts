import { Test, TestingModule } from '@nestjs/testing';
import { TransactionUseCaseService } from './transaction-use-case.service';

describe('TransactionUseCaseService', () => {
  let service: TransactionUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionUseCaseService],
    }).compile();

    service = module.get<TransactionUseCaseService>(TransactionUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

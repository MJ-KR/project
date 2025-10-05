import { Test, TestingModule } from '@nestjs/testing';
import { TransactionUseCaseService } from './transaction-use-case.service';
import { TOKENS } from '../common/config/tokens';
import { TransactionQueryDto } from '../domain/dto/request/transaction-query-dto';
import { Transaction, Years } from '../domain/entity/transaction';
import { NotFoundException } from '@nestjs/common';

describe('TransactionUseCaseService', () => {
  let service: TransactionUseCaseService;

  // MOCK Repository
  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionUseCaseService,
        {
          provide: TOKENS.TransactionRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionUseCaseService>(TransactionUseCaseService);

    // テスト前、mock初期化
    mockRepository.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('データが存在する場合、正常に取得できること', () => {
    // given
    const dto = new TransactionQueryDto();
    dto.year = 2015;
    dto.prefectureCode = 13;
    dto.type = 1;

    const fakeTransaction = new Transaction('13', '東京都', [
      new Years(2015, 324740),
    ]);
    mockRepository.findOne.mockReturnValue(fakeTransaction);

    // when
    const result = service.findOne(dto);

    // then
    expect(mockRepository.findOne).toHaveBeenCalledWith(dto.toKey());
    expect(result).toEqual(fakeTransaction);
  });

  it('データが存在しない場合、NotFoundExceptionをスローすること', () => {
    // given
    const dto = new TransactionQueryDto();
    dto.year = 2015;
    dto.prefectureCode = 13;
    dto.type = 1;

    mockRepository.findOne.mockReturnValue(undefined);

    // then
    expect(() => service.findOne(dto)).toThrow(NotFoundException);
  });
});

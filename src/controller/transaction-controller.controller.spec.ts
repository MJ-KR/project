import { Test, TestingModule } from '@nestjs/testing';
import { TransactionControllerController } from './transaction-controller.controller';
import { TransactionUseCaseService } from '../use-case/transaction-use-case.service';
import { TransactionQueryDto } from '../domain/dto/request/transaction-query-dto';
import { Transaction, Years } from '../domain/entity/transaction';
import { HttpStatus } from '@nestjs/common';

describe('TransactionControllerController', () => {
  let controller: TransactionControllerController;

  // useCase mock
  const mockUseCase = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionControllerController],
      providers: [
        {
          provide: TransactionUseCaseService,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<TransactionControllerController>(
      TransactionControllerController,
    );
    mockUseCase.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /bar: 成功ケース', () => {
    // given
    const dto = new TransactionQueryDto();
    dto.year = 2015;
    dto.prefectureCode = 14;
    dto.type = 1;

    const fakeTransaction = new Transaction('14', '神奈川県', '1', [
      new Years(2015, 324740),
    ]);

    mockUseCase.findOne.mockReturnValue(fakeTransaction);

    // when
    const result = controller.getTransaction(dto);

    // then
    expect(mockUseCase.findOne).toHaveBeenCalledWith(dto);

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(HttpStatus.OK);
    expect(result.count).toBe(1);

    expect(result.data.prefectureCode).toBe('14');
    expect(result.data.PrefectureName).toBe('神奈川県');
    expect(result.data.type).toBe('1');

    expect(result.data.years).toHaveLength(1);
    expect(result.data.years[0]).toMatchObject({
      year: 2015,
      value: 324740,
    });
  });

  it('GET /bar: useCaseでエラーが発生した場合', () => {
    // given
    const dto = new TransactionQueryDto();
    dto.year = 2015;
    dto.prefectureCode = 13;
    dto.type = 2;

    mockUseCase.findOne.mockImplementation(() => {
      throw new Error('not found');
    });

    // then
    expect(() => controller.getTransaction(dto)).toThrow('not found');
  });

  // ===== DTO Util検証 =====

  it('TransactionQueryDto.toKey()変換テスト', () => {
    const dto = new TransactionQueryDto();
    dto.year = 2016;
    dto.prefectureCode = 11;
    dto.type = 1;

    expect(dto.toKey()).toBe('2016-11-1');
  });

  it('TransactionQueryDto.toKey(): 値がない場合エラー', () => {
    const dto = new TransactionQueryDto();

    expect(() => dto.toKey()).toThrow();
  });
});

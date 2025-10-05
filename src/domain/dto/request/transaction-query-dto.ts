import { IsInt, Min, Max, IsIn, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { PrefectureHelper } from '../../constants/transaction-prefecture';
import { EstateType } from '../../constants/transaction-type';
import { InvalidQueryParameterException } from '../../../common/exceptions/invalid-query-parameter-exception';

export class TransactionQueryDto {
  @IsDefined({ message: 'yearは必須です' })
  @Type(() => Number)
  @IsInt()
  @Min(2015, { message: 'yearは2015以上で指定してください' })
  @Max(2018, { message: 'yearは2018以下で指定してください' })
  year: number;

  @IsDefined({ message: 'prefectureCodeは必須です' })
  @Type(() => Number)
  @IsInt()
  @IsIn(PrefectureHelper.getPrefectureCodes('kanto'), {
    message: 'prefectureCodeは関東地域のみ指定可能です',
  })
  prefectureCode: number;

  @IsDefined({ message: 'typeは必須です' })
  @Type(() => Number)
  @IsInt()
  @IsIn([EstateType.RESIDENTIAL, EstateType.COMMERCIAL], {
    message: 'typeは1(住宅地)または2(商業地)のみ指定可能です',
  })
  type: number;

  public toKey(): string {
    if (!this.year && !this.prefectureCode && !this.type)
      throw new InvalidQueryParameterException();

    return `${this.year}-${this.prefectureCode}-${this.type}`;
  }
}

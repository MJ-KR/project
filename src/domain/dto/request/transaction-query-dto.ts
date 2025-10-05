import { IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { PrefectureHelper } from '../../constants/transaction-prefecture';
import { EstateType } from '../../constants/transaction-type';

export class TransactionQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(2015, { message: 'yearは2015以上で指定してください' })
  @Max(2018, { message: 'yearは2018以下で指定してください' })
  year: number;

  @Type(() => Number)
  @IsInt()
  @IsIn(PrefectureHelper.getPrefectureCodes('kanto'), {
    message: 'prefectureCodeは関東地域のみ指定可能です',
  })
  prefectureCode: number;

  @Type(() => Number)
  @IsInt()
  @IsIn([EstateType.RESIDENTIAL, EstateType.COMMERCIAL], {
    message: 'typeは1(住宅地)または2(商業地)のみ指定可能です',
  })
  type: number;

  public toKey(): string {
    // TODO change to customException
    if (!this.year && !this.prefectureCode && !this.type) throw new Error();

    return `${this.year}-${this.prefectureCode}-${this.type}`;
  }
}

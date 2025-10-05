export interface EstateTransactionJson {
  year: number;
  prefectureCode: number;
  type: number;
  data: {
    result: {
      prefectureCode: string;
      prefectureName: string;
      type: string;
      years: {
        year: number;
        value: number;
      }[];
    };
  };
}

export class Years {
  constructor(
    private _year: number,
    private _value: number,
  ) {}

  get year(): number {
    return this._year;
  }

  get value(): number {
    return this._value;
  }
}

export class Transaction {
  constructor(
    private _prefectureCode: string,
    private _PrefectureName: string,
    private _type: string,
    private _years: Years[],
  ) {}

  get prefectureCode(): string {
    return this._prefectureCode;
  }

  get PrefectureName(): string {
    return this._PrefectureName;
  }

  get type(): string {
    return this._type;
  }

  get years(): Years[] {
    return this._years;
  }
}

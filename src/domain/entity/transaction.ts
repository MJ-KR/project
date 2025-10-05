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
    private year: number,
    private value: number,
  ) {}
}

export class Transaction {
  constructor(
    private prefectureCode: string,
    private PrefectureName: string,
    private type: string,
    private years: Years[],
  ) {}
}

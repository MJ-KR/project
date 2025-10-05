// 都道府県
export type Region = 'kanto';

export enum Prefecture {
  IBARAKI = 8,
  TOCHIGI = 9,
  GUNMA = 10,
  SAITAMA = 11,
  CHIBA = 12,
  TOKYO = 13,
  KANAGAWA = 14,
}

export const PrefectureDescriptions: Record<Prefecture, string> = {
  [Prefecture.IBARAKI]: '茨城県',
  [Prefecture.TOCHIGI]: '栃木県',
  [Prefecture.GUNMA]: '群馬県',
  [Prefecture.SAITAMA]: '埼玉県',
  [Prefecture.CHIBA]: '千葉県',
  [Prefecture.TOKYO]: '東京都',
  [Prefecture.KANAGAWA]: '神奈川県',
};

export class PrefectureHelper {
  static getPrefectureCodes(region: Region): number[] {
    switch (region) {
      case 'kanto':
        return this.kantoCodes();
      default:
        return [];
    }
  }

  private static kantoCodes() {
    return [
      Prefecture.IBARAKI,
      Prefecture.TOCHIGI,
      Prefecture.GUNMA,
      Prefecture.SAITAMA,
      Prefecture.CHIBA,
      Prefecture.TOKYO,
      Prefecture.KANAGAWA,
    ];
  }
}

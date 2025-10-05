export class TransactionQueryDto {
  year: number;
  prefectureCode: number;
  type: number;

  public toKey(): string {
    // TODO change to customException
    if (!this.year && !this.prefectureCode && !this.type) throw new Error();

    return `${this.year}-${this.prefectureCode}-${this.type}`;
  }
}

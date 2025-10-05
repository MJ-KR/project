export enum EstateType {
  RESIDENTIAL = 1,
  COMMERCIAL = 2,
}

export const EstateTypeDescriptions: Record<EstateType, string> = {
  [EstateType.RESIDENTIAL]: '住宅地',
  [EstateType.COMMERCIAL]: '商業地',
};

// src/app/core/utils/enum-helper.ts
export function getEnumList<T extends object>(enumObj: T): { value: number, label: string }[] {
  return Object.keys(enumObj)
    .filter(key => !isNaN(Number(enumObj[key as keyof T])))
    .map(key => ({
      value: Number(enumObj[key as keyof T]),
      label: key
    }));
}

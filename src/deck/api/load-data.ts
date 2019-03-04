import {
  BaseData as RawBaseData,
  General as RawGeneral,
} from './types/base-data';

export type RawBaseData = RawBaseData;

interface Item {
  code: string;
  name: string;
  shortName?: string;
  color?: string;
}

export interface General {
  raw: RawGeneral;
}

export interface BaseData {
  belongStates: { [key: string]: Item };
  costs: { [key: string]: Item };
  unitTypes: { [key: string]: Item };
  generals: { [key: string]: General };
}

export const indexKey = <S>(_s: S, i: number): string => `${i}`;
export const valueKey = <S extends { key: string }>(s: S): string => s.key;

const arrayToObject = <S, D>(
  array: S[],
  convertKey: (s: S, i: number) => string,
  convertValue: (t: S) => D
): { [key: string]: D } =>
  Object.assign(
    {},
    ...array.map((v, i) => ({ [convertKey(v, i)]: convertValue(v) }))
  );

const convertStringKey = <V>(obj: { [key: number]: V }): { [key: string]: V } =>
  Object.assign({}, ...Object.entries(obj).map(([k, v]) => ({ [k]: v })));

export default async (): Promise<BaseData> => {
  const res: Response = await fetch(process.env.BASE_DATA_URL as string);
  const baseData: RawBaseData = await res.json();
  return {
    belongStates: arrayToObject(
      baseData.STATE,
      indexKey,
      ({ code, name, ...s }) => ({
        code,
        name,
        shortName: s['name_short'],
        color: `rgb(${s.red}, ${s.green}, ${s.blue})`,
      })
    ),
    costs: convertStringKey(baseData.COST),
    unitTypes: arrayToObject(
      baseData.UNIT_TYPE,
      valueKey,
      ({ code, name }) => ({
        code,
        name,
        shortName: name[0],
      })
    ),
    generals: arrayToObject(baseData.GENERAL, indexKey, raw => ({ raw })),
  };
};

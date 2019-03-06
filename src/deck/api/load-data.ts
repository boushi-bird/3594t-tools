import {
  BaseData as RawBaseData,
  General as RawGeneral,
  Personal,
} from './types/base-data';

interface IdItem {
  readonly id: string;
}

interface Item extends IdItem {
  readonly code: string;
  readonly name: string;
  readonly nameShort?: string;
  readonly color?: string;
}

interface GeneralProps {
  /** 武力 */
  readonly force: number;
  /** 知力 */
  readonly intelligence: number;
  /** 征圧力 */
  readonly conquest: number;
  /** コスト */
  readonly cost?: Item;
  /** 官職 */
  readonly generalType?: Item;
  /** 武将名 */
  readonly personal?: Personal;
  /** レアリティ */
  readonly rarity?: Item;
  /** 勢力 */
  readonly state?: Item;
  /** 兵種 */
  readonly unitType?: Item;
}

export interface General extends IdItem, GeneralProps {
  readonly code: string;
}

// TODO: 内部で使う export外す
class GeneralImpl implements General {
  public readonly id: string;
  private readonly raw: RawGeneral;
  public readonly force: number;
  public readonly intelligence: number;
  public readonly conquest: number;
  public readonly cost?: Item;
  public readonly generalType?: Item;
  public readonly personal?: Personal;
  public readonly rarity?: Item;
  public readonly state?: Item;
  public readonly unitType?: Item;
  public constructor(id: string, raw: RawGeneral, option: GeneralProps) {
    this.id = id;
    this.raw = raw;
    Object.assign(this, option);
  }
  public get code(): string {
    return this.raw.code;
  }
}

export interface BaseData {
  belongStates: Item[];
  costs: Item[];
  unitTypes: Item[];
  skills: Item[];
  genMains: Item[];
  rarities: Item[];
  generalTypes: Item[];
  varTypes: Item[];
  generals: General[];
}

const idIsIndex = <V>(_v: V, i: number): string => `${i}`;
const idIsKey = <V extends { key: string }>(v: V): string => v.key;

const convertIdItem = <S, D extends IdItem>(
  array: ReadonlyArray<S>,
  convertId: (s: S, i: number) => string,
  convertValue: (t: S, id: string) => D
): D[] => array.map((s, i) => convertValue(s, convertId(s, i)));

const objectToIdItems = <S, D extends IdItem>(
  obj: { [key: string]: S } | { [key: number]: S },
  convertValue: (t: S, id: string) => D
): D[] => Object.entries(obj).map(([key, s]) => convertValue(s, `${key}`));

const toItem = (
  {
    code,
    name,
    name_short: nameShort,
  }: {
    code: string;
    name: string;
    name_short?: string;
  },
  id: string
): Item => ({
  id,
  code,
  name,
  nameShort,
});

export default async (): Promise<BaseData> => {
  const res: Response = await fetch(process.env.BASE_DATA_URL as string);
  const baseData: RawBaseData = await res.json();
  // 勢力
  const belongStates = convertIdItem(baseData.STATE, idIsIndex, (s, id) => {
    const dist = toItem(s, id);
    return {
      ...dist,
      color: `rgb(${s.red}, ${s.green}, ${s.blue})`,
    };
  });
  // コスト
  const costs = objectToIdItems(baseData.COST, toItem);
  // 兵種
  const unitTypes = convertIdItem(baseData.UNIT_TYPE, idIsKey, (s, id) => {
    const dist = toItem(s, id);
    return {
      ...dist,
      nameShort: s.name[0],
    };
  });
  // 特技
  const skills = convertIdItem(baseData.SKILL, idIsKey, toItem);
  // 登場弾
  // 主将器
  const genMains = convertIdItem(baseData.GEN_MAIN, idIsKey, toItem);
  // レアリティ
  const rarities = objectToIdItems(baseData.RARITY, toItem);
  // 官職
  const generalTypes = convertIdItem(
    baseData.GENERAL_TYPE,
    idIsKey,
    (s, id) => {
      const dist = toItem(s, id);
      if (s.name === '') {
        return {
          ...dist,
          name: 'なし(女性)',
        };
      }
      return dist;
    }
  );
  // スターター/通常/Ex
  const varTypes = convertIdItem(baseData.VER_TYPE, idIsIndex, toItem);
  // 武将
  const generals = convertIdItem(
    baseData.GENERAL,
    idIsIndex,
    (raw, id) =>
      new GeneralImpl(id, raw, {
        force: parseInt(raw.buryoku),
        intelligence: parseInt(raw.chiryoku),
        conquest: parseInt(raw.seiatsu),
        cost: costs.find(v => v.id === raw.cost),
        generalType: generalTypes.find(v => v.id === raw.general_type),
        personal: baseData.PERSONAL[parseInt(raw.personal)],
        rarity: rarities.find(v => v.id === raw.rarity),
        state: belongStates.find(v => v.id === raw.state),
        unitType: unitTypes.find(v => v.id === raw.unit_type),
      })
  );
  console.log(baseData.GENERAL_TYPE);
  console.log(varTypes);
  console.log(generals[569]);
  return {
    belongStates,
    costs,
    unitTypes,
    skills,
    genMains,
    rarities,
    generalTypes,
    varTypes,
    generals,
  };
};

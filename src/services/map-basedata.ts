import { BaseData as RawBaseData } from './types/base-data';

type RawGeneral = RawBaseData['GENERAL'][number];
type Personal = RawBaseData['PERSONAL'][number];

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
  /** 登場弾(メジャー) */
  readonly majorVersion: number;
  /** 登場弾(追加) */
  readonly addVersion: number;
  /** EXカード */
  readonly isEx: boolean;
  /** 武力 */
  readonly force: number;
  /** 知力 */
  readonly intelligence: number;
  /** 征圧力 */
  readonly conquest: number;
  /** コスト */
  readonly cost?: Item;
  /** 主将器 */
  readonly genMains: ReadonlyArray<Item>;
  /** 官職 */
  readonly generalType?: Item;
  /** 武将名 */
  readonly personal?: Personal;
  /** レアリティ */
  readonly rarity?: Item;
  /** 特技 */
  readonly skills: ReadonlyArray<Item>;
  /** 勢力 */
  readonly state?: Item;
  /** 兵種 */
  readonly unitType?: Item;
}

interface General extends IdItem, GeneralProps {
  /** コード */
  readonly code: string;
  /** 登場弾 */
  readonly version: string;
  /** さんぽけあり */
  readonly hasPocket: boolean;
}

const createVersionLabel = (
  majorVersion: number,
  addVersion = 0,
  isEx = false
): string => {
  let add: string;
  if (isEx) {
    add = '-EX';
  } else if (addVersion > 0) {
    add = `-${addVersion}`;
  } else {
    add = '';
  }
  return `第${majorVersion}弾${add}`;
};

class GeneralImpl implements General {
  public readonly id: string;
  private readonly raw: RawGeneral;
  public readonly majorVersion: number;
  public readonly addVersion: number;
  public readonly isEx: boolean;
  public readonly force: number;
  public readonly intelligence: number;
  public readonly conquest: number;
  public readonly cost?: Item;
  public readonly genMains: ReadonlyArray<Item>;
  public readonly generalType?: Item;
  public readonly personal?: Personal;
  public readonly rarity?: Item;
  public readonly skills: ReadonlyArray<Item>;
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
  public get version(): string {
    return createVersionLabel(this.majorVersion, this.addVersion, this.isEx);
  }
  public get hasPocket(): boolean {
    return this.raw.pocket_code !== '';
  }
}

export interface BaseData {
  /** 勢力 */
  belongStates: Item[];
  /** コスト */
  costs: Item[];
  /** 兵種 */
  unitTypes: Item[];
  /** 特技 */
  skills: Item[];
  /** 主将器 */
  genMains: Item[];
  /** レアリティ */
  rarities: Item[];
  /** 官職 */
  generalTypes: Item[];
  /** スターター/通常/Ex */
  varTypes: Item[];
  /** 登場弾 */
  versions: { [key: number]: number[] };
  /** 登場弾(メジャーバージョン) */
  majorVersions: number[];
  /** 武将 */
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
    short_name: shortName,
  }: {
    code: string;
    name: string;
    name_short?: string;
    short_name?: string;
  },
  id: string
): Item => ({
  id,
  code,
  name,
  nameShort: nameShort || shortName,
});

const plain = <S>(s: (S | undefined)[]): S[] => s.filter(v => v != null) as S[];

export default (baseData: RawBaseData): BaseData => {
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
  // 登場弾
  const versions: { [key: number]: number[] } = {};
  // 武将
  const generals = convertIdItem(baseData.GENERAL, idIsIndex, (raw, id) => {
    const majorVersion = parseInt(raw.major_version);
    const addVersion = parseInt(raw.add_version);
    const isEx = raw.ver_type === '2';
    if (!versions[majorVersion]) {
      versions[majorVersion] = [];
    }
    if (!isEx && !versions[majorVersion].includes(addVersion)) {
      versions[majorVersion].push(addVersion);
    }
    return new GeneralImpl(id, raw, {
      majorVersion,
      addVersion,
      isEx,
      force: parseInt(raw.buryoku),
      intelligence: parseInt(raw.chiryoku),
      conquest: parseInt(raw.seiatsu),
      cost: costs.find(v => v.id === raw.cost),
      genMains: plain(
        [raw.gen_main0, raw.gen_main1, raw.gen_main2]
          .filter(v => v !== '')
          .map(v => genMains.find(g => g.id === v))
      ),
      generalType: generalTypes.find(v => v.id === raw.general_type),
      personal: baseData.PERSONAL[parseInt(raw.personal)],
      rarity: rarities.find(v => v.id === raw.rarity),
      skills: plain(
        [raw.skill0, raw.skill1, raw.skill2]
          .filter(v => v !== '')
          .map(v => skills.find(g => g.id === v))
      ),
      state: belongStates.find(v => v.id === raw.state),
      unitType: unitTypes.find(v => v.id === raw.unit_type),
    });
  });
  const majorVersions = Object.keys(versions).map(v => parseInt(v));
  const sortNumber = (a: number, b: number): number => {
    return a - b;
  };
  majorVersions.sort(sortNumber);
  majorVersions.forEach(major => {
    versions[major].sort(sortNumber);
  });
  return {
    belongStates,
    costs,
    unitTypes,
    skills,
    genMains,
    rarities,
    generalTypes,
    varTypes,
    versions,
    majorVersions,
    generals,
  };
};

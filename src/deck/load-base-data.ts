interface General {
  add_version: string;
  belong: number;
  buryoku: string;
  chiryoku: string;
  code: string;
  cost: string;
  ex_rank: string;
  gen_main0: string;
  gen_main1: string;
  gen_main2: string;
  general_type: string;
  illustrator: string;
  major_version: string;
  not_belong: boolean;
  personal: string;
  pocket_code: string;
  rarity: string;
  seiatsu: string;
  skill0: string;
  skill1: string;
  skill2: string;
  state: string;
  strat: string;
  unit_type: string;
  ver_type: string;
  voice_actor: string;
}

interface GeneralType {
  code: string;
  key: string;
  name: string;
}

interface GenMain {
  code: string;
  key: string;
  name: string;
  name_short: string;
}

interface GenSub {
  code: string;
  name: string;
  name_short: string;
}

interface Personal {
  azana: string;
  azana_ruby: string;
  name: string;
  name_ruby: string;
}

interface Skill {
  code: string;
  key: string;
  name: string;
  name_short: string;
}

interface State {
  blue: string;
  code: string;
  green: string;
  name: string;
  name_short: string;
  red: string;
}

interface Strat {
  code: string;
  explanation: string;
  key: string;
  morale: string;
  name: string;
  name_ruby: string;
  strat_category: string;
  strat_range: string;
  strat_time: string;
}

interface UnitType {
  code: string;
  key: string;
  name: string;
}

interface VerType {
  name: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseData {
  ACTIVE_JEWEL: any[];
  ACTIVE_JEWEL_TYPE: any[];
  BGM: any[];
  COST: { [key: number]: { code: string; name: string } };
  DATA: { code: string }[];
  ENISHI: any[];
  EXT: any[];
  EX_RANK: any[];
  GENERAL: General[];
  GENERAL_TYPE: GeneralType[];
  GEN_MAIN: GenMain[];
  GEN_SUB: GenSub[];
  ILLUSTRATOR: any[];
  PARAM: any[];
  PASSIVE_JEWEL: any[];
  PATH: any[];
  PERSONAL: Personal[];
  RARITY: { [key: string]: { code: string; name: string } };
  SKILL: Skill[];
  STATE: State[];
  STRAT: Strat[];
  STRAT_CATEGORY: any[];
  STRAT_RANGE: any[];
  STRAT_TIME: any[];
  TACTICS: any[];
  UNIT_TYPE: UnitType[];
  VER_TYPE: VerType[];
  VOICE_ACTOR: any[];
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async (): Promise<BaseData> => {
  const res: Response = await fetch(process.env.BASE_DATA_URL as string);
  const baseData = await res.json();
  return baseData;
};

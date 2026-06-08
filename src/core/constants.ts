export const G_EARTH = 9.81;
export const R_EARTH_KM = 6371;
export const R_ATMOSPHERE_KM = 100;
export const R_SAFE_KM = R_EARTH_KM + R_ATMOSPHERE_KM;
export const R_SAFE_M = R_SAFE_KM * 1000;

export const JOULES_PER_TON_TNT = 4.184e9;
export const JOULES_PER_MT_TNT = 4.184e15;
export const TONS_TNT_PER_HIROSHIMA = 15000;

export const DENSITY: Record<string, number> = {
  stony: 2600,
  iron: 7800,
  comet: 1000,
};

export const TARGET_DENSITY = 2500;

export const SEISMIC_EFFICIENCY = 1e-4;
export const THERMAL_FRACTION = 0.3;

export const DISASTER_LABELS: Record<number, string> = {
  0: '可忽略',
  1: '局部破坏',
  2: '区域灾难',
  3: '大陆级灾难',
  4: '全球灾难',
  5: '大灭绝',
};

export const DISASTER_DESCRIPTIONS: Record<number, string> = {
  0: '相当于一颗大型流星，在高空燃烧殆尽，地面几无影响。',
  1: '空中爆炸或小规模地面撞击，损毁范围相当于一座城区。',
  2: '形成明显撞击坑，冲击波和热辐射摧毁方圆数十至数百公里内的一切。',
  3: '撞击坑直径数十至上百公里，引发全球性地震和海啸，大陆生态系统遭受重创。',
  4: '全球性灾难——"核冬天"效应、大规模火灾、全球气候变化，文明可能崩溃。',
  5: '大规模灭绝事件——全球火灾、长期黑暗与严寒，超过75%物种灭绝（如恐龙灭绝）。',
};

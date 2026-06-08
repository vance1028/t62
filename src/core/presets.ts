import type { PresetScenario } from '@/types';

export const presets: PresetScenario[] = [
  {
    id: 'chelyabinsk',
    name: '车里雅宾斯克',
    description: '2013年俄罗斯空中爆炸，约1500人受伤',
    params: { diameter: 20, densityType: 'stony', velocity: 19, angle: 18 },
  },
  {
    id: 'tunguska',
    name: '通古斯事件',
    description: '1908年西伯利亚空中爆炸，夷平2000km²森林',
    params: { diameter: 50, densityType: 'stony', velocity: 20, angle: 45 },
  },
  {
    id: 'barringer',
    name: '巴林杰陨石坑',
    description: '约5万年前亚利桑那州撞击，留下1.2km陨石坑',
    params: { diameter: 50, densityType: 'iron', velocity: 13, angle: 45 },
  },
  {
    id: 'chicxulub',
    name: '希克苏鲁伯撞击',
    description: '6600万年前墨西哥撞击，导致恐龙灭绝',
    params: { diameter: 10000, densityType: 'stony', velocity: 20, angle: 45 },
  },
  {
    id: 'dinosaur',
    name: '恐龙灭绝级',
    description: '比希克苏鲁伯更大规模的灭绝事件',
    params: { diameter: 15000, densityType: 'stony', velocity: 20, angle: 60 },
  },
];

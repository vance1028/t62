import type { AsteroidParams, ImpactResults, DisasterLevel, ThermalZone, BlastZone } from '@/types';
import {
  DENSITY,
  TARGET_DENSITY,
  JOULES_PER_TON_TNT,
  JOULES_PER_MT_TNT,
  TONS_TNT_PER_HIROSHIMA,
  SEISMIC_EFFICIENCY,
  DISASTER_DESCRIPTIONS,
} from './constants';

function calcMass(diameterM: number, densityKgM3: number): number {
  const r = diameterM / 2;
  return densityKgM3 * (4 / 3) * Math.PI * r * r * r;
}

function calcCraterDiameter(diameterM: number, densityType: string, velocityMs: number, angleDeg: number): number {
  const rhoI = DENSITY[densityType];
  const rhoT = TARGET_DENSITY;
  const angleRad = (angleDeg * Math.PI) / 180;
  const sinTheta = Math.sin(angleRad);

  const mass = calcMass(diameterM, rhoI);
  const energy = 0.5 * mass * velocityMs * velocityMs;
  const energyMt = energy / JOULES_PER_MT_TNT;

  if (energyMt <= 0) return 0;

  const densityRatio = Math.pow(rhoI / rhoT, 1 / 3);
  const angleFactor = Math.pow(sinTheta, 1 / 3);

  const dTransient = 0.4 * densityRatio * angleFactor * Math.pow(energyMt, 0.3);

  const simpleComplexThreshold = 3.2;
  let dFinal: number;
  if (dTransient < simpleComplexThreshold) {
    dFinal = 1.25 * dTransient;
  } else {
    dFinal = 1.17 * Math.pow(dTransient, 1.13);
  }

  return dFinal;
}

function calcEarthquakeMagnitude(energyJ: number): number {
  const eSeismic = SEISMIC_EFFICIENCY * energyJ;
  if (eSeismic <= 0) return 0;
  return (2 / 3) * Math.log10(eSeismic) - 2.87;
}

function calcFireballRadius(energyMt: number): number {
  if (energyMt <= 0) return 0;
  return 1.5 * Math.pow(energyMt, 1 / 3);
}

function calcThermalZones(energyMt: number): ThermalZone[] {
  if (energyMt <= 0) return [];
  const base = Math.pow(energyMt, 0.41);
  const raw: ThermalZone[] = [
    { label: '衣物自燃', distanceKm: 16.7 * base / 8, severity: 'critical' },
    { label: '三度烧伤', distanceKm: 12.6 * base / 8, severity: 'critical' },
    { label: '二度烧伤', distanceKm: 8.4 * base / 8, severity: 'severe' },
    { label: '一度烧伤', distanceKm: 4.2 * base / 8, severity: 'moderate' },
  ];
  return raw.map(z => ({ ...z, distanceKm: Math.round(z.distanceKm * 10) / 10 }));
}

function calcBlastZones(energyMt: number): BlastZone[] {
  if (energyMt <= 0) return [];
  const base = Math.pow(energyMt, 1 / 3);
  const raw: BlastZone[] = [
    { label: '建筑完全摧毁', distanceKm: 3 * base, overpressurePsi: 20, severity: 'critical' },
    { label: '建筑严重损毁', distanceKm: 5 * base, overpressurePsi: 10, severity: 'severe' },
    { label: '建筑部分损毁', distanceKm: 10 * base, overpressurePsi: 4, severity: 'moderate' },
    { label: '玻璃破碎', distanceKm: 25 * base, overpressurePsi: 1, severity: 'mild' },
  ];
  return raw.map(z => ({ ...z, distanceKm: Math.round(z.distanceKm * 10) / 10 }));
}

function classifyDisaster(energyMt: number): { level: DisasterLevel; description: string } {
  let level: DisasterLevel;
  if (energyMt < 0.001) {
    level = 0;
  } else if (energyMt < 1) {
    level = 1;
  } else if (energyMt < 100) {
    level = 2;
  } else if (energyMt < 1e5) {
    level = 3;
  } else if (energyMt < 1e7) {
    level = 4;
  } else {
    level = 5;
  }
  return { level, description: DISASTER_DESCRIPTIONS[level] };
}

export function calculateImpact(params: AsteroidParams): ImpactResults {
  const { diameter, densityType, velocity, angle } = params;

  const densityKgM3 = DENSITY[densityType];
  const diameterM = diameter;
  const velocityMs = velocity * 1000;

  const mass = calcMass(diameterM, densityKgM3);
  const energyJoules = 0.5 * mass * velocityMs * velocityMs;
  const energyTNT = energyJoules / JOULES_PER_TON_TNT;
  const energyMt = energyTNT / 1e6;
  const hiroshimaEquivalent = energyTNT / TONS_TNT_PER_HIROSHIMA;

  const craterDiameterKm = calcCraterDiameter(diameterM, densityType, velocityMs, angle);
  const earthquakeMagnitude = calcEarthquakeMagnitude(energyJoules);
  const fireballRadiusKm = calcFireballRadius(energyMt);
  const thermalZones = calcThermalZones(energyMt);
  const blastZones = calcBlastZones(energyMt);
  const { level: disasterLevel, description: disasterDescription } = classifyDisaster(energyMt);

  return {
    energyJoules,
    energyTNT,
    energyMt,
    hiroshimaEquivalent,
    craterDiameterKm,
    earthquakeMagnitude,
    fireballRadiusKm,
    thermalZones,
    blastZones,
    disasterLevel,
    disasterDescription,
  };
}

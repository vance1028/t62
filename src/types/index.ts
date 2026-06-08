export type DensityType = 'stony' | 'iron' | 'comet';

export interface AsteroidParams {
  diameter: number;
  densityType: DensityType;
  velocity: number;
  angle: number;
}

export interface ThermalZone {
  label: string;
  distanceKm: number;
  severity: 'critical' | 'severe' | 'moderate' | 'mild';
}

export interface BlastZone {
  label: string;
  distanceKm: number;
  overpressurePsi: number;
  severity: 'critical' | 'severe' | 'moderate' | 'mild';
}

export type DisasterLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface ImpactResults {
  energyJoules: number;
  energyTNT: number;
  energyMt: number;
  hiroshimaEquivalent: number;
  craterDiameterKm: number;
  earthquakeMagnitude: number;
  fireballRadiusKm: number;
  thermalZones: ThermalZone[];
  blastZones: BlastZone[];
  disasterLevel: DisasterLevel;
  disasterDescription: string;
}

export interface DeflectionParams {
  asteroid: AsteroidParams;
  timeRemainingYears: number;
  deltaVcmPerSec: number;
}

export interface TimeDeltaVPoint {
  timeYears: number;
  deltaVCmPerSec: number;
}

export interface DeflectionResults {
  missDistanceKm: number;
  isSafe: boolean;
  requiredDeltaVCmPerSec: number;
  timeDeltaVRelation: TimeDeltaVPoint[];
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  params: AsteroidParams;
}

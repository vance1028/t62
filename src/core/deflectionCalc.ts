import type { DeflectionParams, DeflectionResults, TimeDeltaVPoint } from '@/types';
import { R_SAFE_KM, R_SAFE_M } from './constants';

const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

export function calculateDeflection(params: DeflectionParams): DeflectionResults {
  const { timeRemainingYears, deltaVcmPerSec } = params;

  const deltaVmPerSec = (deltaVcmPerSec / 100);
  const tRemainingSec = timeRemainingYears * SECONDS_PER_YEAR;

  const missDistanceM = deltaVmPerSec * tRemainingSec;
  const missDistanceKm = missDistanceM / 1000;

  const isSafe = missDistanceKm > R_SAFE_KM;

  const requiredDeltaVmPerSec = R_SAFE_M / tRemainingSec;
  const requiredDeltaVCmPerSec = requiredDeltaVmPerSec * 100;

  const timeDeltaVRelation = generateTimeDeltaVCurve();

  return {
    missDistanceKm,
    isSafe,
    requiredDeltaVCmPerSec,
    timeDeltaVRelation,
  };
}

function generateTimeDeltaVCurve(): TimeDeltaVPoint[] {
  const points: TimeDeltaVPoint[] = [];
  const minDays = 1;
  const maxYears = 20;
  const totalPoints = 60;

  const logMin = Math.log10(minDays / 365.25);
  const logMax = Math.log10(maxYears);

  for (let i = 0; i < totalPoints; i++) {
    const logT = logMin + (logMax - logMin) * (i / (totalPoints - 1));
    const timeYears = Math.pow(10, logT);
    const timeSec = timeYears * SECONDS_PER_YEAR;
    const dvMPerS = R_SAFE_M / timeSec;
    const dvCmPerS = dvMPerS * 100;

    points.push({
      timeYears,
      deltaVCmPerSec: dvCmPerS,
    });
  }

  return points;
}

export function formatDeltaV(cmPerSec: number): string {
  if (cmPerSec < 0.01) {
    return `${(cmPerSec * 1000).toFixed(2)} mm/s`;
  } else if (cmPerSec < 1) {
    return `${cmPerSec.toFixed(3)} cm/s`;
  } else if (cmPerSec < 100) {
    return `${cmPerSec.toFixed(2)} cm/s`;
  } else {
    return `${(cmPerSec / 100).toFixed(2)} m/s`;
  }
}

export function formatTimeRemaining(years: number): string {
  if (years < 1 / 365.25) {
    const hours = years * 365.25 * 24;
    return `${hours.toFixed(1)} 小时`;
  } else if (years < 1) {
    const days = years * 365.25;
    return `${days.toFixed(1)} 天`;
  } else if (years < 100) {
    return `${years.toFixed(1)} 年`;
  } else {
    return `${years.toFixed(0)} 年`;
  }
}

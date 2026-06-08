import { useState, useMemo } from 'react';
import type { AsteroidParams, DeflectionResults } from '@/types';
import { calculateDeflection } from '@/core/deflectionCalc';
import StarField from '@/components/common/StarField';
import Navigation from '@/components/layout/Navigation';
import DeflectionParamsPanel from '@/components/deflection/DeflectionParams';
import OrbitSvg from '@/components/deflection/OrbitSvg';
import MissIndicator from '@/components/deflection/MissIndicator';
import TimeDeltaChart from '@/components/deflection/TimeDeltaChart';

const DEFAULT_ASTEROID: AsteroidParams = {
  diameter: 140,
  densityType: 'stony',
  velocity: 20,
  angle: 45,
};

export default function DeflectionPage() {
  const [asteroid, setAsteroid] = useState<AsteroidParams>(DEFAULT_ASTEROID);
  const [timeYears, setTimeYears] = useState(1);
  const [deltaVcmPerSec, setDeltaVcmPerSec] = useState(1);

  const results: DeflectionResults = useMemo(
    () => calculateDeflection({ asteroid, timeRemainingYears: timeYears, deltaVcmPerSec }),
    [asteroid, timeYears, deltaVcmPerSec],
  );

  return (
    <div className="relative min-h-screen">
      <StarField count={80} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <Navigation />
        <div className="mb-4">
          <h2 className="font-display text-2xl font-bold text-white tracking-wider">轨道偏转推演</h2>
          <p className="text-sm text-slate-400 mt-1">尝试用动能撞击器偏转小行星，体验"越早干预越容易"的核心原理</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3 flex flex-col gap-5">
            <DeflectionParamsPanel
              asteroid={asteroid}
              timeYears={timeYears}
              deltaVcmPerSec={deltaVcmPerSec}
              onAsteroidChange={setAsteroid}
              onTimeChange={setTimeYears}
              onDeltaVChange={setDeltaVcmPerSec}
            />
            <MissIndicator results={results} deltaVcmPerSec={deltaVcmPerSec} />
          </div>
          <div className="lg:col-span-9 flex flex-col gap-5">
            <OrbitSvg results={results} />
            <TimeDeltaChart
              data={results.timeDeltaVRelation}
              currentDeltaV={deltaVcmPerSec}
              requiredDeltaV={results.requiredDeltaVCmPerSec}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

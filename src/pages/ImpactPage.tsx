import { useState, useMemo } from 'react';
import type { AsteroidParams, ImpactResults } from '@/types';
import { calculateImpact } from '@/core/impactCalc';
import StarField from '@/components/common/StarField';
import Navigation from '@/components/layout/Navigation';
import ImpactParamsPanel from '@/components/impact/ImpactParams';
import ImpactResultsPanel from '@/components/impact/ImpactResults';
import ImpactZoneSvg from '@/components/impact/ImpactZoneSvg';

const DEFAULT_PARAMS: AsteroidParams = {
  diameter: 50,
  densityType: 'stony',
  velocity: 20,
  angle: 45,
};

export default function ImpactPage() {
  const [params, setParams] = useState<AsteroidParams>(DEFAULT_PARAMS);

  const results: ImpactResults = useMemo(() => calculateImpact(params), [params]);

  return (
    <div className="relative min-h-screen">
      <StarField count={80} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <Navigation />
        <div className="mb-4">
          <h2 className="font-display text-2xl font-bold text-white tracking-wider">撞击效应推演</h2>
          <p className="text-sm text-slate-400 mt-1">调整参数，实时推演小行星撞击地球的后果</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3">
            <ImpactParamsPanel params={params} onChange={setParams} />
          </div>
          <div className="lg:col-span-9 flex flex-col gap-5">
            <ImpactResultsPanel results={results} />
            <ImpactZoneSvg results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

import type { ImpactResults } from '@/types';
import DataCard from '@/components/common/DataCard';
import { Zap, Circle, Activity, Flame, Wind, AlertTriangle } from 'lucide-react';
import { DISASTER_LABELS } from '@/core/constants';

interface ImpactResultsProps {
  results: ImpactResults;
}

function formatEnergy(energyMt: number): { value: string; unit: string; sub: string } {
  if (energyMt < 0.001) {
    return { value: (energyMt * 1e6).toFixed(1), unit: '吨 TNT', sub: '' };
  }
  if (energyMt < 1) {
    return { value: (energyMt * 1000).toFixed(1), unit: '千吨 TNT', sub: '' };
  }
  if (energyMt < 1000) {
    return { value: energyMt.toFixed(1), unit: '百万吨 TNT', sub: '' };
  }
  if (energyMt < 1e6) {
    return { value: (energyMt / 1000).toFixed(1), unit: '十亿吨 TNT', sub: '' };
  }
  return { value: (energyMt / 1e6).toFixed(1), unit: '万亿吨 TNT', sub: '' };
}

function formatHiroshima(n: number): string {
  if (n < 1) return '< 1';
  if (n < 1000) return n.toFixed(0);
  if (n < 1e6) return `${(n / 1000).toFixed(1)} 千`;
  if (n < 1e9) return `${(n / 1e6).toFixed(1)} 百万`;
  if (n < 1e12) return `${(n / 1e9).toFixed(1)} 十亿`;
  return `${(n / 1e12).toFixed(1)} 万亿`;
}

function formatDistance(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  if (km < 100) return `${km.toFixed(1)} km`;
  return `${km.toFixed(0)} km`;
}

function formatCrater(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  return `${km.toFixed(1)} km`;
}

export default function ImpactResultsPanel({ results }: ImpactResultsProps) {
  const e = formatEnergy(results.energyMt);
  const hiroshima = formatHiroshima(results.hiroshimaEquivalent);

  const levelColor = [
    'text-alert-mild',
    'text-alert-moderate',
    'text-alert-severe',
    'text-alert-critical',
    'text-red-400',
    'text-red-500',
  ][results.disasterLevel];

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase">灾害等级</h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            results.disasterLevel >= 4 ? 'bg-red-500/20 border border-red-500/40' :
            results.disasterLevel >= 2 ? 'bg-orange-500/20 border border-orange-500/40' :
            'bg-green-500/20 border border-green-500/40'
          }`}>
            <AlertTriangle size={14} className={levelColor} />
            <span className={`font-display text-sm font-bold ${levelColor}`}>
              Level {results.disasterLevel} · {DISASTER_LABELS[results.disasterLevel]}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">{results.disasterDescription}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <DataCard
          icon={Zap}
          label="撞击动能"
          value={e.value}
          unit={e.unit}
          sub={`≈ ${hiroshima} 颗广岛原子弹`}
          color="text-amber-400"
        />
        <DataCard
          icon={Circle}
          label="撞击坑直径"
          value={formatCrater(results.craterDiameterKm)}
          sub={results.craterDiameterKm > 3.2 ? '复杂坑（重力塌陷）' : '简单坑'}
          color="text-orange-400"
        />
        <DataCard
          icon={Activity}
          label="地震震级"
          value={results.earthquakeMagnitude.toFixed(1)}
          unit="里氏"
          sub={results.earthquakeMagnitude > 9 ? '远超已知最大地震' : results.earthquakeMagnitude > 7 ? '超大地震' : ''}
          color="text-yellow-400"
        />
        <DataCard
          icon={Flame}
          label="火球半径"
          value={formatDistance(results.fireballRadiusKm)}
          sub="火球直接灼烧范围"
          color="text-red-400"
        />
        <DataCard
          icon={Flame}
          label="热辐射（三度烧伤）"
          value={formatDistance(results.thermalZones[1]?.distanceKm ?? 0)}
          sub={results.thermalZones[1]?.label ?? ''}
          color="text-orange-400"
        />
        <DataCard
          icon={Wind}
          label="冲击波（建筑损毁）"
          value={formatDistance(results.blastZones[2]?.distanceKm ?? 0)}
          sub={results.blastZones[2]?.label ?? ''}
          color="text-yellow-400"
        />
      </div>
    </div>
  );
}

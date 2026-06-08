import type { DeflectionResults } from '@/types';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowRight } from 'lucide-react';
import { formatDeltaV } from '@/core/deflectionCalc';

interface MissIndicatorProps {
  results: DeflectionResults;
  deltaVcmPerSec: number;
}

export default function MissIndicator({ results, deltaVcmPerSec }: MissIndicatorProps) {
  const safe = results.isSafe;

  return (
    <motion.div
      className={`glass-panel p-5 flex flex-col gap-3 border ${
        safe ? 'border-green-500/40' : 'border-orange-500/40'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        {safe ? (
          <ShieldCheck size={28} className="text-alert-safe" />
        ) : (
          <ShieldAlert size={28} className="text-alert-severe" />
        )}
        <div>
          <div className={`font-display text-lg font-bold ${safe ? 'text-alert-safe' : 'text-alert-severe'}`}>
            {safe ? '脱靶成功' : '偏移不足'}
          </div>
          <div className="text-xs text-slate-400">
            偏移距离 {formatKm(results.missDistanceKm)} · 安全边界 6,471 km
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <div className="h-2 flex-1 rounded-full bg-space-700 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${safe ? 'bg-alert-safe' : 'bg-alert-severe'}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((results.missDistanceKm / 6471) * 100, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-slate-500 w-12 text-right">
          {((results.missDistanceKm / 6471) * 100).toFixed(0)}%
        </span>
      </div>

      {!safe && (
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-space-800/50 rounded-lg p-3">
          <ArrowRight size={14} className="text-nebula-400" />
          <span>
            安全脱靶至少需要 <strong className="text-nebula-300">{formatDeltaV(results.requiredDeltaVCmPerSec)}</strong> 的 Δv
          </span>
        </div>
      )}

      <div className="text-[11px] text-slate-500 mt-1">
        当前 Δv = {formatDeltaV(deltaVcmPerSec)} → 偏移 {formatKm(results.missDistanceKm)}
        {!safe && `，还差 ${formatKm(6471 - results.missDistanceKm)}`}
      </div>
    </motion.div>
  );
}

function formatKm(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  if (km < 100) return `${km.toFixed(1)} km`;
  return `${km.toFixed(0)} km`;
}

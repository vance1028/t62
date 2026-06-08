import type { ImpactResults } from '@/types';
import { motion } from 'framer-motion';

interface ImpactZoneSvgProps {
  results: ImpactResults;
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: 'rgba(239, 68, 68, 0.35)',
  severe: 'rgba(249, 115, 22, 0.3)',
  moderate: 'rgba(234, 179, 8, 0.25)',
  mild: 'rgba(34, 197, 94, 0.2)',
};

const SEVERITY_STROKES: Record<string, string> = {
  critical: '#ef4444',
  severe: '#f97316',
  moderate: '#eab308',
  mild: '#22c55e',
};

function formatDist(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)}m`;
  if (km < 100) return `${km.toFixed(1)}km`;
  return `${km.toFixed(0)}km`;
}

export default function ImpactZoneSvg({ results }: ImpactZoneSvgProps) {
  const allZones = [
    ...results.thermalZones.map(z => ({ ...z, type: 'thermal' as const })),
    ...results.blastZones.map(z => ({ ...z, type: 'blast' as const })),
  ].sort((a, b) => b.distanceKm - a.distanceKm);

  const maxDist = allZones.length > 0 ? allZones[0].distanceKm : 1;
  const svgSize = 400;
  const padding = 40;
  const maxRadius = svgSize / 2 - padding;

  const scale = (km: number) => (km / maxDist) * maxRadius;

  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <div className="glass-panel p-4">
      <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase mb-3">影响范围示意</h3>
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full max-w-md mx-auto">
        <defs>
          <radialGradient id="fireball-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {allZones.map((zone, i) => {
          const r = scale(zone.distanceKm);
          const fill = SEVERITY_COLORS[zone.severity];
          const stroke = SEVERITY_STROKES[zone.severity];
          const labelAngle = -60 + i * 25;
          const labelRad = (labelAngle * Math.PI) / 180;
          const labelX = cx + r * Math.cos(labelRad);
          const labelY = cy + r * Math.sin(labelRad);

          return (
            <g key={`${zone.type}-${i}`}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={r}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                strokeDasharray="4 2"
                initial={{ r: 0, opacity: 0 }}
                animate={{ r, opacity: 0.7 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fill={stroke}
                fontSize="9"
                fontFamily="Orbitron, monospace"
              >
                {formatDist(zone.distanceKm)}
              </text>
            </g>
          );
        })}

        <motion.circle
          cx={cx}
          cy={cy}
          r={scale(results.fireballRadiusKm)}
          fill="url(#fireball-grad)"
          filter="url(#glow)"
          initial={{ r: 0 }}
          animate={{ r: scale(results.fireballRadiusKm) }}
          transition={{ duration: 0.4 }}
        />

        <circle cx={cx} cy={cy} r={3} fill="#fff" />
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="'Noto Sans SC'">
          撞击点
        </text>

        <g>
          <line x1={cx} y1={cy} x2={cx + maxRadius + 15} y2={cy} stroke="#475569" strokeWidth={0.5} />
          <text x={cx + maxRadius + 18} y={cy + 3} fill="#64748b" fontSize="8">
            {formatDist(maxDist)}
          </text>
        </g>
      </svg>

      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        <LegendItem color="#ef4444" label="火球 / 致命热辐射" />
        <LegendItem color="#f97316" label="严重破坏区" />
        <LegendItem color="#eab308" label="中度破坏区" />
        <LegendItem color="#22c55e" label="轻微影响区" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

import type { DeflectionResults } from '@/types';
import { R_EARTH_KM } from '@/core/constants';
import { motion } from 'framer-motion';

interface OrbitSvgProps {
  results: DeflectionResults;
}

export default function OrbitSvg({ results }: OrbitSvgProps) {
  const svgW = 420;
  const svgH = 340;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const earthR = 22;

  const missDist = results.missDistanceKm;
  const missDistPx = Math.min(Math.max(missDist / 100, 4), svgH / 2 - 50);

  const safeThresholdPx = earthR + 8;

  return (
    <div className="glass-panel p-4">
      <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase mb-3">轨道偏转示意</h3>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg mx-auto">
        <defs>
          <radialGradient id="earth-grad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </radialGradient>
          <radialGradient id="atmo-grad" cx="50%" cy="50%">
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <filter id="earth-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.line
          x1={0} y1={cy}
          x2={svgW} y2={cy}
          stroke="#334155"
          strokeWidth={0.5}
          strokeDasharray="6 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <motion.path
          d={`M 0 ${cy} L ${cx - earthR - 5} ${cy}`}
          stroke="#ef4444"
          strokeWidth={1.5}
          strokeDasharray="5 3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <text x={30} y={cy - 8} fill="#ef4444" fontSize="10" fontFamily="'Noto Sans SC'" opacity={0.7}>
          原始轨迹（撞击）
        </text>

        <motion.path
          d={`M 0 ${cy} L ${cx - earthR - 5} ${cy} Q ${cx} ${cy - missDistPx} ${cx + 60} ${cy - missDistPx}`}
          stroke={results.isSafe ? '#10b981' : '#f97316'}
          strokeWidth={2}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <text
          x={cx + 65}
          y={cy - missDistPx + 4}
          fill={results.isSafe ? '#10b981' : '#f97316'}
          fontSize="10"
          fontFamily="'Noto Sans SC'"
        >
          偏转后轨迹
        </text>

        <circle
          cx={cx} cy={cy}
          r={earthR + 6}
          fill="url(#atmo-grad)"
        />

        {missDistPx > 0 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
          >
            <line
              x1={cx + earthR + 3} y1={cy}
              x2={cx + earthR + 3} y2={cy - missDistPx}
              stroke={results.isSafe ? '#10b981' : '#f97316'}
              strokeWidth={1}
              strokeDasharray="3 2"
            />
            <text
              x={cx + earthR + 8} y={cy - missDistPx / 2 + 3}
              fill="#94a3b8"
              fontSize="9"
              fontFamily="'Noto Sans SC'"
            >
              偏移 {formatKm(missDist)}
            </text>
          </motion.g>
        )}

        <circle cx={cx} cy={cy} r={safeThresholdPx} fill="none" stroke="#f9731630" strokeWidth={1} strokeDasharray="2 2" />

        <circle
          cx={cx} cy={cy}
          r={earthR}
          fill="url(#earth-grad)"
          filter="url(#earth-glow)"
        />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
          地球
        </text>

        <g transform={`translate(20, ${cy - earthR - 40})`}>
          <circle cx={0} cy={0} r={3} fill="#94a3b8" />
          <text x={7} y={3} fill="#94a3b8" fontSize="9">安全边界 ≈ {R_EARTH_KM + 100} km</text>
        </g>
      </svg>
    </div>
  );
}

function formatKm(km: number): string {
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  if (km < 100) return `${km.toFixed(1)} km`;
  if (km < 10000) return `${km.toFixed(0)} km`;
  return `${(km / 1000).toFixed(0)} 千 km`;
}

import type { TimeDeltaVPoint } from '@/types';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts';

interface TimeDeltaChartProps {
  data: TimeDeltaVPoint[];
  currentTimeYears?: number;
  currentDeltaV: number;
  requiredDeltaV: number;
}

export default function TimeDeltaChart({ data, currentDeltaV }: TimeDeltaChartProps) {
  const chartData = data.map(p => ({
    time: p.timeYears,
    deltaV: p.deltaVCmPerSec,
    isBelow: p.deltaVCmPerSec <= currentDeltaV,
  }));

  const formatXAxis = (val: number) => {
    if (val < 1 / 365.25) return `${(val * 365.25 * 24).toFixed(0)}h`;
    if (val < 1) return `${(val * 365.25).toFixed(0)}d`;
    if (val < 100) return `${val.toFixed(0)}y`;
    return `${val.toFixed(0)}y`;
  };

  const formatYAxis = (val: number) => {
    if (val < 0.01) return `${(val * 1000).toFixed(1)}mm`;
    if (val < 1) return `${val.toFixed(2)}cm`;
    if (val < 100) return `${val.toFixed(1)}cm`;
    return `${(val / 100).toFixed(1)}m`;
  };

  return (
    <div className="glass-panel p-4">
      <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase mb-1">干预时机与所需 Δv 关系</h3>
      <p className="text-[11px] text-slate-500 mb-3">越早干预，所需速度增量越小 — 这是行星防御的核心原理</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <defs>
            <linearGradient id="dvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            type="number"
            scale="log"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatXAxis}
            stroke="#475569"
            tick={{ fontSize: 10, fill: '#64748b' }}
            label={{ value: '距撞击剩余时间', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#64748b' }}
          />
          <YAxis
            type="number"
            scale="log"
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatYAxis}
            stroke="#475569"
            tick={{ fontSize: 10, fill: '#64748b' }}
            label={{ value: '所需 Δv', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f1525',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 8,
              fontSize: 11,
            }}
            formatter={(val: number) => [formatYAxis(val), '所需 Δv']}
            labelFormatter={(label: number) => `剩余时间: ${formatXAxis(label)}`}
          />
          <Area
            type="monotone"
            dataKey="deltaV"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#dvGrad)"
          />
          <ReferenceLine
            y={currentDeltaV}
            stroke="#a78bfa"
            strokeDasharray="4 4"
            label={{ value: '当前 Δv', position: 'right', fontSize: 10, fill: '#a78bfa' }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center text-[11px] text-slate-500">
        曲线表示安全脱靶所需的最小 Δv，曲线以下区域代表当前 Δv 足够脱靶的时间范围
      </div>
    </div>
  );
}

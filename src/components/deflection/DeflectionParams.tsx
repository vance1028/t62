import type { AsteroidParams, DensityType } from '@/types';

interface DeflectionParamsProps {
  asteroid: AsteroidParams;
  timeYears: number;
  deltaVcmPerSec: number;
  onAsteroidChange: (a: AsteroidParams) => void;
  onTimeChange: (t: number) => void;
  onDeltaVChange: (dv: number) => void;
}

const DENSITY_OPTIONS: { type: DensityType; label: string }[] = [
  { type: 'stony', label: '石质' },
  { type: 'iron', label: '铁质' },
  { type: 'comet', label: '彗星' },
];

export default function DeflectionParamsPanel({
  asteroid,
  timeYears,
  deltaVcmPerSec,
  onAsteroidChange,
  onTimeChange,
  onDeltaVChange,
}: DeflectionParamsProps) {
  const formatTime = (y: number) => {
    if (y < 1 / 365.25) return `${(y * 365.25 * 24).toFixed(0)} 小时`;
    if (y < 1) return `${(y * 365.25).toFixed(0)} 天`;
    return `${y.toFixed(1)} 年`;
  };

  const timeToSlider = (y: number) => {
    const logMin = Math.log10(1 / 365.25);
    const logMax = Math.log10(10);
    return ((Math.log10(y) - logMin) / (logMax - logMin)) * 1000;
  };

  const sliderToTime = (v: number) => {
    const logMin = Math.log10(1 / 365.25);
    const logMax = Math.log10(10);
    return Math.pow(10, logMin + (v / 1000) * (logMax - logMin));
  };

  const dvToSlider = (dv: number) => {
    const logMin = Math.log10(0.001);
    const logMax = Math.log10(10);
    return ((Math.log10(dv) - logMin) / (logMax - logMin)) * 1000;
  };

  const sliderToDv = (v: number) => {
    const logMin = Math.log10(0.001);
    const logMax = Math.log10(10);
    return Math.pow(10, logMin + (v / 1000) * (logMax - logMin));
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-5">
      <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase">偏转推演参数</h3>

      <div>
        <label className="text-xs text-slate-400 mb-1.5 block">小行星直径</label>
        <div className="flex gap-2">
          {[50, 140, 500, 1000].map(d => (
            <button
              key={d}
              onClick={() => onAsteroidChange({ ...asteroid, diameter: d })}
              className={`flex-1 py-1.5 rounded-lg text-xs transition-all border ${
                asteroid.diameter === d
                  ? 'bg-nebula-500/30 border-nebula-500/50 text-white'
                  : 'bg-space-800 border-slate-700/50 text-slate-400 hover:border-nebula-500/30'
              }`}
            >
              {d >= 1000 ? `${d / 1000}km` : `${d}m`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-400 mb-1.5 block">密度类型</label>
        <div className="flex gap-2">
          {DENSITY_OPTIONS.map(opt => (
            <button
              key={opt.type}
              onClick={() => onAsteroidChange({ ...asteroid, densityType: opt.type })}
              className={`flex-1 py-1.5 rounded-lg text-xs transition-all border ${
                asteroid.densityType === opt.type
                  ? 'bg-nebula-500/30 border-nebula-500/50 text-white'
                  : 'bg-space-800 border-slate-700/50 text-slate-400 hover:border-nebula-500/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>距撞击剩余时间</span>
          <span className="text-nebula-300 font-display">{formatTime(timeYears)}</span>
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          value={timeToSlider(timeYears)}
          onChange={e => onTimeChange(sliderToTime(Number(e.target.value)))}
          className="slider-space w-full"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
          <span>1天</span>
          <span>10年</span>
        </div>
      </div>

      <div>
        <label className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>动能撞击器 Δv</span>
          <span className="text-nebula-300 font-display">
            {deltaVcmPerSec < 0.1 ? `${(deltaVcmPerSec * 10).toFixed(2)} mm/s` : `${deltaVcmPerSec.toFixed(2)} cm/s`}
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          value={dvToSlider(deltaVcmPerSec)}
          onChange={e => onDeltaVChange(sliderToDv(Number(e.target.value)))}
          className="slider-space w-full"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
          <span>0.001 cm/s</span>
          <span>10 cm/s</span>
        </div>
      </div>
    </div>
  );
}

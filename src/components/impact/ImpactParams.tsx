import type { AsteroidParams, DensityType } from '@/types';
import { presets } from '@/core/presets';

interface ImpactParamsProps {
  params: AsteroidParams;
  onChange: (p: AsteroidParams) => void;
}

const DENSITY_OPTIONS: { type: DensityType; label: string; emoji: string }[] = [
  { type: 'stony', label: '石质', emoji: '🪨' },
  { type: 'iron', label: '铁质', emoji: '⚙️' },
  { type: 'comet', label: '彗星', emoji: '☄️' },
];

export default function ImpactParams({ params, onChange }: ImpactParamsProps) {
  const update = (partial: Partial<AsteroidParams>) => onChange({ ...params, ...partial });

  const formatDiameter = (d: number) => {
    if (d >= 1000) return `${(d / 1000).toFixed(1)} km`;
    return `${d} m`;
  };

  return (
    <div className="glass-panel p-5 flex flex-col gap-5">
      <h3 className="font-display text-sm tracking-wider text-nebula-300 uppercase">撞击参数</h3>

      <div>
        <label className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>小行星直径</span>
          <span className="text-nebula-300 font-display">{formatDiameter(params.diameter)}</span>
        </label>
        <input
          type="range"
          min={0}
          max={1000}
          value={diameterToSlider(params.diameter)}
          onChange={e => update({ diameter: sliderToDiameter(Number(e.target.value)) })}
          className="slider-space w-full"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 mb-2 block">密度类型</label>
        <div className="flex gap-2">
          {DENSITY_OPTIONS.map(opt => (
            <button
              key={opt.type}
              onClick={() => update({ densityType: opt.type })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm transition-all border ${
                params.densityType === opt.type
                  ? 'bg-nebula-500/30 border-nebula-500/50 text-white'
                  : 'bg-space-800 border-slate-700/50 text-slate-400 hover:border-nebula-500/30'
              }`}
            >
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>撞击速度</span>
          <span className="text-nebula-300 font-display">{params.velocity} km/s</span>
        </label>
        <input
          type="range"
          min={11}
          max={72}
          step={1}
          value={params.velocity}
          onChange={e => update({ velocity: Number(e.target.value) })}
          className="slider-space w-full"
        />
      </div>

      <div>
        <label className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>撞击角度</span>
          <span className="text-nebula-300 font-display">{params.angle}°</span>
        </label>
        <input
          type="range"
          min={10}
          max={90}
          step={1}
          value={params.angle}
          onChange={e => update({ angle: Number(e.target.value) })}
          className="slider-space w-full"
        />
      </div>

      <div>
        <label className="text-xs text-slate-400 mb-2 block">预设场景</label>
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => onChange(p.params)}
              className="btn-preset"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function sliderToDiameter(v: number): number {
  if (v <= 400) return Math.round((v / 400) * 500);
  if (v <= 700) return Math.round(500 + ((v - 400) / 300) * 9500);
  return Math.round(10000 + ((v - 700) / 300) * 490000);
}

function diameterToSlider(d: number): number {
  if (d <= 500) return (d / 500) * 400;
  if (d <= 10000) return 400 + ((d - 500) / 9500) * 300;
  return 700 + ((d - 10000) / 490000) * 300;
}

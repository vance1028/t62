import { useNavigate } from 'react-router-dom';
import { Flame, Shield, ChevronRight } from 'lucide-react';
import StarField from '@/components/common/StarField';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <StarField count={150} />

      <div className="relative z-10 text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-wider mb-3">
          行星防御推演
        </h1>
        <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
          直观理解小行星撞击地球的威力，<br />
          探索动能撞击器偏转小行星轨道的原理
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 max-w-3xl w-full px-6">
        <button
          onClick={() => navigate('/impact')}
          className="group flex-1 glass-panel glow-border p-8 text-left transition-all hover:scale-[1.02] hover:border-red-500/40"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Flame size={24} className="text-red-400" />
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-red-400 transition-colors" />
          </div>
          <h2 className="font-display text-lg font-semibold text-white mb-2">撞击效应推演</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            设定小行星参数，推演撞击动能、陨石坑、冲击波和热辐射的破坏范围
          </p>
        </button>

        <button
          onClick={() => navigate('/deflection')}
          className="group flex-1 glass-panel glow-border p-8 text-left transition-all hover:scale-[1.02] hover:border-emerald-500/40"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Shield size={24} className="text-emerald-400" />
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h2 className="font-display text-lg font-semibold text-white mb-2">轨道偏转推演</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            体验"越早干预，所需力量越小"的行星防御核心理念
          </p>
        </button>
      </div>

      <div className="relative z-10 mt-12 text-[11px] text-slate-600 text-center">
        纯前端模拟 · 物理计算基于公认经验公式 · 仅供科普教育用途
      </div>
    </div>
  );
}

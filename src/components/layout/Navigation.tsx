import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Shield, Home } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: '/', label: '首页', icon: Home },
    { path: '/impact', label: '撞击效应', icon: Flame },
    { path: '/deflection', label: '轨道偏转', icon: Shield },
  ];

  return (
    <nav className="glass-panel flex items-center gap-1 px-3 py-2 mb-6">
      {links.map(({ path, label, icon: Icon }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              active
                ? 'bg-nebula-500/30 text-white border border-nebula-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

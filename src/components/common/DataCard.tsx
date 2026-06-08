import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface DataCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  color?: string;
}

export default function DataCard({ icon: Icon, label, value, unit, sub, color = 'text-nebula-300' }: DataCardProps) {
  return (
    <motion.div
      className="data-card flex flex-col gap-1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} className={color} />
        <span>{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-lg font-bold font-display ${color}`}>{value}</span>
        {unit && <span className="text-xs text-slate-400">{unit}</span>}
      </div>
      {sub && <span className="text-[11px] text-slate-500">{sub}</span>}
    </motion.div>
  );
}

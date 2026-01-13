import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  color?: 'red' | 'blue' | 'emerald' | 'amber' | 'purple';
}

const colorStyles = {
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: 'text-red-500'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: 'text-blue-500'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    icon: 'text-emerald-500'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    icon: 'text-amber-500'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    icon: 'text-purple-500'
  }
};

export function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  description, 
  color = 'blue' 
}: MetricCardProps) {
  const styles = colorStyles[color];

  return (
    <div className={`${styles.bg} border ${styles.border} p-6 rounded-3xl transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className={`${styles.icon}`} size={28} />
      </div>
      
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {label}
      </p>
      
      <p className={`text-3xl font-black ${styles.text} mb-3`}>
        {value}
      </p>
      
      <p className="text-xs text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

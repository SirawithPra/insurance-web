import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  description?: string;
  color?: 'blue' | 'red' | 'green' | 'amber' | 'purple' | 'emerald';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  purple: 'bg-purple-100 text-purple-600'
};

const textColors = {
  blue: 'text-blue-900',
  red: 'text-red-900',
  green: 'text-green-900',
  emerald: 'text-emerald-900',
  amber: 'text-amber-900',
  purple: 'text-purple-900'
};

export function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  subtext,
  description,
  color = 'blue' 
}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-600 mb-1">{label}</p>
          <p className={`text-2xl font-black ${textColors[color]} truncate`}>
            {value}
          </p>
          {(subtext || description) && (
            <p className="text-xs text-slate-500 mt-1">{subtext || description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
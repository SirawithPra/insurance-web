
import { Check, X, ChevronRight, LucideIcon } from 'lucide-react';

interface InsuranceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  onClick?: () => void;
}

export function InsuranceCard({ 
  icon: Icon, 
  title, 
  description, 
  pros, 
  cons, 
  onClick 
}: InsuranceCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-3xl border-2 border-slate-200 p-8 hover:border-red-500 hover:shadow-2xl transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
            <Icon className="text-red-600 group-hover:text-white transition-colors" size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">{title}</h3>
            <p className="text-slate-600 mt-1">{description}</p>
          </div>
        </div>
        <ChevronRight className="text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" size={24} />
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="space-y-3">
          <h4 className="font-bold text-green-700 flex items-center gap-2">
            <Check size={18} />
            ข้อดี
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="space-y-3">
          <h4 className="font-bold text-amber-700 flex items-center gap-2">
            <X size={18} />
            ข้อควรระวัง
          </h4>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

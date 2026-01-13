
import { LucideIcon } from 'lucide-react';

interface InsuranceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  isActive?: boolean;
  onClick?: () => void;
}

export function InsuranceCard({ 
  icon: Icon, 
  title, 
  description, 
  pros, 
  cons, 
  isActive = false,
  onClick 
}: InsuranceCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${
        isActive 
          ? 'bg-gradient-to-br from-red-600 to-red-700 border-red-600 text-white shadow-2xl scale-105' 
          : 'bg-white border-slate-200 hover:border-red-200 hover:shadow-lg'
      }`}
    >
      <Icon className={`mb-6 ${isActive ? 'text-white' : 'text-red-600'}`} size={40} />
      
      <h3 className={`text-2xl font-black mb-3 ${isActive ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      
      <p className={`text-sm mb-6 ${isActive ? 'text-red-50' : 'text-slate-600'}`}>
        {description}
      </p>
      
      <div className="space-y-4">
        <div>
          <h4 className={`text-xs font-bold mb-2 uppercase tracking-wider ${isActive ? 'text-red-100' : 'text-emerald-600'}`}>
            ✓ ข้อดี
          </h4>
          <ul className="space-y-1">
            {pros.map((pro, idx) => (
              <li key={idx} className={`text-xs ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                • {pro}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className={`text-xs font-bold mb-2 uppercase tracking-wider ${isActive ? 'text-red-100' : 'text-amber-600'}`}>
            ! ข้อควรระวัง
          </h4>
          <ul className="space-y-1">
            {cons.map((con, idx) => (
              <li key={idx} className={`text-xs ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                • {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

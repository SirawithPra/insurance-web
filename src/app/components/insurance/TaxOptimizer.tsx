
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface TaxOptimizerProps {
  taxExp: 'none' | 'low' | 'high';
  hasDeduction: 'none' | 'some' | 'many';
  onTaxExpChange: (value: 'none' | 'low' | 'high') => void;
  onDeductionChange: (value: 'none' | 'some' | 'many') => void;
  suitability: {
    status: 'NOT_RECOMMENDED' | 'RESTRICTED' | 'PARTIAL' | 'RECOMMENDED';
    msg: string;
  };
}

export function TaxOptimizer({
  taxExp,
  hasDeduction,
  onTaxExpChange,
  onDeductionChange,
  suitability
}: TaxOptimizerProps) {
  const getStatusColor = () => {
    switch (suitability.status) {
      case 'RECOMMENDED':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'NOT_RECOMMENDED':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'RESTRICTED':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getStatusIcon = () => {
    switch (suitability.status) {
      case 'RECOMMENDED':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'NOT_RECOMMENDED':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'RESTRICTED':
        return <AlertTriangle size={16} className="text-amber-500" />;
      default:
        return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
        คัดกรองความเหมาะสมด้านภาษี
      </h3>

      {/* Question 1 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">
          1. เคยจ่ายภาษีเพิ่มปลายปีไหม?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'none', label: 'ไม่เคย' },
            { value: 'low', label: 'เล็กน้อย' },
            { value: 'high', label: 'เยอะ' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onTaxExpChange(option.value as 'none' | 'low' | 'high')}
              className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                taxExp === option.value
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question 2 */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">
          2. มีสิทธิลดหย่อนอื่นเยอะแล้วหรือยัง?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'none', label: 'แทบไม่มี' },
            { value: 'some', label: 'มีบ้าง' },
            { value: 'many', label: 'เยอะมาก' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onDeductionChange(option.value as 'none' | 'some' | 'many')}
              className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                hasDeduction === option.value
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Suitability Result */}
      <div className={`p-4 border-2 rounded-2xl flex gap-3 items-start ${getStatusColor()}`}>
        <div className="shrink-0 mt-0.5">
          {getStatusIcon()}
        </div>
        <p className="text-sm font-bold leading-relaxed">
          {suitability.msg}
        </p>
      </div>
    </div>
  );
}

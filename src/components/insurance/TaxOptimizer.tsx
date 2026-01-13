
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { TaxExpense, DeductionLevel } from '../../types/insurance';

interface TaxOptimizerResult {
  status: 'RECOMMENDED' | 'RESTRICTED' | 'NOT_RECOMMENDED';
  reason: string;
  recommendation: string;
}

interface TaxOptimizerProps {
  taxExp: TaxExpense;
  hasDeduction: DeductionLevel;
  onTaxExpChange: (value: TaxExpense) => void;
  onDeductionChange: (value: DeductionLevel) => void;
  suitability: TaxOptimizerResult;
}

export function TaxOptimizer({ 
  taxExp,
  hasDeduction,
  onTaxExpChange,
  onDeductionChange,
  suitability 
}: TaxOptimizerProps) {
  const isSuitable = suitability.status === 'RECOMMENDED';

  return (
    <div className="space-y-4">
      {/* Tax Expense Question */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">
          คุณจ่ายภาษีเยอะไหม?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onTaxExpChange(level)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                taxExp === level
                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {level === 'low' && 'น้อย'}
              {level === 'medium' && 'ปานกลาง'}
              {level === 'high' && 'เยอะ'}
            </button>
          ))}
        </div>
      </div>

      {/* Deduction Question */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">
          มีลดหย่อนอื่นแล้วไหม?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['none', 'some', 'full'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onDeductionChange(level)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                hasDeduction === level
                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {level === 'none' && 'ไม่มี'}
              {level === 'some' && 'มีบ้าง'}
              {level === 'full' && 'เต็มแล้ว'}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className={`p-4 rounded-2xl border-2 ${
        isSuitable 
          ? 'bg-green-50 border-green-500' 
          : 'bg-amber-50 border-amber-500'
      }`}>
        <div className="flex items-start gap-3">
          {isSuitable ? (
            <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
          ) : (
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          )}
          
          <div className="space-y-2">
            <h4 className={`font-black text-sm ${
              isSuitable ? 'text-green-900' : 'text-amber-900'
            }`}>
              {isSuitable ? '✅ เหมาะสม' : '⚠️ ควรพิจารณา'}
            </h4>
            
            <p className={`text-xs ${
              isSuitable ? 'text-green-800' : 'text-amber-800'
            }`}>
              {suitability.reason}
            </p>
            
            <p className={`text-xs font-bold ${
              isSuitable ? 'text-green-800' : 'text-amber-800'
            }`}>
              → {suitability.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
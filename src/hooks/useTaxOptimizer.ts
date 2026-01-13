import { useMemo, useEffect } from 'react';
import type { TaxExpense, DeductionLevel, TaxSuitability } from '../types/insurance';

// =====================
// Tax Optimizer Hook
// =====================

export interface TaxOptimizerParams {
  taxExp: TaxExpense;
  hasDeduction: DeductionLevel;
}

export function useTaxOptimizer(params: TaxOptimizerParams): TaxSuitability {
  const { taxExp, hasDeduction } = params;

  return useMemo(() => {
    // Logic: หากไม่เคยเสียภาษีเพิ่ม และมีลดหย่อนเยอะอยู่แล้ว -> ไม่ควรเน้นภาษี
    if (taxExp === 'none' && hasDeduction === 'many') {
      return {
        status: 'NOT_RECOMMENDED',
        msg: 'แผนลดหย่อนภาษีไม่จำเป็นสำหรับคุณ แนะนำเลือกแบบ "ไม่เน้นภาษี"'
      };
    }

    // Logic: หากไม่เคยเสียภาษีเลย หรือ มีลดหย่อนเยอะแล้ว -> จำกัดการเลือก
    if (taxExp === 'none' || hasDeduction === 'many') {
      return {
        status: 'RESTRICTED',
        msg: 'คุณควรเลือกแบบ "ไม่เน้นภาษี" หรือ "สมดุล" เท่านั้น'
      };
    }

    // Logic: เคยเสียเยอะ และลดหย่อนน้อย -> เหมาะมาก
    if (taxExp === 'high' && hasDeduction === 'none') {
      return {
        status: 'RECOMMENDED',
        msg: 'คุณสามารถใช้แผนนี้เพื่อลดภาษีได้อย่างเต็มประสิทธิภาพ ✓'
      };
    }

    // Default case
    return {
      status: 'PARTIAL',
      msg: 'ผลด้านภาษีขึ้นอยู่กับรายได้และสิทธิลดหย่อนอื่นๆ ของคุณ'
    };
  }, [taxExp, hasDeduction]);
}

// =====================
// Auto-adjust Tax Mindset Hook
// =====================

export function useAutoAdjustTaxMindset(
  suitability: TaxSuitability,
  currentMindset: string,
  setTaxMindset: (mindset: string) => void
) {
  useEffect(() => {
    // Auto-adjust if not recommended
    if (suitability.status === 'NOT_RECOMMENDED' && currentMindset !== 'none') {
      setTaxMindset('none');
    } 
    // Auto-adjust if restricted and user selected high tax options
    else if (
      suitability.status === 'RESTRICTED' && 
      (currentMindset === 'focus' || currentMindset === 'high')
    ) {
      setTaxMindset('balance');
    }
  }, [suitability, currentMindset, setTaxMindset]);
}

// =====================
// Tax Saving Calculator Hook
// =====================

export interface TaxSavingParams {
  annualPremium: number;
  taxRate: number;
}

export function useTaxSavingCalculation(params: TaxSavingParams) {
  const { annualPremium, taxRate } = params;

  return useMemo(() => {
    const maxDeduction = 100000; // Maximum deduction allowed
    const deductibleAmount = Math.min(annualPremium, maxDeduction);
    const taxSaving = deductibleAmount * taxRate;
    const netPremium = annualPremium - taxSaving;
    const effectiveReturn = annualPremium > 0 ? (taxSaving / annualPremium) * 100 : 0;

    return {
      deductibleAmount,
      taxSaving,
      netPremium,
      effectiveReturn: Math.round(effectiveReturn * 100) / 100,
      isMaxedOut: annualPremium >= maxDeduction
    };
  }, [annualPremium, taxRate]);
}
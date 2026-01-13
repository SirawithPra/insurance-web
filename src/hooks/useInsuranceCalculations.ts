import { useMemo } from 'react';
import { SAVING_RATES, HEALTH_PLANS } from '../constants/insurance';
import type { SavingCalculation, HealthCalculation, ChartDataPoint } from '../types/insurance';

// =====================
// Savings Calculation Hook
// =====================

export interface SavingsParams {
  age: number;
  sumAssured: number;
  investYield: number;
  taxRate: number;
}

export function useSavingsCalculation(params: SavingsParams): SavingCalculation {
  const { age, sumAssured, investYield, taxRate } = params;

  return useMemo(() => {
    // Find base rate by age
    const baseRate = SAVING_RATES.find((r) => age <= r.maxAge)?.rate || 96;
    
    // Calculate discount based on sum assured
    const discount = sumAssured >= 600000 ? 1.5 : sumAssured >= 300000 ? 1.0 : 0;
    
    // Calculate annual premium
    const premium = (sumAssured / 1000) * (baseRate - discount);
    
    // Calculate tax savings
    const annualTaxSaving = premium * taxRate;
    const netOutflow = premium - annualTaxSaving;

    // Generate projection data
    let investBal = 0;
    let currentRawCum = 0;
    let currentNetCum = 0;
    
    const data: ChartDataPoint[] = Array.from({ length: 35 }, (_, i) => {
      const y = i + 1;
      const outflow = y <= 15 ? netOutflow : 0;
      const raw = y <= 15 ? premium : 0;
      currentRawCum += raw;
      currentNetCum += outflow;
      investBal = (investBal + outflow) * (1 + investYield / 100);

      let death = null;
      let cashValue = null;
      
      if (y <= 25) {
        // Death benefit calculation
        death = sumAssured;
        if (y === 12) death *= 1.1;
        else if (y === 13) death *= 1.15;
        else if (y === 14) death *= 1.25;
        else if (y >= 15) death *= 1.35;

        // Cash value calculation
        cashValue = y < 2 ? 0 : sumAssured * 0.7 * (y / 15);
        if (y >= 15) {
          cashValue = sumAssured * 0.9 + sumAssured * 0.31 * ((y - 15) / 10);
        }
        if (y === 25) cashValue = sumAssured * 1.21;
      }

      return {
        year: y,
        investment: Math.round(investBal),
        death,
        cashValue,
        premium: currentRawCum,
        netPremium: currentNetCum
      };
    });

    // Find break-even year
    const breakEvenYear =
      data.findIndex(
        (d, i) =>
          (d.cashValue || 0) + 
          (i < 15 ? annualTaxSaving * (i + 1) : annualTaxSaving * 15) >= 
          (d.premium || 0)
      ) + 1;

    return {
      premium: Math.round(premium),
      annualTaxSaving: Math.round(annualTaxSaving),
      netOutflow: Math.round(netOutflow),
      data,
      breakEvenYear: breakEvenYear > 0 ? breakEvenYear : 0,
      totalReturn: Math.round(sumAssured * 1.21)
    };
  }, [age, sumAssured, investYield, taxRate]);
}

// =====================
// Health Plan Calculation Hook
// =====================

export interface HealthParams {
  age: number;
  planId: string;
}

export function useHealthCalculation(params: HealthParams): HealthCalculation | null {
  const { age, planId } = params;

  return useMemo(() => {
    const plan = HEALTH_PLANS.find((p) => p.id === planId);
    if (!plan) return null;

    // Calculate age factor for premium
    const ageFactor = age < 30 ? 0.8 : age < 45 ? 1.1 : age < 60 ? 2.0 : 3.5;
    
    // Estimate annual premium (simplified calculation)
    const annualPremium = Math.round(18000 * (plan.limit / 1000000) * ageFactor * 0.5);

    return {
      ...plan,
      annualPremium
    };
  }, [age, planId]);
}

// =====================
// Life Protection Calculation Hook
// =====================

export function useLifeProtectionCalculation(monthlyExpense: number, multiplier: number = 10) {
  return useMemo(() => {
    const recommendedCoverage = monthlyExpense * 12 * multiplier;
    const yearlyExpense = monthlyExpense * 12;

    return {
      recommendedCoverage,
      monthlyExpense,
      yearlyExpense,
      multiplier,
      breakdown: {
        emergencyFund: monthlyExpense * 6, // 6 months emergency fund
        debtClearance: monthlyExpense * 12 * 2, // 2 years for debt clearance
        livingExpenses: monthlyExpense * 12 * (multiplier - 2 - 0.5), // Remaining years
      }
    };
  }, [monthlyExpense, multiplier]);
}
/**
 * Insurance Needs Analysis Service
 *
 * This module performs quantitative, scenario-based analysis
 * to estimate insurance coverage adequacy using user-provided inputs.
 *
 * Outputs represent estimated financial exposure under
 * hypothetical scenarios and reference assumptions.
 *
 * This model does NOT generate personalized recommendations
 * and must not be interpreted as licensed financial advice.
 */

import type { AnalysisFormData, CoverageEstimate, PremiumEstimate, ScenarioPlan, AnalysisResult } from '../types/analysis';

// =====================
// Helper Functions
// =====================

const calculatePV = (payment: number, rate: number, periods: number): number => {
  if (rate === 0) return payment * periods;
  return payment * (1 - Math.pow(1 + rate, -periods)) / rate;
};

// =====================
// Human Life Value Calculation
// =====================

export const calculateHumanLifeValue = (data: AnalysisFormData): number => {
  const currentAge = data.age;
  const retirementAge = data.retirementAge;
  const annualIncome = data.annualIncome;
  const incomeGrowth = data.incomeGrowth / 100;
  const inflation = data.inflation / 100;
  const investReturn = data.investmentReturn / 100;
  
  const yearsToRetirement = Math.max(retirementAge - currentAge, 1);
  const riskPremium = 0.02; // Risk adjustment
  
  let hlv = 0;
  for (let year = 1; year <= yearsToRetirement; year++) {
    const futureIncome = annualIncome * Math.pow(1 + incomeGrowth, year);
    const discountFactor = Math.pow(1 + inflation + riskPremium, year);
    hlv += futureIncome / discountFactor;
  }
  
  return hlv;
};

// =====================
// Life Coverage Estimation
// =====================

export const estimateLifeCoverage = (data: AnalysisFormData): number => {
  const hlv = calculateHumanLifeValue(data);
  
  // PV of Debts
  const totalDebt = data.mortgageDebt + data.otherDebt;
  
  // PV of Child Raising Costs
  const childCostPV = data.numChildren > 0 
    ? calculatePV(data.childRaisingCostPerYear * data.numChildren, data.inflation / 100, 18)
    : 0;
  
  // PV of Retirement Expenses
  const retirementYears = Math.max(data.lifeExpectancy - data.retirementAge, 0);
  const retirementPV = calculatePV(
    data.retirementExpenseMonthly * 12, 
    data.inflation / 100, 
    retirementYears
  );
  
  // Subtract Assets
  const yearsToRetirement = Math.max(data.retirementAge - data.age, 1);
  const investmentGrowth = data.liquidAssets * Math.pow(1 + data.investmentReturn / 100, yearsToRetirement);
  
  const lifeCoverage = Math.max(
    hlv + totalDebt + childCostPV + retirementPV - investmentGrowth - data.expectedInheritance,
    0
  );
  
  return Math.round(lifeCoverage / 100000) * 100000;
};

// =====================
// Health Coverage Estimation
// =====================

export const estimateHealthCoverage = (data: AnalysisFormData): number => {
  const age = data.age;
  const medicalInflation = data.medicalInflation / 100;
  
  // Age-Banded Base Coverage
  let baseCoverage: number;
  if (age < 30) baseCoverage = 1000000;
  else if (age < 40) baseCoverage = 2000000;
  else if (age < 50) baseCoverage = 3500000;
  else if (age < 60) baseCoverage = 6000000;
  else baseCoverage = 10000000;
  
  // Medical inflation adjustment from age 35 baseline
  const yearsDiff = age - 35;
  const inflationAdjusted = baseCoverage * Math.pow(1 + medicalInflation, yearsDiff);
  
  // Government benefit reduction
  let govReduction = 0;
  if (data.govBenefit === 'government') govReduction = 0.40;
  else if (data.govBenefit === 'social') govReduction = 0.30;
  
  // BMI Factor
  const bmiFactor = data.bmi > 30 ? 1.4 : 1.0;
  
  // Smoking Factor
  const smokingFactor = data.smoking === 'Y' ? 1.25 : 1.0;
  
  const healthCoverage = inflationAdjusted * (1 - govReduction) * bmiFactor * smokingFactor;
  
  return Math.round(healthCoverage / 100000) * 100000;
};

// =====================
// Income Protection Estimation
// =====================

export const estimateIncomeProtection = (data: AnalysisFormData): number => {
  const monthlyIncome = data.annualIncome / 12;
  
  // Occupation Risk Factor
  let occRisk = 1.0;
  if (data.occupationRisk === 'heavy') occRisk = 1.8;
  else if (data.occupationRisk === 'moderate') occRisk = 1.3;
  
  // Chronic Disease Factor
  const diseaseFactor = data.chronicDisease === 'Y' ? 1.2 : 1.0;
  
  const dailyBenefit = Math.min(100000, monthlyIncome * 0.7 * occRisk);
  const annualCoverage = dailyBenefit * 180 * diseaseFactor;
  
  return Math.round(annualCoverage / 100000) * 100000;
};

// =====================
// Critical Illness Estimation
// =====================

export const estimateCriticalIllness = (data: AnalysisFormData, lifeCoverage: number): number => {
  // Disease-Specific Probability × Cost (Reference from public health data)
  const cancerCost = 3800000 * 0.021; // 2.1% probability
  const heartCost = 2900000 * 0.018;  // 1.8% probability
  const strokeCost = 4200000 * 0.015; // 1.5% probability
  
  const expectedCost = cancerCost + heartCost + strokeCost;
  const additionalBuffer = lifeCoverage * 0.4; // 40% of life coverage
  
  const ciCoverage = expectedCost + additionalBuffer;
  
  return Math.round(ciCoverage / 100000) * 100000;
};

// =====================
// Accident Coverage Estimation
// =====================

export const estimateAccidentCoverage = (data: AnalysisFormData): number => {
  const annualIncome = data.annualIncome;
  
  // Occupation Risk Factor
  let occFactor = 1.0;
  if (data.occupationRisk === 'heavy') occFactor = 1.8;
  else if (data.occupationRisk === 'moderate') occFactor = 1.3;
  
  // Base + Disability Risk
  const baseCoverage = 5000000;
  const disabilityRisk = annualIncome * 0.15 * occFactor;
  
  const accidentCoverage = baseCoverage + disabilityRisk;
  
  return Math.round(accidentCoverage / 100000) * 100000;
};

// =====================
// Premium Estimation
// =====================

export const estimatePremiums = (coverage: CoverageEstimate, data: AnalysisFormData): PremiumEstimate => {
  const age = data.age;
  const gender = data.gender;
  
  // Gender adjustment
  const genderFactor = gender === 'F' ? 1.15 : 1.0;
  
  // Life Insurance Premium (per 100k coverage)
  let lifeRate: number;
  if (age < 30) lifeRate = 80;
  else if (age < 40) lifeRate = 120;
  else if (age < 50) lifeRate = 180;
  else lifeRate = 280;
  
  const lifePremium = (coverage.life / 100000) * lifeRate * genderFactor;
  
  // Health Insurance Premium
  let healthPremium: number;
  if (age < 30) healthPremium = 8000;
  else if (age < 40) healthPremium = 12000;
  else if (age < 50) healthPremium = 18000;
  else if (age < 60) healthPremium = 25000;
  else healthPremium = 35000;
  
  healthPremium *= genderFactor;
  if (data.smoking === 'Y') healthPremium *= 1.3;
  if (data.bmi > 30) healthPremium *= 1.2;
  
  // CI Premium
  const ciPremium = (coverage.ci / 1000000) * 3000 * (age < 40 ? 1 : age < 50 ? 1.5 : 2);
  
  // Income Protection Premium
  const incomeProtectionPremium = (coverage.incomeProtection / 1000000) * 1500;
  
  // Accident Premium
  const accidentPremium = (coverage.accident / 1000000) * 800;
  
  // Vitality Score Discount
  let vitalityDiscount = 1.0;
  if (data.vitalityScore === 'gold') vitalityDiscount = 0.85;
  else if (data.vitalityScore === 'silver') vitalityDiscount = 0.92;
  
  const totalMonthly = (lifePremium + healthPremium + ciPremium + incomeProtectionPremium + accidentPremium) * vitalityDiscount / 12;
  
  return {
    life: Math.round(lifePremium / 12),
    health: Math.round(healthPremium / 12),
    ci: Math.round(ciPremium / 12),
    incomeProtection: Math.round(incomeProtectionPremium / 12),
    accident: Math.round(accidentPremium / 12),
    total: Math.round(totalMonthly)
  };
};

// =====================
// Generate Scenario Plans
// =====================

export const generateScenarioPlans = (
  baseCoverage: CoverageEstimate,
  basePremiums: PremiumEstimate,
  data: AnalysisFormData
): ScenarioPlan[] => {
  const plans: ScenarioPlan[] = [];
  
  // Scenario A - Basic (60% of base)
  plans.push({
    name: 'สถานการณ์ A - พื้นฐาน',
    level: 'basic',
    coverage: {
      life: Math.round(baseCoverage.life * 0.6 / 100000) * 100000,
      health: data.govBenefit === 'government' ? 0 : Math.round(baseCoverage.health * 0.5 / 100000) * 100000,
      ci: 0,
      incomeProtection: 0,
      accident: Math.round(baseCoverage.accident * 0.5 / 100000) * 100000
    },
    premium: Math.round(basePremiums.total * 0.4),
    priority: ['ประกันชีวิต (แบบสะสมทรัพย์)', 'อุบัติเหตุ'],
    description: 'ความคุ้มครองขั้นต่ำตามการวิเคราะห์'
  });
  
  // Scenario B - Standard (100% of base)
  plans.push({
    name: 'สถานการณ์ B - อ้างอิง',
    level: 'standard',
    coverage: baseCoverage,
    premium: basePremiums.total,
    priority: ['ประกันชีวิต', 'สุขภาพ', 'โรคร้ายแรง', 'ชดเชยรายได้', 'อุบัติเหตุ'],
    description: 'ตามกรอบการวิเคราะห์มาตรฐาน'
  });
  
  // Scenario C - Comprehensive (140% of base)
  plans.push({
    name: 'สถานการณ์ C - ครอบคลุม',
    level: 'comprehensive',
    coverage: {
      life: Math.round(baseCoverage.life * 1.4 / 100000) * 100000,
      health: Math.round(baseCoverage.health * 1.4 / 100000) * 100000,
      ci: Math.round(baseCoverage.ci * 1.4 / 100000) * 100000,
      incomeProtection: Math.round(baseCoverage.incomeProtection * 1.4 / 100000) * 100000,
      accident: Math.round(baseCoverage.accident * 1.5 / 100000) * 100000
    },
    premium: Math.round(basePremiums.total * 1.5),
    priority: ['ประกันชีวิต', 'สุขภาพ', 'โรคร้ายแรง', 'ชดเชยรายได้', 'อุบัติเหตุ', 'ออม/ลงทุน'],
    description: 'ความคุ้มครองเพิ่มเติมจากสถานการณ์อ้างอิง'
  });
  
  return plans;
};

// =====================
// Main Analysis Function
// =====================

export const analyzeInsuranceNeeds = (data: AnalysisFormData): AnalysisResult => {
  const lifeCoverage = estimateLifeCoverage(data);
  const healthCoverage = estimateHealthCoverage(data);
  const incomeProtection = estimateIncomeProtection(data);
  const ciCoverage = estimateCriticalIllness(data, lifeCoverage);
  const accidentCoverage = estimateAccidentCoverage(data);
  
  const coverage: CoverageEstimate = {
    life: lifeCoverage,
    health: healthCoverage,
    incomeProtection,
    ci: ciCoverage,
    accident: accidentCoverage
  };
  
  const premiums = estimatePremiums(coverage, data);
  
  // Calculate PPR (Premium Payment Ratio)
  const totalPremiumYearly = premiums.total * 12;
  const ppr = totalPremiumYearly > 0 ? lifeCoverage / totalPremiumYearly : 0;
  
  // Tax Savings (max 100k)
  const taxSavings = Math.min(totalPremiumYearly, 100000) * (data.taxBracket / 100);
  const netPremium = premiums.total - Math.round(taxSavings / 12);
  
  // Generate Scenario Plans
  const plans = generateScenarioPlans(coverage, premiums, data);
  
  return {
    coverage,
    premiums,
    ppr,
    taxSavings,
    netPremium,
    plans,
    totalCoverage: lifeCoverage + healthCoverage + ciCoverage + accidentCoverage,
    metadata: {
      calculatedAt: new Date(),
      assumptions: [
        `อัตราเงินเฟ้อ: ${data.inflation}%`,
        `อัตราเงินเฟ้อทางการแพทย์: ${data.medicalInflation}%`,
        `ผลตอบแทนการลงทุน: ${data.investmentReturn}%`,
        `อัตราการเติบโตของรายได้: ${data.incomeGrowth}%`
      ]
    }
  };
};

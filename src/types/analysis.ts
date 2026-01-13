// =====================
// Insurance Analysis Types
// =====================

export interface AnalysisFormData {
  // Basic Info
  age: number;
  gender: 'M' | 'F';
  maritalStatus: 'single' | 'married' | 'divorced';
  numChildren: number;
  retirementAge: number;
  lifeExpectancy: number;
  govBenefit: 'none' | 'social' | 'government';
  
  // Financial
  annualIncome: number;
  incomeGrowth: number;
  inflation: number;
  mortgageDebt: number;
  otherDebt: number;
  liquidAssets: number;
  investmentReturn: number;
  expectedInheritance: number;
  
  // Family & Health
  childRaisingCostPerYear: number;
  retirementExpenseMonthly: number;
  emergencyFundMonths: number;
  bmi: number;
  smoking: 'Y' | 'N';
  occupationRisk: 'office' | 'moderate' | 'heavy';
  chronicDisease: 'Y' | 'N';
  medicalInflation: number;
  
  // Behavioral
  taxBracket: number;
  vitalityScore: 'none' | 'silver' | 'gold';
}

export interface CoverageEstimate {
  life: number;
  health: number;
  incomeProtection: number;
  ci: number;
  accident: number;
}

export interface PremiumEstimate {
  life: number;
  health: number;
  ci: number;
  incomeProtection: number;
  accident: number;
  total: number;
}

export interface ScenarioPlan {
  name: string;
  level: 'basic' | 'standard' | 'comprehensive';
  coverage: CoverageEstimate;
  premium: number;
  priority: string[];
  description: string;
}

export interface AnalysisResult {
  coverage: CoverageEstimate;
  premiums: PremiumEstimate;
  ppr: number;
  taxSavings: number;
  netPremium: number;
  plans: ScenarioPlan[];
  totalCoverage: number;
  metadata: {
    calculatedAt: Date;
    assumptions: string[];
  };
}

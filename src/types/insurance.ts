// =====================
// Insurance Types
// =====================

export interface InsuranceType {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
}

export interface SavingRate {
  maxAge: number;
  rate: number;
}

export interface HealthPlan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  limit: number;
  room: number;
  opd: string;
}

export interface PAPlan {
  id: string;
  premium: number;
  title: string;
  subtitle: string;
  death: number;
  medical: number;
  description: string;
}

export interface TaxMindset {
  id: 'none' | 'balance' | 'focus' | 'high';
  label: string;
  sub: string;
  rate: number;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  image: string;
  summary: string;
  customerName: string;
  customerAge: number;
  occupation: string;
  problem: string;
  solution: string;
  result: string;
  premium: number;
  coverage: number;
  insuranceType: 'life' | 'savings' | 'health' | 'accident';
  tags?: string[];
  author?: string;
  publishedAt?: string;
}

export interface Comment {
  id: string;
  articleId: number;
  author: string;
  content: string;
  createdAt: string;
  rating?: number;
}

// =====================
// Calculation Types
// =====================

export interface ChartDataPoint {
  year: number;
  investment: number;
  death: number | null;
  cashValue: number | null;
  premium: number;
  netPremium: number;
}

export interface SavingCalculation {
  premium: number;
  annualTaxSaving: number;
  netOutflow: number;
  data: ChartDataPoint[];
  breakEvenYear: number;
  totalReturn: number;
}

export interface HealthCalculation extends HealthPlan {
  annualPremium: number;
}

// =====================
// Tax Suitability Types
// =====================

export type TaxExpense = 'none' | 'low' | 'high';
export type DeductionLevel = 'none' | 'some' | 'many';
export type SuitabilityStatus = 'NOT_RECOMMENDED' | 'RESTRICTED' | 'PARTIAL' | 'RECOMMENDED';

export interface TaxSuitability {
  status: SuitabilityStatus;
  msg: string;
}
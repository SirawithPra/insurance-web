import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { ProgressSteps } from '../components/analysis/ProgressSteps';
import { ProductExamples } from '../components/analysis/ProductExamples';
import { analyzeInsuranceNeeds } from '../services/needsAnalysisService';
import type { AnalysisFormData, AnalysisResult } from '../types/analysis';
import {
  METHODOLOGY_DESCRIPTION,
  CALCULATION_SCOPE,
  ANALYSIS_METHODS,
  DATA_SOURCES,
  DISCLAIMER_TEXT,
  PRIVACY_NOTE,
  SCENARIO_LABELS
} from '../constants/methodology';
import {
  Shield,
  Calculator,
  AlertCircle,
  TrendingUp,
  FileText,
  Lock,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function NeedsAnalysisPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AnalysisFormData>({
    // Basic Info
    age: 35,
    gender: 'M',
    maritalStatus: 'married',
    numChildren: 2,
    retirementAge: 60,
    lifeExpectancy: 92,
    govBenefit: 'none',
    
    // Financial
    annualIncome: 600000,
    incomeGrowth: 5,
    inflation: 3.2,
    mortgageDebt: 0,
    otherDebt: 0,
    liquidAssets: 0,
    investmentReturn: 6,
    expectedInheritance: 0,
    
    // Family & Health
    childRaisingCostPerYear: 200000,
    retirementExpenseMonthly: 30000,
    emergencyFundMonths: 6,
    bmi: 23,
    smoking: 'N',
    occupationRisk: 'office',
    chronicDisease: 'N',
    medicalInflation: 8,
    
    // Behavioral
    taxBracket: 20,
    vitalityScore: 'none'
  });

  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['age', 'numChildren', 'retirementAge', 'lifeExpectancy', 'annualIncome', 
               'incomeGrowth', 'inflation', 'mortgageDebt', 'otherDebt', 'liquidAssets',
               'investmentReturn', 'expectedInheritance', 'childRaisingCostPerYear',
               'retirementExpenseMonthly', 'emergencyFundMonths', 'bmi', 'medicalInflation',
               'taxBracket'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleCalculate = () => {
    const analysisResults = analyzeInsuranceNeeds(formData);
    setResults(analysisResults);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Info className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">ขั้นตอนที่ 1: ข้อมูลพื้นฐาน</h3>
            <p className="text-sm text-blue-700">
              กรอกข้อมูลส่วนบุคคลเบื้องต้นเพื่อประเมินกรอบความต้องการ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อายุปัจจุบัน (ปี) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="35"
            min="18"
            max="70"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">เพศ</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="M">ชาย</option>
            <option value="F">หญิง</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">สถานภาพ</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="single">โสด</option>
            <option value="married">สมรส</option>
            <option value="divorced">หย่า</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">จำนวนบุตร</label>
          <input
            type="number"
            name="numChildren"
            value={formData.numChildren}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="0"
            min="0"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อายุเกษียณวางแผน
          </label>
          <input
            type="number"
            name="retirementAge"
            value={formData.retirementAge}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="60"
            min="50"
            max="70"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อายุคาดหวัง (Life Expectancy)
          </label>
          <input
            type="number"
            name="lifeExpectancy"
            value={formData.lifeExpectancy}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="92"
            min="70"
            max="100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            สิทธิรักษาพยาบาลจากรัฐ
          </label>
          <select
            name="govBenefit"
            value={formData.govBenefit}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="none">ไม่มี (ประมาณการเต็มจำนวน)</option>
            <option value="social">ประกันสังคม (ประมาณการลดลง 30%)</option>
            <option value="government">ข้าราชการ (ประมาณการลดลง 40%)</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
      >
        ถัดไป: ข้อมูลทางการเงิน
        <ChevronRight size={20} />
      </button>
    </div>
  );

  // Step 2: Financial Information
  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-green-900 mb-2">ขั้นตอนที่ 2: ข้อมูลทางการเงิน</h3>
            <p className="text-sm text-green-700">
              วิเคราะห์รายได้ หนี้สิน และสินทรัพย์เพื่อประเมินช่องว่างความคุ้มครอง
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            รายได้ต่อปี (บาท) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors text-lg font-semibold"
            placeholder="600000"
            min="0"
            step="10000"
          />
          <p className="text-xs text-slate-500 mt-1">
            รายได้เฉลี่ย/เดือน: {formatCurrency(formData.annualIncome / 12)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อัตราการเติบโตของรายได้ (%/ปี)
          </label>
          <input
            type="number"
            name="incomeGrowth"
            value={formData.incomeGrowth}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="5"
            min="0"
            max="20"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อัตราเงินเฟ้อทั่วไป (%/ปี)
          </label>
          <input
            type="number"
            name="inflation"
            value={formData.inflation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="3.2"
            min="0"
            max="10"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            หนี้บ้าน/คอนโด (บาท)
          </label>
          <input
            type="number"
            name="mortgageDebt"
            value={formData.mortgageDebt}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="0"
            min="0"
            step="100000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            หนี้รถ/อื่นๆ (บาท)
          </label>
          <input
            type="number"
            name="otherDebt"
            value={formData.otherDebt}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="0"
            min="0"
            step="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            สินทรัพย์สภาพคล่อง (บาท)
          </label>
          <input
            type="number"
            name="liquidAssets"
            value={formData.liquidAssets}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="0"
            min="0"
            step="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ผลตอบแทนการลงทุน (%/ปี)
          </label>
          <input
            type="number"
            name="investmentReturn"
            value={formData.investmentReturn}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="6"
            min="0"
            max="20"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            มรดกคาดหวัง (บาท)
          </label>
          <input
            type="number"
            name="expectedInheritance"
            value={formData.expectedInheritance}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:outline-none transition-colors"
            placeholder="0"
            min="0"
            step="100000"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={20} />
          ย้อนกลับ
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          ถัดไป: ครอบครัวและสุขภาพ
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  // Step 3: Family & Health
  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-purple-900 mb-2">ขั้นตอนที่ 3: ครอบครัวและสุขภาพ</h3>
            <p className="text-sm text-purple-700">
              ประเมินภาระครอบครัวและปัจจัยสุขภาพที่มีผลต่อความเสี่ยง
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ค่าเลี้ยงบุตร/คน/ปี (บาท)
          </label>
          <input
            type="number"
            name="childRaisingCostPerYear"
            value={formData.childRaisingCostPerYear}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="200000"
            min="0"
            step="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ค่าใช้จ่ายหลังเกษียณ/เดือน (บาท)
          </label>
          <input
            type="number"
            name="retirementExpenseMonthly"
            value={formData.retirementExpenseMonthly}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="30000"
            min="0"
            step="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            กองทุนฉุกเฉิน (เดือน)
          </label>
          <input
            type="number"
            name="emergencyFundMonths"
            value={formData.emergencyFundMonths}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="6"
            min="3"
            max="12"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            BMI (ดัชนีมวลกาย)
          </label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="23"
            min="15"
            max="50"
            step="0.1"
          />
          <p className="text-xs text-slate-500 mt-1">
            {formData.bmi > 30 ? '⚠️ BMI สูง อาจมีผลต่อเบี้ยประกัน' : '✓ BMI อยู่ในเกณฑ์ปกติ'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">สูบบุหรี่</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="N">ไม่สูบ</option>
            <option value="Y">สูบ</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">ความเสี่ยงอาชีพ</label>
          <select
            name="occupationRisk"
            value={formData.occupationRisk}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="office">สำนักงาน</option>
            <option value="moderate">กึ่งภาคสนาม</option>
            <option value="heavy">สูง/ก่อสร้าง</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">โรคประจำตัว</label>
          <select
            name="chronicDisease"
            value={formData.chronicDisease}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="N">ไม่มี</option>
            <option value="Y">มี (เบาหวาน/ความดัน)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อัตราเงินเฟ้อทางการแพทย์ (%/ปี)
          </label>
          <input
            type="number"
            name="medicalInflation"
            value={formData.medicalInflation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="8"
            min="0"
            max="15"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อัตราภาษีเงินได้ (%)
          </label>
          <select
            name="taxBracket"
            value={formData.taxBracket}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
            <option value="20">20%</option>
            <option value="25">25%</option>
            <option value="30">30%</option>
            <option value="35">35%</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            โปรแกรมสุขภาพ
          </label>
          <select
            name="vitalityScore"
            value={formData.vitalityScore}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="none">ไม่มี</option>
            <option value="silver">Silver (ประมาณการส่วนลด 8%)</option>
            <option value="gold">Gold (ประมาณการส่วนลด 15%)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={20} />
          ย้อนกลับ
        </button>
        <button
          onClick={handleCalculate}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          วิเคราะห์ความต้องการ
        </button>
      </div>
    </div>
  );

  // Step 4: Results
  const renderStep4 = () => {
    if (!results) return null;

    const annualIncome = formData.annualIncome;
    const premiumPercentage = ((results.premiums.total * 12) / annualIncome * 100).toFixed(1);

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-2">การวิเคราะห์เสร็จสมบูรณ์!</h2>
          <p className="text-indigo-100">
            ผลการวิเคราะห์เชิงสถานการณ์ตามข้อมูลที่คุณให้มา
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
            <div className="text-sm opacity-90 mb-2">ความคุ้มครองรวมตามการประเมิน</div>
            <div className="text-3xl font-black">{formatCurrency(results.totalCoverage)}</div>
            <div className="text-xs opacity-75 mt-1">บาท</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
            <div className="text-sm opacity-90 mb-2">เบี้ยประมาณการ/เดือน</div>
            <div className="text-3xl font-black">{formatCurrency(results.premiums.total)}</div>
            <div className="text-xs opacity-75 mt-1">{premiumPercentage}% ของรายได้</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
            <div className="text-sm opacity-90 mb-2">PPR (อุตสาหกรรมอ้างอิง)</div>
            <div className="text-3xl font-black">{Math.round(results.ppr)}</div>
            <div className="text-xs opacity-75 mt-1">
              {results.ppr >= 250 ? '✓ ตามกรอบอ้างอิง' : 'ℹ️ ต่ำกว่ากรอบอ้างอิง'}
            </div>
          </div>
        </div>

        {/* Tax Estimation */}
        {results.taxSavings > 0 && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-900">ประมาณการประหยัดภาษี:</strong>
                <span className="text-amber-800 ml-2">
                  {formatCurrency(results.taxSavings)} บาท/ปี 
                  (เบี้ยสุทธิประมาณ {formatCurrency(results.netPremium)} บาท/เดือน)
                </span>
                <p className="text-xs text-amber-700 mt-2">
                  * อิงจากสมมติฐานการลดหย่อนภาษีสูงสุด 100,000 บาท/ปี
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Coverage Breakdown */}
        <div className="bg-slate-50 rounded-2xl p-6">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            รายละเอียดความคุ้มครอง (สถานการณ์ B - อ้างอิง)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border-2 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">ประกันชีวิต (HLV)</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(results.coverage.life)}</div>
              <div className="text-xs text-slate-500 mt-2">
                เบี้ยประมาณ ~{formatCurrency(results.premiums.life)}/เดือน
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">สุขภาพ</div>
              <div className="text-2xl font-bold text-slate-900">
                {results.coverage.health > 0 ? formatCurrency(results.coverage.health) : 'ใช้สิทธิรัฐ'}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {results.coverage.health > 0 ? `เบี้ยประมาณ ~${formatCurrency(results.premiums.health)}/เดือน` : '-'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">โรคร้ายแรง (CI)</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(results.coverage.ci)}</div>
              <div className="text-xs text-slate-500 mt-2">
                เบี้ยประมาณ ~{formatCurrency(results.premiums.ci)}/เดือน
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">ชดเชยรายได้ (180 วัน)</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(results.coverage.incomeProtection)}</div>
              <div className="text-xs text-slate-500 mt-2">
                เบี้ยประมาณ ~{formatCurrency(results.premiums.incomeProtection)}/เดือน
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border-2 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">อุบัติเหตุ (PA)</div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(results.coverage.accident)}</div>
              <div className="text-xs text-slate-500 mt-2">
                เบี้ยประมาณ ~{formatCurrency(results.premiums.accident)}/เดือน
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Plans */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">เปรียบเทียบ 3 สถานการณ์</h3>
          <p className="text-sm text-slate-600">
            สถานการณ์จำลองแตกต่างกันตามระดับความคุ้มครองและเบี้ยประกัน
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {results.plans.map((plan, idx) => {
              const scenarioInfo = SCENARIO_LABELS[plan.level];
              const colorMap = {
                basic: 'border-blue-300 bg-blue-50',
                standard: 'border-green-400 bg-green-50',
                comprehensive: 'border-purple-400 bg-purple-50'
              };

              return (
                <div key={idx} className={`border-4 rounded-2xl p-6 ${colorMap[plan.level]}`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{scenarioInfo.emoji}</div>
                    <h4 className="text-lg font-black text-slate-900">{plan.name}</h4>
                    <p className="text-xs text-slate-600 mt-1">{scenarioInfo.description}</p>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-black text-slate-900">{formatCurrency(plan.premium)}</div>
                    <div className="text-xs text-slate-600">บาท/เดือน (ประมาณการ)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-600">ชีวิต</div>
                      <div className="text-sm font-bold">{(plan.coverage.life / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-600">สุขภาพ</div>
                      <div className="text-sm font-bold">
                        {plan.coverage.health > 0 ? `${(plan.coverage.health / 1000000).toFixed(1)}M` : 'รัฐ'}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-600">CI</div>
                      <div className="text-sm font-bold">
                        {plan.coverage.ci > 0 ? `${(plan.coverage.ci / 1000000).toFixed(1)}M` : '-'}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-xs text-slate-600">PA</div>
                      <div className="text-sm font-bold">{(plan.coverage.accident / 1000000).toFixed(1)}M</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 bg-white rounded-lg p-3">
                    <strong>ลำดับความสำคัญ:</strong>
                    <div className="mt-1">{plan.priority.join(' → ')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-sm text-indigo-900">
              <strong className="block mb-2">วิธีการวิเคราะห์:</strong>
              <ul className="space-y-1 text-xs text-indigo-800">
                {ANALYSIS_METHODS.map((method, idx) => (
                  <li key={idx}>• {method}</li>
                ))}
              </ul>
              <strong className="block mt-3 mb-2">สมมติฐานที่ใช้:</strong>
              <ul className="space-y-1 text-xs text-indigo-800">
                {results.metadata.assumptions.map((assumption, idx) => (
                  <li key={idx}>• {assumption}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Examples - ตัวอย่างผลิตภัณฑ์ที่ซื้อได้จริง */}
        <ProductExamples 
          coverage={results.coverage} 
          premiums={results.premiums}
        />

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-700 shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-900 whitespace-pre-line">
              {DISCLAIMER_TEXT}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleReset}
            className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-300 transition-all"
          >
            วิเคราะห์ใหม่
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            พิมพ์ผลการวิเคราะห์
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <SEOHead
        title="วิเคราะห์ความต้องการประกันภัย | Insurance Needs Analysis"
        description="เครื่องมือวิเคราะห์เชิงสถานการณ์เพื่อประเมินความเพียงพอของความคุ้มครองประกันภัย"
        path="/needs-analysis"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-bold text-sm">
            <Shield className="w-4 h-4" />
            Scenario-Based Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            วิเคราะห์ความต้องการ<span className="text-indigo-600">ประกันภัย</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            เครื่องมือวิเคราะห์เชิงสถานการณ์เพื่อประเมินความเพียงพอของความคุ้มครอง
          </p>
        </div>

        {/* Privacy Note */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 whitespace-pre-line">
              {PRIVACY_NOTE}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={step} />

        {/* Form Content */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-xl">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Methodology Info (only show before results) */}
        {step < 4 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">เกี่ยวกับการวิเคราะห์นี้</h3>
            <p className="text-sm text-blue-800 whitespace-pre-line mb-4">
              {METHODOLOGY_DESCRIPTION}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-bold text-blue-900">ขอบเขตการวิเคราะห์:</p>
              <ul className="text-xs text-blue-800 space-y-1">
                {CALCULATION_SCOPE.map((scope, idx) => (
                  <li key={idx}>• {scope}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
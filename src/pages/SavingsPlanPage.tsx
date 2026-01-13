import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { ComparisonChart } from '../components/insurance/ComparisonChart';
import { InlineConsultCTA } from '../components/cta/InlineConsultCTA';
import { FAQSection } from '../components/insurance/FAQSection'; 
// import { TestimonialsSection } from '../components/insurance/TestimonialsSection';
import { RelatedArticles } from '../components/insurance/RelatedArticles';
import { useSavingsCalculation } from '../hooks/useInsuranceCalculations';
import { useTaxOptimizer } from '../hooks/useTaxOptimizer';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES } from '../constants/routes';
import { TAX_MINDSETS, SAVINGS_PLAN_FAQS, ARTICLES } from '../constants';
import { getRelatedArticles } from '../utils';
import type { TaxExpense, DeductionLevel } from '../types/insurance';
import { Wallet, TrendingUp, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function SavingsPlanPage() {
  // State
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [investYield, setInvestYield] = useState(2.0);
  const [taxMindset, setTaxMindset] = useState('balance');
  const [taxExp, setTaxExp] = useState<TaxExpense>("none");
  const [hasDeduction, setHasDeduction] = useState<DeductionLevel>('some');

  // Get tax rate from selected mindset
  const currentTaxRate = TAX_MINDSETS.find((m) => m.id === taxMindset)?.rate || 0;

  // Calculations
  const savingCalcs = useSavingsCalculation({
    age,
    sumAssured,
    investYield,
    taxRate: currentTaxRate
  });

  const suitability = useTaxOptimizer({ taxExp, hasDeduction });

  // Get related articles based on tags
  const relatedArticles = getRelatedArticles(ARTICLES, 'savings', 3);

  return (
    <MainLayout>
      <SEOHead {...SEO_CONFIG.PAGES.savings} path={ROUTES.SAVINGS} />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            ประกัน<span className="text-red-600">ออมทรัพย์</span>
          </h1>
          <p className="text-lg text-slate-600">
            จำลองผลตอบแทนและเปรียบเทียบกับการลงทุนเอง
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Tax Questions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center gap-2">
                <Wallet className="text-amber-500" size={20} />
                <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                  ข้อมูลภาษีเบื้องต้น
                </h3>
              </div>

              {/* Question 1: Tax Payment History */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  1. เคยจ่ายภาษีเยอะมาก่อนไหม?
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'none', label: 'ไม่เคย' },
                    { value: 'some', label: 'พอสมควร' },
                    { value: 'high', label: 'เยอะมาก' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTaxExp(option.value as TaxExpense)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        taxExp === option.value
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Other Deductions */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  2. มีข้อลดหย่อนอื่นๆ ในประจำปีไหม?
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'none', label: 'แทบไม่มี' },
                    { value: 'some', label: 'มีบ้าง' },
                    { value: 'many', label: 'เยอะมาก' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setHasDeduction(option.value as DeductionLevel)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        hasDeduction === option.value
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suitability Result */}
              <div className={`p-4 rounded-2xl ${
                suitability.status === 'RECOMMENDED' ? 'bg-blue-50 border border-blue-200' :
                suitability.status === 'RESTRICTED' ? 'bg-amber-50 border border-amber-200' :
                'bg-slate-50 border border-slate-200'
              }`}>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  ผลคำนวณเบื้องต้น
                </p>
                <p className={`text-sm ${
                  suitability.status === 'RECOMMENDED' ? 'text-blue-800' :
                  suitability.status === 'RESTRICTED' ? 'text-amber-800' :
                  'text-slate-700'
                }`}>
                  {suitability.msg}
                </p>
              </div>
            </div>

            {/* Profile Settings */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                ปรับแต่งแผนของคุณ
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-2 block">
                    อายุของคุณ: <span className="text-red-600">{age} ปี</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="70"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 mb-2 block">ทุนประกัน (มรดก)</label>
                  <select
                    value={sumAssured}
                    onChange={(e) => setSumAssured(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold bg-white"
                  >
                    <option value={300000}>300,000 ฿</option>
                    <option value={1000000}>1,000,000 ฿</option>
                    <option value={2000000}>2,000,000 ฿</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 mb-2 block">
                    ผลตอบแทนพอร์ตจำลอง: <span className="text-red-600">{investYield.toFixed(1)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={investYield}
                    onChange={(e) => setInvestYield(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  />
                </div>
              </div>

              {/* Tax Strategy Selection */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  เลือกกลยุทธ์ภาษี
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TAX_MINDSETS.map((m) => {
                    const isDisabled =
                      (suitability.status === 'NOT_RECOMMENDED' && m.id !== 'none') ||
                      (suitability.status === 'RESTRICTED' && (m.id === 'focus' || m.id === 'high'));

                    return (
                      <button
                        key={m.id}
                        disabled={isDisabled}
                        onClick={() => setTaxMindset(m.id)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          isDisabled
                            ? 'opacity-30 cursor-not-allowed grayscale'
                            : taxMindset === m.id
                            ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-black">{m.label}</div>
                        <div className="text-[10px] opacity-70">{m.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pink-50 border border-pink-200 rounded-3xl p-6 text-center">
                <Wallet className="text-red-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">เบี้ยประกัน</p>
                <p className="text-3xl font-black text-red-600">{formatCurrency(savingCalcs.premium)}</p>
                <p className="text-xs text-slate-500 mt-1">
                  หักลดหย่อนภาษี {formatCurrency(savingCalcs.annualTaxSaving)} เหลือจ่ายสุทธิ {formatCurrency(savingCalcs.netOutflow)}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center">
                <TrendingUp className="text-emerald-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">เงินลงทุนสะสม (ปีที่ 25)</p>
                <p className="text-3xl font-black text-emerald-600">{formatCurrency(savingCalcs.totalReturn)}</p>
                <p className="text-xs text-slate-500 mt-1">
                  เงินการันตีที่ได้รับแน่นอน ไม่ต้องลุ้นผลตอบแทนตลาด
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-center">
                <Target className="text-blue-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">ปีที่คุ้มทุน</p>
                <p className="text-3xl font-black text-blue-600">ปีที่ {savingCalcs.breakEvenYear || '-'}</p>
                <p className="text-xs text-slate-500 mt-1">
                  รวมผลประโยชน์ด้านภาษีแล้ว - เรื่องที่คนเข้าใจผิดบ่อยสุด
                </p>
              </div>
            </div>

            {/* Comparison Chart */}
            <ComparisonChart data={savingCalcs.data} breakEvenYear={savingCalcs.breakEvenYear} />

            {/* AIA Reference */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-600">
                <span className="font-bold">ข้อมูลอ้างอิง:</span> การคำนวณและผลประโยชน์จำลองจากหลักการของแผนประกัน{' '}
                <span className="font-bold text-red-600">AIA Endowment 25/25 (Non-Par)</span>
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
                <h4 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  ข้อดีที่ควรรู้
                </h4>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>• บังคับออมเงินอย่างมีวินัย</li>
                  <li>• ได้เงินคืนแน่นอนตามสัญญา</li>
                  <li>• ลดหย่อนภาษีสูงสุด 100,000 ฿/ปี</li>
                  <li>• มีความคุ้มครองในระหว่างจ่าย</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                <h4 className="font-black text-amber-900 mb-3 flex items-center gap-2">
                  <AlertCircle size={20} />
                  ข้อควรระวัง
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• ผูกมัดระยะยาว 15-25 ปี</li>
                  <li>• ถอนก่อนครบสัญญาจะขาดทุน</li>
                  <li>• ผลตอบแทนต่ำกว่าลงทุนเอง</li>
                  <li>• เบี้ยสูงกว่าประกันชีวิตแบบธรรมดา</li>
                </ul>
              </div>
            </div>

            {/* Inline Consult CTA */}
            <InlineConsultCTA />
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection faqs={SAVINGS_PLAN_FAQS} />

        {/* Testimonials Section */}
        {/* <TestimonialsSection testimonials={SAVINGS_PLAN_TESTIMONIALS} /> */}

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </div>
    </MainLayout>
  );
}
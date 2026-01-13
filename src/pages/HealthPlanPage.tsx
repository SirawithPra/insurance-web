import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { InlineConsultCTA } from '../components/cta/InlineConsultCTA';
import { FAQSection } from '../components/insurance/FAQSection';
// import { TestimonialsSection } from '../components/insurance/TestimonialsSection';
import { RelatedArticles } from '../components/insurance/RelatedArticles';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES } from '../constants/routes';
import { HEALTH_PLANS, HEALTH_PLAN_FAQS, ARTICLES } from '../constants';
import { getRelatedArticles } from '../utils';
import { Shield, Bed, Stethoscope, AlertCircle, CheckCircle2, Check } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function HealthPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState('5M');
  const [ageSlider, setAgeSlider] = useState(35);
  
  const currentPlan = HEALTH_PLANS.find(p => p.id === selectedPlan) || HEALTH_PLANS[1];

  // Mock premium calculation based on age
  const calculatePremium = (age: number, planId: string) => {
    const basePremiums: Record<string, number> = {
      '1M': 15000,
      '5M': 35000,
      '15M': 49500,
      '25M': 75000
    };
    const ageFactor = 1 + ((age - 35) * 0.03);
    return Math.round(basePremiums[planId] * ageFactor);
  };

  const premium = calculatePremium(ageSlider, selectedPlan);
  const discountPercent = 35;

  // Get related articles based on tags
  const relatedArticles = getRelatedArticles(ARTICLES, 'health', 3);

  return (
    <MainLayout>
      <SEOHead {...SEO_CONFIG.PAGES.health} path={ROUTES.HEALTH} />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            ประกัน<span className="text-red-600">สุขภาพ</span>
          </h1>
          <p className="text-lg text-slate-600">
            เปรียบเทียบแผนประกันสุขภาพที่เหมาะกับคุณ
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Plan Selection */}
          <div className="lg:col-span-1 space-y-4">
            {HEALTH_PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left p-6 rounded-3xl transition-all border-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-xl font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm font-bold ${isSelected ? 'text-red-400' : 'text-red-600'}`}>
                        {plan.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="text-red-500 shrink-0" size={24} />
                    )}
                  </div>
                  <p className={`text-xs mt-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right - Plan Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Display */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">แผน {currentPlan.id.replace('M', ' ล้าน')}</h3>
                <div className="text-right">
                  <p className="text-xs text-red-600 font-bold">เบี้ยต่อปีส่วนเกิน (ลดสูง {discountPercent} ปี)</p>
                  <p className="text-3xl font-black text-red-600">{formatCurrency(premium * (1 - discountPercent / 100))}</p>
                </div>
              </div>
            </div>

            {/* AIA Reference */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-600">
                <span className="font-bold">ข้อมูลอ้างอิง:</span> แผนจำลองจากหลักการของ{' '}
                <span className="font-bold text-red-600">AIA Health Happy</span> และ{' '}
                <span className="font-bold text-red-600">AIA Infinite Care</span>
              </p>
            </div>

            {/* Coverage Details */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6 text-center">
                <Shield className="text-red-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">ทุนประกันชีวิต</p>
                <p className="text-2xl font-black text-slate-900">{currentPlan.id.replace('M', 'M')}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <Bed className="text-blue-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">ค่าห้อง/วัน</p>
                <p className="text-2xl font-black text-slate-900">{formatCurrency(currentPlan.room)}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <Stethoscope className="text-emerald-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">ผู้ป่วยนอก (OPD)</p>
                <p className="text-2xl font-black text-slate-900">{currentPlan.opd}</p>
              </div>
            </div>

            {/* Special Feature for 5M Plan */}
            {currentPlan.id === '5M' && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-2xl">
                <p className="text-sm text-blue-900">
                  <span className="font-black">💡 คุณสมบัติของแผนนี้:</span>{' '}
                  คุ้มค่าที่สุด! เบิ้ลวงเงินเป็น 10 ล้านทันทีหากตรวจพบ 6 โรคร้ายแรง
                </p>
              </div>
            )}

            {/* Age Slider */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h4 className="font-black text-slate-900 mb-4">คำนวณเบี้ยตามอายุ (เบี้ยต่อปี)</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">อายุ</span>
                  <span className="text-2xl font-black text-red-600">{ageSlider} ปี</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  value={ageSlider}
                  onChange={(e) => setAgeSlider(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>20 ปี</span>
                  <span>65 ปี</span>
                </div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
                <h4 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  ข้อดีที่ควรรู้
                </h4>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>• ลดภาระค่ารักษาที่แพงมาก</li>
                  <li>• เข้า รพ.เอกชนได้สบาย</li>
                  <li>• คุ้มครองโรคร้ายแรง</li>
                  <li>• บางแผนมี OPD</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                <h4 className="font-black text-amber-900 mb-3 flex items-center gap-2">
                  <AlertCircle size={20} />
                  ข้อควรระวัง
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• เบี้ยแพงขึ้นทุกปี</li>
                  <li>• มีเงื่อนไขการรับประกัน</li>
                  <li>• โรคเดิมอาจไม่คุ้มครอง</li>
                  <li>• ไม่คืนเงิน</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection faqs={HEALTH_PLAN_FAQS} />

        {/* Testimonials Section */}
        {/* <TestimonialsSection testimonials={HEALTH_PLAN_TESTIMONIALS} /> */}

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* Inline Consult CTA */}
        <InlineConsultCTA 
          variant="urgent"
          message="สับสนในการเลือกแผน? ให้ผมช่วยวิเคราะห์แผนที่เหมาะกับคุณ"
        />
      </div>
    </MainLayout>
  );
}
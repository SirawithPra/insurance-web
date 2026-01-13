import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { FAQSection } from '../components/insurance/FAQSection';
// import { TestimonialsSection } from '../components/insurance/TestimonialsSection';
import { RelatedArticles } from '../components/insurance/RelatedArticles';
import { InlineConsultCTA } from '../components/cta/InlineConsultCTA';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES } from '../constants/routes';
import { PA_PLANS, ACCIDENT_PLAN_FAQS, ARTICLES } from '../constants';
import { getRelatedArticles } from '../utils';
import { Zap, Shield, Stethoscope, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function AccidentPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  
  const currentPlan = PA_PLANS.find(p => p.id === selectedPlan) || PA_PLANS[0];

  // Get related articles based on tags
  const relatedArticles = getRelatedArticles(ARTICLES, 'accident', 3);

  return (
    <MainLayout>
      <SEOHead {...SEO_CONFIG.PAGES.accident} path={ROUTES.ACCIDENT} />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            ประกัน<span className="text-red-600">อุบัติเหตุ</span>
          </h1>
          <p className="text-lg text-slate-600">
            คุ้มครองครอบคลุม เบี้ยถูก เหมาะกับทุกคน
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Plan Selection */}
          <div className="lg:col-span-1 space-y-4">
            {PA_PLANS.map((plan) => {
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
                        {plan.title}
                      </h3>
                      <p className={`text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-amber-600'}`}>
                        {plan.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="text-amber-500 shrink-0" size={24} />
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
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">{currentPlan.title}</h3>
                <div className="text-right">
                  <p className="text-xs text-amber-600 font-bold">เบี้ยต่อปี</p>
                  <p className="text-3xl font-black text-amber-600">{formatCurrency(currentPlan.premium)}</p>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <Shield className="text-red-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">เสียชีวิต/สูญเสียอวัยวะ</p>
                <p className="text-2xl font-black text-slate-900">{formatCurrency(currentPlan.death)}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <Stethoscope className="text-blue-600 mx-auto mb-2" size={32} />
                <p className="text-xs font-bold text-slate-600 mb-1">ค่ารักษาพยาบาล</p>
                <p className="text-2xl font-black text-slate-900">{formatCurrency(currentPlan.medical)}</p>
              </div>
            </div>

            {/* Coverage Info */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
              <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="text-amber-600" size={20} />
                ความคุ้มครอง
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>เสียชีวิตจากอุบัติเหตุ</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>สูญเสียอวัยวะ</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>ทุพพลภาพถาวร</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>ค่ารักษาพยาบาลจากอุบัติเหตุ</span>
                </li>
              </ul>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
                <h4 className="font-black text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={20} />
                  ข้อดี
                </h4>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>• เบี้ยถูกมาก</li>
                  <li>• คุ้มครองสูง</li>
                  <li>• ซื้อง่าย ไม่ตรวจสุขภาพ</li>
                  <li>• จ่ายรายปี ยืดหยุ่น</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
                <h4 className="font-black text-amber-900 mb-3 flex items-center gap-2">
                  <AlertCircle size={20} />
                  ข้อควรระวัง
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• คุ้มครองเฉพาะอุบัติเหตุ</li>
                  <li>• ไม่คุ้มครองโรค</li>
                  <li>• มีเงื่อนไขการจ่ายเงิน</li>
                  <li>• ต้องต่ออายุทุกปี</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection faqs={ACCIDENT_PLAN_FAQS} />

        {/* Testimonials Section */}
        {/* <TestimonialsSection testimonials={ACCIDENT_PLAN_TESTIMONIALS} /> */}

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* Inline Consult CTA */}
        <InlineConsultCTA />
      </div>
    </MainLayout>
  );
}
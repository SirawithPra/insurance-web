import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { InlineConsultCTA } from '../components/cta/InlineConsultCTA';
import { FAQSection } from '../components/insurance/FAQSection';
import { TestimonialsSection } from '../components/insurance/TestimonialsSection';
import { RelatedArticles } from '../components/insurance/RelatedArticles';
import { useLifeProtectionCalculation } from '../hooks/useInsuranceCalculations';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES } from '../constants/routes';
import { LIFE_PROTECTION_FAQS, LIFE_PROTECTION_TESTIMONIALS, ARTICLES } from '../constants';
import { getRelatedArticles } from '../utils';
import { Pyramid, TrendingDown, Shield, CheckCircle2, AlertCircle, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function LifeProtectionPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(30000);
  const suggestedProtection = useLifeProtectionCalculation(monthlyIncome);

  // Get related articles based on tags
  const relatedArticles = getRelatedArticles(ARTICLES, 'life', 3);

  return (
    <MainLayout>
      <SEOHead {...SEO_CONFIG.PAGES.life} path={ROUTES.LIFE} />

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            ทุนประกันชีวิตที่<span className="text-red-600">เหมาะสม</span>
          </h1>
          <p className="text-lg text-slate-600">
            คำนวณค่าขยุง x10 - มาตรฐานสากลที่ใช้วัดความเพียงพอของการคุ้มครอง
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Calculator */}
          <div className="space-y-6">
            {/* Calculator Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
              <div className="flex items-center gap-2 text-red-600">
                <Shield size={24} />
                <h2 className="text-xl font-black">คำนวณทุนประกัน</h2>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">
                  รายได้สุทธิของครัวเรือนต่อเดือน
                </label>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-red-600 mb-2">
                    {formatCurrency(monthlyIncome)}
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="1000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white space-y-4">
              <p className="text-sm font-bold uppercase tracking-wide opacity-90">
                ทุนประกันที่แนะนำ (X10 RULE)
              </p>
              <div className="text-5xl md:text-6xl font-black">
                {formatCurrency(suggestedProtection.recommendedCoverage)}
              </div>
              <p className="text-sm opacity-90">
                *หลักใหญ่ที่สุดคือทำให้ครอบครัวมีเงินใช้ทดแทนรายได้ได้ตลอด เป็นเวลา 10 ปี แต่คุณอาจปรับได้ตามความเหมาะสม*
              </p>
            </div>
          </div>

          {/* Right Side - Financial Pyramid */}
          <div className="space-y-6">
            {/* Pyramid Card */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 space-y-6">
              <div className="flex items-center gap-2">
                <Pyramid className="text-red-600" size={28} />
                <h2 className="text-xl font-black text-slate-900">Financial Pyramid</h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                หลักการวางแผนทางการเงินที่ดีต้องมีฐานรากมั่นคงก่อน เหมือนสร้างบ้านที่ต้องเริ่มจากฐานไปหาจุดสูงสุด
              </p>

              {/* Pyramid Visual - สวยขึ้น */}
              <div className="relative pt-8 pb-4">
                {/* Level 3 - Investment (ยอดพีระมิด) */}
                <div className="mx-auto w-3/4 mb-4 relative">
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <TrendingDown size={28} strokeWidth={2.5} />
                      <span className="font-black text-lg">ลงทุน</span>
                      <p className="text-xs text-emerald-50 text-center">
                        หุ้น • กองทุนรวม • ทองคำ
                      </p>
                    </div>
                  </div>
                  {/* Triangle decoration */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-emerald-500"></div>
                </div>

                {/* Level 2 - Savings (กลางพีระมิด) */}
                <div className="mx-auto w-5/6 mb-4 relative">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-7 shadow-lg transform hover:scale-105 transition-transform">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Wallet size={32} strokeWidth={2.5} />
                      <span className="font-black text-xl">ออมทรัพย์/เกษียณ</span>
                      <p className="text-xs text-blue-50 text-center">
                        ประกันออมทรัพย์ • กองทุนสำรองเลี้ยงชีพ • RMF
                      </p>
                    </div>
                  </div>
                  {/* Triangle decoration */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-12 border-r-12 border-t-12 border-transparent border-t-blue-500"></div>
                </div>

                {/* Level 1 - Protection (ฐานพีระมิด) */}
                <div className="mx-auto w-full relative">
                  <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform">
                    <div className="flex flex-col items-center gap-3 text-white">
                      <Shield size={40} strokeWidth={2.5} />
                      <span className="font-black text-2xl">ความคุ้มครอง</span>
                      <p className="text-sm text-red-50 text-center font-semibold">
                        ประกันชีวิต • ประกันสุขภาพ • ประกันอุบัติเหตุ
                      </p>
                      <div className="mt-2 px-4 py-2 bg-white/20 rounded-full">
                        <p className="text-xs font-bold">🏛️ ฐานรากของความมั่นคง</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-xs text-red-900 text-center">
                  <span className="font-black">⚠️ สำคัญ:</span> หากไม่มีฐานราก (ความคุ้มครอง) ที่มั่นคง 
                  แม้จะออมและลงทุนเก่ง ก็อาจล้มละลายได้ถ้าเจอวิกฤตสุขภาพ
                </p>
              </div>
            </div>

            {/* Tip Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 rounded-2xl">
              <p className="text-sm text-amber-900 leading-relaxed">
                <span className="font-black">💡 เคล็ดลับ:</span> ประกันชีวิตแบบ Term Life 
                ให้ความคุ้มครองสูงสุดในราคาประหยัด เหมาะสำหรับหัวหน้าครอบครัวที่ต้องการทุนสูง
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection faqs={LIFE_PROTECTION_FAQS} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={LIFE_PROTECTION_TESTIMONIALS} />

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />

      {/* Inline Consult CTA */}
      <InlineConsultCTA />
    </MainLayout>
  );
}
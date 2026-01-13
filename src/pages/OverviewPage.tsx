
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { InsuranceCard } from '../components/insurance/InsuranceCard';
import { SEOHead } from '../components/layout/SEOHead';
import { INSURANCE_TYPES } from '../constants/insurance';
import { ROUTES } from '../constants/routes';
import { SEO_CONFIG } from '../constants/seo';
import { Pyramid, Wallet, HeartPulse, Zap } from 'lucide-react';

const ICON_MAP = {
  life: Pyramid,
  savings: Wallet,
  health: HeartPulse,
  accident: Zap
};

export function OverviewPage() {
  const navigate = useNavigate();

  const handleInsuranceClick = (id: string) => {
    const routeMap: Record<string, string> = {
      life: ROUTES.LIFE,
      savings: ROUTES.SAVINGS,
      health: ROUTES.HEALTH,
      accident: ROUTES.ACCIDENT
    };
    navigate(routeMap[id] || ROUTES.OVERVIEW);
  };

  return (
    <MainLayout>
      <SEOHead
        {...SEO_CONFIG.PAGES.overview}
        path={ROUTES.OVERVIEW}
      />

      <div className="space-y-16 md:space-y-24 animate-in fade-in slide-in-from-bottom-4">
        {/* Hero Section */}
        <div className="relative text-center max-w-5xl mx-auto pt-8 md:pt-12">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-red-100/60 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
              เข้าใจ<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">ประกัน</span>ด้วยตัวเอง
              <br className="hidden md:block" />
              <span className="md:text-5xl lg:text-6xl text-slate-700">ก่อนคุยกับตัวแทน</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
              จำลองผลลัพธ์ เปรียบเทียบแผน และเข้าใจข้อดีข้อเสียของประกันแต่ละประเภท
              ด้วยข้อมูลที่โปร่งใสและเข้าใจง่าย
            </p>
          </div>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INSURANCE_TYPES.map((type) => {
            const Icon = ICON_MAP[type.id as keyof typeof ICON_MAP];
            return (
              <InsuranceCard
                key={type.id}
                icon={Icon}
                title={type.title}
                description={type.description}
                pros={type.pros}
                cons={type.cons}
                onClick={() => handleInsuranceClick(type.id)}
              />
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-12 md:p-16 text-white text-center space-y-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-black animate-bounce">
              🎁 ปรึกษาฟรี + รับคู่มือวางแผนการเงิน
            </div>

            <h2 className="text-3xl md:text-4xl font-black">
              พร้อมวางแผนการเงินแล้วหรือยัง?
            </h2>
            <p className="text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
              เข้าใจกราฟแล้ว แต่ยังสับสน? <span className="font-black">ให้ผมช่วยอธิบายแบบละเอียดใน 10 นาที</span><br/>
              ไม่ขาย ไม่ผูกมัด - คุยจากข้อมูลที่คุณเห็น
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => navigate(ROUTES.SAVINGS)}
                className="bg-white hover:bg-slate-50 text-red-600 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                เริ่มจำลองแผน →
              </button>
              <button
                onClick={() => navigate(ROUTES.CONTACT)}
                className="bg-red-800 hover:bg-red-900 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl border-2 border-red-500 flex items-center justify-center gap-2"
              >
                💬 ปรึกษาฟรี + รับของขวัญ
              </button>
            </div>

            <p className="text-xs text-red-200 italic pt-2">
              "คนไทยกว่า 5,000+ คน ไว้วางใจให้เราช่วยวิเคราะห์แผนประกัน"
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
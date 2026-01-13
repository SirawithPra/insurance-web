
import { MainLayout } from '../components/layout/MainLayout';
import { Phone, MessageCircle, Users, Award, ShieldCheck } from 'lucide-react';
import { SEOHead } from '../components/layout/SEOHead';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES } from '../constants/routes';

export function ContactPage() {
  return (
    <MainLayout showMobileCTA={false}>
      <SEOHead {...SEO_CONFIG.PAGES.contact} path={ROUTES.CONTACT} />

      <div className="max-w-4xl mx-auto animate-in fade-in space-y-8">
        {/* Main Contact Card */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-black animate-pulse">
                🎁 ปรึกษาฟรี + รับคู่มือวางแผนการเงิน
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                พูดคุยกับที่ปรึกษา<br/>
                <span className="text-yellow-300">ทันที!</span>
              </h1>
              
              <p className="text-red-100 text-lg leading-relaxed max-w-xl mx-auto">
                "ผมพร้อมช่วยอธิบายกราฟและตัวเลขเหล่านี้ให้คุณเข้าใจง่ายที่สุด<br/>
                <span className="font-black text-white">ใน 10 นาทีครับ</span>"
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <a
                href="https://line.me/ti/p/~smartwealth"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white hover:bg-emerald-50 text-emerald-600 px-8 py-6 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                <MessageCircle className="group-hover:scale-110 transition-transform" size={28} />
                ทัก LINE ฟรี
              </a>
              
              <a
                href="tel:08xxxxxxxx"
                className="group bg-red-800 hover:bg-red-900 text-white px-8 py-6 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 border-2 border-red-500"
              >
                <Phone className="group-hover:scale-110 transition-transform" size={28} />
                โทรเลย
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-black mb-1">5,000+</p>
                <p className="text-xs text-red-100">ลูกค้าไว้วางใจ</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-black mb-1">10 นาที</p>
                <p className="text-xs text-red-100">อธิบายให้เข้าใจ</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-black mb-1">100%</p>
                <p className="text-xs text-red-100">ไม่ผูกมัด</p>
              </div>
            </div>

            <p className="text-center text-sm text-red-100 italic pt-2">
              "ไม่ขาย ไม่ผูกมัด - คุยจากข้อมูลที่คุณเห็น"
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-blue-100 p-8 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="text-blue-600" size={32} />
            </div>
            <h4 className="font-black text-blue-900 mb-2">ปรึกษาฟรี</h4>
            <p className="text-sm text-blue-700">ไม่มีค่าใช้จ่ายในการปรึกษา</p>
          </div>

          <div className="bg-white border border-emerald-100 p-8 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Award className="text-emerald-600" size={32} />
            </div>
            <h4 className="font-black text-emerald-900 mb-2">มืออาชีพ</h4>
            <p className="text-sm text-emerald-700">ที่ปรึกษาได้รับใบอนุญาตถูกต้อง</p>
          </div>

          <div className="bg-white border border-purple-100 p-8 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-purple-600" size={32} />
            </div>
            <h4 className="font-black text-purple-900 mb-2">โปร่งใส</h4>
            <p className="text-sm text-purple-700">ข้อมูลชัดเจน ไม่มีกลฉ้อฉล</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
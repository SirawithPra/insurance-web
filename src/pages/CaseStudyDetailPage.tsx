import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { CASE_STUDIES } from '../constants';
import { ROUTES } from '../constants/routes';
import { 
  User, 
  Briefcase, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle, 
  DollarSign,
  Shield,
  ArrowLeft,
  Tag
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function CaseStudyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const caseStudy = CASE_STUDIES.find(cs => cs.id === Number(id));

  if (!caseStudy) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบ Case Study</h1>
          <Link
            to={ROUTES.ARTICLES}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            กลับไปคลังความรู้
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEOHead
        title={`${caseStudy.title} | Case Study`}
        description={caseStudy.summary}
        path={`${ROUTES.ARTICLES}/case/${caseStudy.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          to={ROUTES.ARTICLES}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          กลับไปคลังความรู้
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
            {caseStudy.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {caseStudy.title}
          </h1>
          <p className="text-lg text-slate-600">{caseStudy.summary}</p>
        </div>

        {/* Featured Image */}
        {caseStudy.image && (
          <div className="aspect-video rounded-3xl overflow-hidden border-2 border-slate-200">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Customer Profile */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200">
          <h2 className="text-2xl font-black text-slate-900 mb-6">ข้อมูลลูกค้า</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="text-purple-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">ชื่อ-นามสกุล</p>
                <p className="font-bold text-slate-900">{caseStudy.customerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="text-blue-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">อายุ</p>
                <p className="font-bold text-slate-900">{caseStudy.customerAge} ปี</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="text-emerald-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">อาชีพ</p>
                <p className="font-bold text-slate-900">{caseStudy.occupation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem */}
        <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-red-200 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-red-700" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">ปัญหาที่พบ</h2>
              <p className="text-slate-700 leading-relaxed">{caseStudy.problem}</p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="bg-amber-50 rounded-3xl p-8 border-2 border-amber-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-amber-200 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="text-amber-700" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">แนวทางแก้ไข</h2>
              <p className="text-slate-700 leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-emerald-50 rounded-3xl p-8 border-2 border-emerald-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-emerald-200 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-emerald-700" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">ผลลัพธ์</h2>
              <p className="text-slate-700 leading-relaxed">{caseStudy.result}</p>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">
            สรุปแผนประกัน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="text-purple-600" size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">เบี้ยประกัน/ปี</p>
                <p className="text-3xl font-black text-purple-600">
                  {formatCurrency(caseStudy.premium)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="text-emerald-600" size={32} />
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">ทุนประกัน/ความคุ้มครอง</p>
                <p className="text-3xl font-black text-emerald-600">
                  {formatCurrency(caseStudy.coverage)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">หัวข้อที่เกี่ยวข้อง</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold border border-purple-200"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-black mb-3">
            ต้องการคำปรึกษาแบบเดียวกันนี้?
          </h3>
          <p className="text-purple-100 mb-6">
            ทีมงานพร้อมวิเคราะห์และแนะนำแผนประกันที่เหมาะกับสถานการณ์ของคุณ
          </p>
          <a
            href="https://line.me/ti/p/@insurancecompare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-colors font-bold text-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.771.039 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            ปรึกษาผู้เชี่ยวชาญฟรี
          </a>
        </div>

        {/* Author & Date */}
        {(caseStudy.author || caseStudy.publishedAt) && (
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500 py-8 border-t border-slate-200">
            {caseStudy.author && (
              <span>โดย {caseStudy.author}</span>
            )}
            {caseStudy.publishedAt && (
              <span>• เผยแพร่เมื่อ {new Date(caseStudy.publishedAt).toLocaleDateString('th-TH')}</span>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

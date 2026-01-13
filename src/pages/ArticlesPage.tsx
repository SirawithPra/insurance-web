import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { Pagination } from '../components/common/Pagination';
import { SEO_CONFIG } from '../constants/seo';
import { ROUTES, getArticleRoute } from '../constants/routes';
import { ARTICLES, CASE_STUDIES } from '../constants';
import { BookOpen, ArrowRight, Users, Tag, User, Briefcase, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

type TabType = 'articles' | 'case-studies';

const ITEMS_PER_PAGE = 6;

export function ArticlesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Get current items based on active tab
  const currentItems = activeTab === 'articles' ? ARTICLES : CASE_STUDIES;
  
  // Calculate pagination
  const totalPages = Math.ceil(currentItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = currentItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <SEOHead {...SEO_CONFIG.PAGES.articles} path={ROUTES.ARTICLES} />

      <div className="space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
            <BookOpen className="text-purple-600" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900">
            คลังความรู้
          </h1>
          <p className="text-lg text-slate-600">
            บทความและ Case Study ด้านการเงิน ภาษี และการวางแผน
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => handleTabChange('articles')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'articles'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span>บทความ ({ARTICLES.length})</span>
            </div>
          </button>

          <button
            onClick={() => handleTabChange('case-studies')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'case-studies'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>Case Study ({CASE_STUDIES.length})</span>
            </div>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'articles' ? (
          // Articles Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedItems.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(getArticleRoute(article.id))}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-purple-500 hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="text-purple-400" size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  {article.summary && (
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {article.summary}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3">
                    {article.author && (
                      <p className="text-xs text-slate-500">{article.author}</p>
                    )}
                    <ArrowRight className="text-purple-600 group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Case Studies Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedItems.map((caseStudy: any) => (
              <div
                key={caseStudy.id}
                onClick={() => navigate(`/articles/case/${caseStudy.id}`)}
                className="group bg-white rounded-3xl border-2 border-slate-200 overflow-hidden hover:border-purple-500 hover:shadow-2xl transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-indigo-200 relative overflow-hidden">
                  {caseStudy.image ? (
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="text-purple-400" size={64} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-purple-700">
                    {caseStudy.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-black text-slate-900 line-clamp-2">
                    {caseStudy.title}
                  </h3>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{caseStudy.customerAge} ปี</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      <span className="line-clamp-1">{caseStudy.occupation}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {caseStudy.summary}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">เบี้ยประกัน/ปี</p>
                      <p className="font-black text-purple-600">
                        {formatCurrency(caseStudy.premium)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">ความคุ้มครอง</p>
                      <p className="font-black text-emerald-600">
                        {formatCurrency(caseStudy.coverage)}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {caseStudy.tags && caseStudy.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {caseStudy.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <TrendingUp size={16} />
                    ดูรายละเอียด Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="py-8"
        />

        {/* Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 border-2 border-purple-200 text-center max-w-3xl mx-auto">
          <p className="text-slate-700 mb-4">
            ต้องการคำปรึกษาเฉพาะตัว? ทีมงานพร้อมวิเคราะห์และแนะนำแผนประกันที่เหมาะกับคุณ
          </p>
          <a
            href="https://line.me/ti/p/@insurancecompare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.771.039 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            ปรึกษาผู้เชี่ยวชาญฟรี
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
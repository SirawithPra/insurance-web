import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { SEOHead } from '../components/layout/SEOHead';
import { ROUTES } from '../constants/routes';
import { ARTICLES } from '../constants/insurance';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const article = ARTICLES.find(a => a.id === Number(id));

  if (!article) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-black text-slate-900 mb-4">ไม่พบบทความ</h1>
          <button
            onClick={() => navigate(ROUTES.ARTICLES)}
            className="text-purple-600 hover:text-purple-700 font-bold"
          >
            ← กลับไปคลังความรู้
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEOHead
        title={article.title}
        description={article.summary || article.title}
        path={`/articles/${article.id}`}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(ROUTES.ARTICLES)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          กลับไปคลังความรู้
        </button>

        {/* Article */}
        <article className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          {/* Header Image */}
          {article.image && (
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold">
                {article.category}
              </span>
              {article.author && (
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {article.author}
                </span>
              )}
              {article.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(article.publishedAt)}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>

            {/* Summary */}
            {article.summary && (
              <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-purple-500 pl-6">
                {article.summary}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-slate max-w-none">
              {article.content ? (
                <div className="text-slate-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {article.summary || 'เนื้อหาบทความ...'}
                </p>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl font-black mb-4">
            มีคำถามเพิ่มเติม?
          </h3>
          <p className="text-purple-100 mb-6">
            ปรึกษากับที่ปรึกษาของเราได้ฟรี
          </p>
          <button
            onClick={() => navigate(ROUTES.CONTACT)}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-black hover:bg-purple-50 transition-all"
          >
            ติดต่อที่ปรึกษา
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

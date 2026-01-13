
import { BookOpen, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/insurance';
import { getArticleRoute } from '../../constants/routes';

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
  className?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  title = 'บทความแนะนำ',
  className = ''
}) => {
  if (articles.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <Link
            to="/articles"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
          >
            ดูทั้งหมด
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={getArticleRoute(article.id)}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Image */}
              {article.image ? (
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-blue-300" />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    5 นาที
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {article.summary}
                  </p>
                )}

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                  อ่านเพิ่มเติม
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
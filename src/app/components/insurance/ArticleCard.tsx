
import { ChevronRight } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  category: string;
  image: string;
  summary: string;
  onClick?: () => void;
}

export function ArticleCard({ title, category, image, summary, onClick }: ArticleCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="h-56 overflow-hidden relative">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={title} 
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-xs font-black uppercase rounded-full tracking-wider shadow-lg">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-8 space-y-4">
        <h3 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {summary}
        </p>
        
        <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-wider pt-2">
          อ่านบทความ <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

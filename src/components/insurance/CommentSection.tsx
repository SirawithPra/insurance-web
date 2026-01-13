import { useState } from 'react';
import { MessageCircle, Send, Star } from 'lucide-react';
import { useComments } from '../../hooks';
import { formatDate } from '../../utils';

interface CommentSectionProps {
  articleId: number;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const { comments, loading, error, addComment } = useComments(articleId);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !content.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await addComment(author, content, rating > 0 ? rating : undefined);
      
      // Reset form
      setAuthor('');
      setContent('');
      setRating(0);
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageCircle className="text-red-600" size={28} />
        <h3 className="text-2xl font-black text-slate-900">
          ความคิดเห็น ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">ชื่อของคุณ</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="ระบุชื่อ..."
            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">ความคิดเห็น</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="แบ่งปันความคิดเห็นของคุณ..."
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-50 outline-none transition-all resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">คะแนน (ไม่จำเป็น)</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-all hover:scale-110"
              >
                <Star
                  size={24}
                  className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send size={20} />
          {submitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8 text-slate-500">กำลังโหลดความคิดเห็น...</div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        {!loading && comments.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!
          </div>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-slate-900">{comment.author}</h4>
                <p className="text-xs text-slate-500">{formatDate(comment.createdAt)}</p>
              </div>
              
              {comment.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: comment.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-slate-700 leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

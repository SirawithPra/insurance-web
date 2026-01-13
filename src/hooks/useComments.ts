import { useState, useEffect } from 'react';
import { Comment } from '../types/insurance';
import { commentService } from '../services/commentService';

export function useComments(articleId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await commentService.getCommentsByArticle(articleId);
      setComments(data);
    } catch (err) {
      setError('ไม่สามารถโหลดความคิดเห็นได้');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (author: string, content: string, rating?: number) => {
    try {
      const newComment = await commentService.createComment({
        articleId,
        author,
        content,
        rating
      });
      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      setError('ไม่สามารถเพิ่มความคิดเห็นได้');
      console.error('Error adding comment:', err);
      throw err;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      setError('ไม่สามารถลบความคิดเห็นได้');
      console.error('Error deleting comment:', err);
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    reload: loadComments
  };
}

import { api } from './api';
import type { Comment } from '../types/insurance';

// =====================
// Comment Service
// =====================

export interface CreateCommentData {
  articleId: number;
  author: string;
  content: string;
  rating?: number;
}

export interface CommentListParams {
  articleId?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedComments {
  comments: Comment[];
  total: number;
  page: number;
  totalPages: number;
}

export const commentService = {
  // Get comments for an article
  getComments: async (params: CommentListParams): Promise<PaginatedComments> => {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await api.get<PaginatedComments>('/comments', { params });
      // return response.data!;
      
      // Mock implementation for now
      return {
        comments: [],
        total: 0,
        page: params.page || 1,
        totalPages: 0
      };
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Create a new comment
  createComment: async (data: CreateCommentData): Promise<Comment> => {
    try {
      // TODO: Replace with real API call
      // const response = await api.post<Comment>('/comments', data);
      // return response.data!;
      
      // Mock implementation
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        articleId: data.articleId,
        author: data.author,
        content: data.content,
        rating: data.rating,
        createdAt: new Date().toISOString()
      };
      
      return newComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Delete a comment (admin only in production)
  deleteComment: async (commentId: string): Promise<boolean> => {
    try {
      // TODO: Replace with real API call
      // const response = await api.delete(`/comments/${commentId}`);
      // return response.success;
      
      // Mock implementation
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

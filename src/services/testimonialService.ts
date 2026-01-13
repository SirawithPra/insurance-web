import { Testimonial, TestimonialStats } from '../types';
import api from './api';

// =====================
// Testimonial Service
// =====================

/**
 * Service for managing testimonials/reviews
 * Ready for Backend integration with Go API
 */

// Get testimonials by insurance type
export const getTestimonialsByType = async (
  insuranceType: 'life' | 'savings' | 'health' | 'accident' | 'general'
): Promise<Testimonial[]> => {
  // TODO: Replace with actual API call
  // const response = await api.get<Testimonial[]>(`/testimonials?type=${insuranceType}`);
  // return response.data;
  
  // Mock implementation (remove when connecting to backend)
  const { ALL_TESTIMONIALS } = await import('../constants/testimonials');
  return ALL_TESTIMONIALS[insuranceType] || [];
};

// Get all testimonials
export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  // TODO: Replace with actual API call
  // const response = await api.get<Testimonial[]>('/testimonials');
  // return response.data;
  
  // Mock implementation
  const { ALL_TESTIMONIALS } = await import('../constants/testimonials');
  return Object.values(ALL_TESTIMONIALS).flat();
};

// Get featured testimonials (highest rated, verified)
export const getFeaturedTestimonials = async (
  limit: number = 6
): Promise<Testimonial[]> => {
  // TODO: Replace with actual API call
  // const response = await api.get<Testimonial[]>(`/testimonials/featured?limit=${limit}`);
  // return response.data;
  
  // Mock implementation
  const allTestimonials = await getAllTestimonials();
  return allTestimonials
    .filter((t) => t.verified && t.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Get testimonial stats
export const getTestimonialStats = async (
  insuranceType?: string
): Promise<TestimonialStats> => {
  // TODO: Replace with actual API call
  // const response = await api.get<TestimonialStats>(`/testimonials/stats?type=${insuranceType || 'all'}`);
  // return response.data;
  
  // Mock implementation
  const testimonials = insuranceType
    ? await getTestimonialsByType(insuranceType as any)
    : await getAllTestimonials();

  const totalReviews = testimonials.length;
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews;

  const ratingDistribution = testimonials.reduce(
    (acc, t) => {
      acc[t.rating as keyof typeof acc] = (acc[t.rating as keyof typeof acc] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  return {
    totalReviews,
    averageRating,
    ratingDistribution
  };
};

// Create new testimonial (Authenticated users)
export const createTestimonial = async (
  testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'verified'>
): Promise<Testimonial> => {
  // TODO: Replace with actual API call
  // const response = await api.post<Testimonial>('/testimonials', testimonial);
  // return response.data;
  
  throw new Error('Backend not connected yet');
};

// Update testimonial (Admin only)
export const updateTestimonial = async (
  id: string,
  testimonial: Partial<Testimonial>
): Promise<Testimonial> => {
  // TODO: Replace with actual API call
  // const response = await api.put<Testimonial>(`/admin/testimonials/${id}`, testimonial);
  // return response.data;
  
  throw new Error('Backend not connected yet');
};

// Delete testimonial (Admin only)
export const deleteTestimonial = async (id: string): Promise<void> => {
  // TODO: Replace with actual API call
  // await api.delete(`/admin/testimonials/${id}`);
  
  throw new Error('Backend not connected yet');
};

// Verify testimonial (Admin only)
export const verifyTestimonial = async (
  id: string,
  verified: boolean
): Promise<Testimonial> => {
  // TODO: Replace with actual API call
  // const response = await api.patch<Testimonial>(`/admin/testimonials/${id}/verify`, { verified });
  // return response.data;
  
  throw new Error('Backend not connected yet');
};

export default {
  getTestimonialsByType,
  getAllTestimonials,
  getFeaturedTestimonials,
  getTestimonialStats,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  verifyTestimonial
};

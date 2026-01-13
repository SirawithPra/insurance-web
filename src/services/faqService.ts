import { FAQ } from '../types';
import api from './api';

// =====================
// FAQ Service
// =====================

/**
 * Service for managing FAQs
 * Ready for Backend integration with Go API
 */

// Get FAQs by category
export const getFAQsByCategory = async (
  category: 'life' | 'savings' | 'health' | 'accident' | 'general'
): Promise<FAQ[]> => {
  // TODO: Replace with actual API call
  // const response = await api.get<FAQ[]>(`/faqs?category=${category}`);
  // return response.data;
  
  // Mock implementation (remove when connecting to backend)
  const { ALL_FAQS } = await import('../constants/faq');
  return ALL_FAQS[category] || [];
};

// Get all FAQs
export const getAllFAQs = async (): Promise<FAQ[]> => {
  // TODO: Replace with actual API call
  // const response = await api.get<FAQ[]>('/faqs');
  // return response.data;
  
  // Mock implementation
  const { ALL_FAQS } = await import('../constants/faq');
  return Object.values(ALL_FAQS).flat();
};

// Get single FAQ by ID
export const getFAQById = async (id: string): Promise<FAQ | null> => {
  // TODO: Replace with actual API call
  // const response = await api.get<FAQ>(`/faqs/${id}`);
  // return response.data;
  
  // Mock implementation
  const allFAQs = await getAllFAQs();
  return allFAQs.find((faq) => faq.id === id) || null;
};

// Create new FAQ (Admin only)
export const createFAQ = async (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> => {
  // TODO: Replace with actual API call
  // const response = await api.post<FAQ>('/admin/faqs', faq);
  // return response.data;
  
  throw new Error('Backend not connected yet');
};

// Update FAQ (Admin only)
export const updateFAQ = async (id: string, faq: Partial<FAQ>): Promise<FAQ> => {
  // TODO: Replace with actual API call
  // const response = await api.put<FAQ>(`/admin/faqs/${id}`, faq);
  // return response.data;
  
  throw new Error('Backend not connected yet');
};

// Delete FAQ (Admin only)
export const deleteFAQ = async (id: string): Promise<void> => {
  // TODO: Replace with actual API call
  // await api.delete(`/admin/faqs/${id}`);
  
  throw new Error('Backend not connected yet');
};

// Reorder FAQs (Admin only)
export const reorderFAQs = async (
  category: string,
  orderedIds: string[]
): Promise<void> => {
  // TODO: Replace with actual API call
  // await api.post('/admin/faqs/reorder', { category, orderedIds });
  
  throw new Error('Backend not connected yet');
};

export default {
  getFAQsByCategory,
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  reorderFAQs
};

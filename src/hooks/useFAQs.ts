import { useState, useEffect } from 'react';
import { FAQ } from '../types';
import { faqService } from '../services';

// =====================
// useFAQs Hook
// =====================

export const useFAQs = (category?: 'life' | 'savings' | 'health' | 'accident' | 'general') => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = category
          ? await faqService.getFAQsByCategory(category)
          : await faqService.getAllFAQs();
        
        setFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [category]);

  return { faqs, loading, error };
};

// =====================
// useFAQ Hook (single)
// =====================

export const useFAQ = (id: string) => {
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await faqService.getFAQById(id);
        setFaq(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQ');
        console.error('Error fetching FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFAQ();
    }
  }, [id]);

  return { faq, loading, error };
};

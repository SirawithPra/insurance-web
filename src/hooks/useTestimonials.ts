import { useState, useEffect } from 'react';
import { Testimonial, TestimonialStats } from '../types';
import { testimonialService } from '../services';

// =====================
// useTestimonials Hook
// =====================

export const useTestimonials = (
  insuranceType?: 'life' | 'savings' | 'health' | 'accident' | 'general',
  featured: boolean = false
) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: Testimonial[];
        
        if (featured) {
          data = await testimonialService.getFeaturedTestimonials();
        } else if (insuranceType) {
          data = await testimonialService.getTestimonialsByType(insuranceType);
        } else {
          data = await testimonialService.getAllTestimonials();
        }
        
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [insuranceType, featured]);

  return { testimonials, loading, error };
};

// =====================
// useTestimonialStats Hook
// =====================

export const useTestimonialStats = (insuranceType?: string) => {
  const [stats, setStats] = useState<TestimonialStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await testimonialService.getTestimonialStats(insuranceType);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        console.error('Error fetching testimonial stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [insuranceType]);

  return { stats, loading, error };
};

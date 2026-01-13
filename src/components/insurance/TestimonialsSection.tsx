import { useState } from 'react';
import { Star, CheckCircle, MapPin, Calendar, MessageSquarePlus } from 'lucide-react';
import { Testimonial } from '../../types';
import { TestimonialForm } from './TestimonialForm';

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
  className?: string;
  showForm?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({
  testimonials,
  title = 'ความคิดเห็นจากผู้ใช้บริการ',
  description,
  className = '',
  showForm = true
}) => {
  const [showFormModal, setShowFormModal] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long'
    });
  };

  // Calculate average rating
  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const handleFormSubmit = (data: any) => {
    console.log('New testimonial:', data);
    // TODO: Send to backend
    setShowFormModal(false);
  };

  return (
    <section className={`py-12 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          {description && (
            <p className="text-gray-600 text-lg mb-4">{description}</p>
          )}
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-left">
              <p className="text-gray-600">
                จาก <span className="font-semibold">{testimonials.length}</span> รีวิว
              </p>
              <p className="text-sm text-gray-500">ความคิดเห็นจากผู้ใช้บริการจริง</p>
            </div>
          </div>

          {/* Add Review Button */}
          {showForm && (
            <button
              onClick={() => setShowFormModal(!showFormModal)}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all"
            >
              <MessageSquarePlus size={20} />
              {showFormModal ? 'ซ่อนฟอร์ม' : 'แบ่งปันประสบการณ์'}
            </button>
          )}
        </div>

        {/* Testimonial Form */}
        {showForm && showFormModal && (
          <div className="mb-10">
            <TestimonialForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                {renderStars(testimonial.rating)}
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">ยืนยันแล้ว</span>
                  </div>
                )}
              </div>

              {/* Comment */}
              <p className="text-gray-700 leading-relaxed mb-4 line-clamp-6">
                "{testimonial.comment}"
              </p>

              {/* User Info */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                    {testimonial.name.charAt(2)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {testimonial.name}
                    </p>
                    
                    {testimonial.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    )}
                    
                    {testimonial.purchaseDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>ซื้อเมื่อ {formatDate(testimonial.purchaseDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators - เปลี่ยนคำให้เหมาะกับตัวแทนใหม่ */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-md">
            <div>
              <p className="text-3xl font-bold text-blue-600">มืออาชีพ</p>
              <p className="text-sm text-gray-600">ใบอนุญาตตัวแทน</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-green-600">โปร่งใส</p>
              <p className="text-sm text-gray-600">ข้อมูลจริง ไม่ปิดบัง</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">ปรึกษาฟรี</p>
              <p className="text-sm text-gray-600">ไม่มีค่าใช้จ่าย</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            ให้คำปรึกษาด้วยข้อมูลที่โปร่งใส เพื่อให้คุณตัดสินใจได้ดีที่สุด
          </p>
        </div>
      </div>
    </section>
  );
};
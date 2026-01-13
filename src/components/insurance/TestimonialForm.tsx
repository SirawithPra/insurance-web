import { useState } from 'react';
import { Star, Send, CheckCircle, User } from 'lucide-react';

interface TestimonialFormProps {
  onSubmit?: (data: TestimonialFormData) => void;
  className?: string;
}

export interface TestimonialFormData {
  name: string;
  occupation: string;
  rating: number;
  comment: string;
  insuranceType: string;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    occupation: '',
    rating: 5,
    comment: '',
    insuranceType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        occupation: '',
        rating: 5,
        comment: '',
        insuranceType: 'general'
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 rounded-3xl p-12 text-center ${className}`}>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h3 className="text-2xl font-black text-green-900 mb-3">
          ขอบคุณสำหรับความคิดเห็น!
        </h3>
        <p className="text-green-700">
          ความคิดเห็นของคุณจะช่วยให้ผู้อื่นตัดสินใจได้ดีขึ้น
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <User className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">แบ่งปันประสบการณ์</h3>
          <p className="text-sm text-slate-600">ช่วยให้คนอื่นเข้าใจประกันได้ดีขึ้น</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ชื่อของคุณ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="ระบุชื่อหรือนามแฝง"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none transition-all"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            อาชีพ
          </label>
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            placeholder="เช่น พนักงานบริษัท, ธุรกิจส่วนตัว"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none transition-all"
          />
        </div>

        {/* Insurance Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ประเภทประกันที่ใช้บริการ
          </label>
          <select
            value={formData.insuranceType}
            onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none transition-all"
          >
            <option value="general">ทั่วไป</option>
            <option value="life">ประกันชีวิต</option>
            <option value="savings">ประกันออมทรัพย์</option>
            <option value="health">ประกันสุขภาพ</option>
            <option value="accident">ประกันอุบัติเหตุ</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ความพึงพอใจ <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={
                    star <= formData.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-none text-slate-300'
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-slate-600 flex items-center">
              ({formData.rating}/5)
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            ความคิดเห็น <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="แบ่งปันประสบการณ์หรือความคิดเห็นของคุณ..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none transition-all resize-none"
          />
          <p className="text-xs text-slate-500 mt-2">
            ความคิดเห็นจะถูกตรวจสอบก่อนแสดงผล
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              กำลังส่ง...
            </>
          ) : (
            <>
              <Send size={20} />
              ส่งความคิดเห็น
            </>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-slate-500 text-center">
          ข้อมูลของคุณจะถูกใช้เพื่อแสดงความคิดเห็นเท่านั้น และจะไม่ถูกนำไปใช้ในวัตถุประสงค์อื่น
        </p>
      </form>
    </div>
  );
};

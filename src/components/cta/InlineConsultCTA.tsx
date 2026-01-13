import React from 'react';
import { MessageCircle, Phone, CheckCircle2, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

interface InlineConsultCTAProps {
  variant?: 'default' | 'urgent' | 'subtle';
  message?: string;
}

export function InlineConsultCTA({ 
  variant = 'default',
  message = 'งง? ให้ผมช่วยอธิบายกราฟนี้ให้เข้าใจใน 10 นาที'
}: InlineConsultCTAProps) {
  const navigate = useNavigate();

  if (variant === 'subtle') {
    return (
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
            <MessageCircle className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-black text-slate-900 mb-2">
              ต้องการคำแนะนำเพิ่มเติม?
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              {message}
            </p>
            <button
              onClick={() => navigate(ROUTES.CONTACT)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
            >
              ปรึกษาฟรี →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'urgent') {
    return (
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-black animate-pulse">
              🔥 โปรโมชั่นพิเศษ
            </div>
          </div>

          <h3 className="text-3xl font-black leading-tight">
            ปรึกษาวันนี้<br />
            <span className="text-yellow-300">รับของขวัญฟรี!</span>
          </h3>
          
          <p className="text-red-100 leading-relaxed">
            {message}
            <br />
            <span className="font-bold">+ รับฟรี! คู่มือวางแผนการเงินส่วนบุคคล</span>
          </p>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <CheckCircle2 className="mx-auto mb-1" size={20} />
              <span className="font-bold">ไม่ขาย</span>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <Clock className="mx-auto mb-1" size={20} />
              <span className="font-bold">10 นาที</span>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <Shield className="mx-auto mb-1" size={20} />
              <span className="font-bold">ไม่ผูกมัด</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://line.me/ti/p/~smartwealth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-emerald-600 px-6 py-4 rounded-xl font-black hover:bg-emerald-50 transition-all shadow-xl"
            >
              <MessageCircle size={20} />
              ทัก LINE รับคู่มือฟรี
            </a>
            
            <a
              href="tel:08xxxxxxxx"
              className="flex-1 flex items-center justify-center gap-2 bg-red-800 text-white px-6 py-4 rounded-xl font-black hover:bg-red-900 transition-all"
            >
              <Phone size={20} />
              โทรเลย
            </a>
          </div>

          <p className="text-xs text-red-100 text-center italic">
            "คุยจากข้อมูลที่คุณเห็น - โปร่งใส ไม่มีกลฉ้อฉล"
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <div className="inline-block bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black">
            ⚡ ปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black">
            {message}
          </h3>
          
          <p className="text-blue-100 text-sm">
            ที่ปรึกษามืออาชีพพร้อมตอบทุกคำถาม
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <a
            href="https://line.me/ti/p/~smartwealth"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-black hover:bg-emerald-50 transition-all shadow-xl whitespace-nowrap"
          >
            <MessageCircle size={20} />
            ทัก LINE เลย
          </a>
          
          <a
            href="tel:08xxxxxxxx"
            className="flex items-center justify-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-900 transition-all whitespace-nowrap"
          >
            <Phone size={20} />
            โทรเลย
          </a>
        </div>
      </div>
    </div>
  );
}

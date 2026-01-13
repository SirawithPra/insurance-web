
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 pt-16 pb-8 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600">
              <ShieldCheck size={20} />
            </div>
            <span className="font-black text-xl text-slate-800">SmartWealth</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            ความโปร่งใสคือหัวใจสำคัญ เว็บนี้ถูกสร้างขึ้นเพื่อให้คุณมีอำนาจในการตัดสินใจ
            ด้วยข้อมูลที่เป็นจริงที่สุด
          </p>
        </div>

        {/* Advisor Info */}
        <div className="space-y-4">
          <h5 className="font-black text-sm uppercase tracking-wider text-slate-700">
            ที่ปรึกษาการเงิน
          </h5>
          <div className="text-sm">
            <p className="font-bold text-slate-800">คุณสมชาย มั่งคั่ง</p>
            <p className="text-xs text-slate-500 mt-1">
              AIA Authorized Representative
              <br />
              License: xxx-xxx-xxx
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="space-y-4">
          <h5 className="font-black text-sm uppercase tracking-wider text-slate-700">
            ข้อจำกัดความรับผิดชอบ
          </h5>
          <p className="text-xs leading-relaxed">
            ข้อมูลในเว็บนี้เป็นเพียงตัวอย่างจำลองเบื้องต้น ไม่ใช่การการันตีผลตอบแทน
            ผลลัพธ์อาจเหมาะสำหรับบางบุคคลเท่านั้น
            โปรดศึกษาเงื่อนไขในกรมธรรม์ฉบับจริงอีกครั้ง
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} SmartWealth Digital Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
}

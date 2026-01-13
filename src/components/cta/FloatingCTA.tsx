import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, Sparkles } from 'lucide-react';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Expanded Card */}
        {isExpanded && (
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-6 mb-2 w-80 animate-in slide-in-from-bottom-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-300" size={20} />
                <h4 className="font-black text-lg">
                  พร้อมช่วยคุณแล้ว!
                </h4>
              </div>
              
              <p className="text-sm text-red-50 leading-relaxed">
                งง? สับสน? หรือต้องการคำแนะนำเพิ่มเติม?
                <br />
                <span className="font-bold">ให้ผมช่วยอธิบายกราฟให้เข้าใจใน 10 นาที</span>
              </p>

              <div className="space-y-2">
                <a
                  href="https://line.me/ti/p/~smartwealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-emerald-600 px-6 py-3 rounded-xl font-black hover:bg-emerald-50 transition-all shadow-lg"
                >
                  <MessageCircle size={20} />
                  ทัก LINE ฟรี
                </a>
                
                <a
                  href="tel:08xxxxxxxx"
                  className="flex items-center justify-center gap-2 w-full bg-red-800 text-white px-6 py-3 rounded-xl font-black hover:bg-red-900 transition-all"
                >
                  <Phone size={20} />
                  โทรเลย
                </a>
              </div>

              <p className="text-xs text-red-100 text-center italic">
                "ไม่ขาย ไม่ผูกมัด - คุยจากข้อมูลที่คุณเห็น"
              </p>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-110 active:scale-95 p-5 relative"
        >
          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
          
          {/* Badge */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-xs font-black shadow-lg animate-bounce">
            ฟรี
          </div>
          
          <MessageCircle size={28} className="relative z-10" />
        </button>
      </div>
    </>
  );
}

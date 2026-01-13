import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingCTA } from '../cta/FloatingCTA';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

interface MainLayoutProps {
  children: ReactNode;
  showMobileCTA?: boolean;
}

export function MainLayout({ children, showMobileCTA = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      
      <Footer />

      {/* Floating CTA */}
      {showMobileCTA && <FloatingCTA />}

      {/* Mobile Bottom CTA (only on mobile) */}
      {showMobileCTA && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-30 shadow-lg">
          <Link
            to={ROUTES.CONTACT}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all"
          >
            <Phone size={20} />
            ปรึกษาที่ปรึกษาฟรี
          </Link>
        </div>
      )}
    </div>
  );
}
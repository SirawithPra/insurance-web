import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Home, Pyramid, Wallet, HeartPulse, Zap, BookOpen, Phone, Calculator } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

const NAV_ITEMS = [
  { path: ROUTES.OVERVIEW, label: 'ภาพรวม', icon: Home },
  { path: ROUTES.NEEDS_ANALYSIS, label: 'วิเคราะห์', icon: Calculator },
  { path: ROUTES.LIFE, label: 'ทุนชีวิต', icon: Pyramid },
  { path: ROUTES.SAVINGS, label: 'สะสมทรัพย์', icon: Wallet },
  { path: ROUTES.HEALTH, label: 'สุขภาพ', icon: HeartPulse },
  { path: ROUTES.ACCIDENT, label: 'อุบัติเหตุ', icon: Zap },
  { path: ROUTES.ARTICLES, label: 'คลังความรู้', icon: BookOpen },
  { path: ROUTES.CONTACT, label: 'ปรึกษาฟรี', icon: Phone }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={20} />
          </div>
          <span className="font-black text-xl tracking-tight">SmartWealth</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(item.path)
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all block ${
                  isActive(item.path)
                    ? 'bg-red-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
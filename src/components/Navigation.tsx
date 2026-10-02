import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  LayoutGrid,
  CreditCard,
  HelpCircle,
  Settings,
  User,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Code2,
  FolderKanban,
  Plus,
  LogIn,
} from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: UserProfile;
  onNewWebsite: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  setCurrentScreen,
  user,
  onNewWebsite,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ screen: Screen; label: string; icon?: React.ReactNode }> = [
    { screen: 'landing', label: 'Home' },
    { screen: 'builder', label: 'AI Website Builder' },
    { screen: 'templates', label: 'Templates' },
    { screen: 'pricing', label: 'Pricing' },
    { screen: 'projects', label: 'My Websites' },
    { screen: 'help', label: 'Help' },
  ];

  const handleNavClick = (screen: Screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="brand-logo-btn"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0B0F19] transition group-hover:bg-opacity-80">
                <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-lg font-['Space_Grotesk']">
                  JUST WEN<span className="text-indigo-400">.AI</span>
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                  AI BUILDER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Your idea. Our AI. Your website.
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                onClick={() => handleNavClick(link.screen)}
                id={`nav-link-${link.screen}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 font-semibold border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('login')}
            id="nav-incomer-login-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-600 text-slate-200 text-xs font-semibold transition"
          >
            <LogIn className="h-3.5 w-3.5 text-indigo-400" />
            <span>Sign In / Incomer</span>
          </button>

          <button
            onClick={onNewWebsite}
            id="nav-quick-new-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Plus className="h-3.5 w-3.5 text-indigo-400" />
            <span>New Site</span>
          </button>

          <button
            onClick={() => handleNavClick('signup')}
            id="nav-get-started-btn"
            className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Incomer (10 Free)</span>
            </span>
          </button>

          {/* Account Profile Pill */}
          <button
            onClick={() => handleNavClick('account')}
            id="nav-account-btn"
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 pl-1 pr-3 py-1 hover:border-slate-600 transition"
            title="User Profile"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <span className="text-xs font-medium text-slate-300 max-w-[90px] truncate">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('builder')}
            className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold"
          >
            Build AI
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-hamburger-btn"
            aria-label="Toggle Menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0F172A] px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.screen}
                onClick={() => handleNavClick(link.screen)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium ${
                  currentScreen === link.screen
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('signup')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-md"
            >
              <Sparkles className="h-4 w-4" />
              <span>✨ New Incomer Onboarding (10 Free)</span>
            </button>
            <button
              onClick={() => handleNavClick('login')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 text-sm font-semibold"
            >
              <LogIn className="h-4 w-4 text-indigo-400" />
              <span>Sign In / Switch Account</span>
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 text-xs"
            >
              <User className="h-3.5 w-3.5" />
              <span>Active profile: {user.name}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

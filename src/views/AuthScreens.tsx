import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff,
  Briefcase,
  Rocket,
  Utensils,
  ShoppingBag,
  Palette,
  FileText,
  Gift,
  ArrowLeft,
  Check,
  Star,
  LogIn,
  UserCheck,
  Zap,
} from 'lucide-react';
import { Screen, UserProfile } from '../types';

interface AuthScreensProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  onLoginSuccess: (user: UserProfile, starterIntent?: string) => void;
  initialMode?: 'incomer' | 'returning';
}

type IncomerIntent = {
  id: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  defaultPrompt: string;
};

const INCOMER_INTENTS: IncomerIntent[] = [
  {
    id: 'portfolio',
    label: 'Portfolio & Resume',
    desc: 'Showcase your creative work & achievements',
    icon: Briefcase,
    defaultPrompt: 'Create a high-impact personal portfolio with a project showcase, about me section, skill matrix, client testimonials, and a contact form.',
  },
  {
    id: 'startup',
    label: 'SaaS & Tech Startup',
    desc: 'High-converting product landing page',
    icon: Rocket,
    defaultPrompt: 'Generate a modern SaaS landing page with a hero section, feature breakdown, interactive pricing tiers, customer reviews, and FAQ.',
  },
  {
    id: 'restaurant',
    label: 'Restaurant & Hospitality',
    desc: 'Menu showcases, reservations & location',
    icon: Utensils,
    defaultPrompt: 'Design a culinary website with an artisanal menu, ambiance photo gallery, chef story, online table booking, and opening hours.',
  },
  {
    id: 'ecommerce',
    label: 'Shop & E-Commerce',
    desc: 'Product gallery, checkout & offers',
    icon: ShoppingBag,
    defaultPrompt: 'Create a boutique storefront highlighting featured collections, customer reviews, product cards, trust badges, and newsletter signup.',
  },
  {
    id: 'agency',
    label: 'Agency & Creative Studio',
    desc: 'Client case studies & service offerings',
    icon: Palette,
    defaultPrompt: 'Build an agency website presenting design services, case studies, team highlights, pricing packages, and an interactive discovery call form.',
  },
  {
    id: 'blog',
    label: 'Blog & Publication',
    desc: 'Articles, insights & subscriber newsletters',
    icon: FileText,
    defaultPrompt: 'Create a clean, publication-grade blog layout with featured articles, categories, author bio, read times, and newsletter subscription form.',
  },
];

export const AuthScreens: React.FC<AuthScreensProps> = ({
  currentScreen,
  setCurrentScreen,
  onLoginSuccess,
  initialMode = 'incomer',
}) => {
  // Mode: 'incomer' (newcomer signup/onboarding), 'returning' (login), 'forgot', 'verify'
  const [activeTab, setActiveTab] = useState<'incomer' | 'returning'>(
    currentScreen === 'login' ? 'returning' : initialMode
  );
  const [subFlow, setSubFlow] = useState<'default' | 'forgot' | 'verify'>('default');

  // New Incomer selected starter goal
  const [selectedIntent, setSelectedIntent] = useState<string>('startup');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation for newcomers
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, text: 'Empty', color: 'bg-slate-700' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, text: 'Fair', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (subFlow === 'forgot') {
      if (!email) {
        setErrorMsg('Please enter your email to receive recovery instructions.');
        return;
      }
      setSubFlow('verify');
      return;
    }

    if (subFlow === 'verify') {
      if (!verificationCode || verificationCode.length < 4) {
        setErrorMsg('Please enter a valid verification code.');
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(
          {
            id: `usr_${Date.now()}`,
            name: fullName || 'New Creator',
            email: email || 'creator@justwen.ai',
            plan: 'Free Starter (New Incomer Bonus)',
            aiGenerationsUsed: 0,
            aiGenerationsLimit: 10,
            generationsUsed: 0,
            maxGenerations: 10,
          },
          selectedIntent
        );
        setCurrentScreen('builder');
      }, 500);
      return;
    }

    // New Incomer Signup flow
    if (activeTab === 'incomer') {
      if (!fullName.trim()) {
        setErrorMsg('Please provide your name so we can personalize your workspace.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        // Direct entry with 10 free AI generations for new incomer
        onLoginSuccess(
          {
            id: `usr_${Date.now()}`,
            name: fullName.trim(),
            email: email.trim(),
            plan: 'Free Starter (New Incomer Bonus)',
            aiGenerationsUsed: 0,
            aiGenerationsLimit: 10,
            generationsUsed: 0,
            maxGenerations: 10,
          },
          selectedIntent
        );
        setCurrentScreen('builder');
      }, 600);
      return;
    }

    // Returning Member Login flow
    if (activeTab === 'returning') {
      if (!email.trim()) {
        setErrorMsg('Please enter your email.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(
          {
            id: 'usr_returning',
            name: fullName || email.split('@')[0] || 'Alex Rivera',
            email: email,
            plan: 'Pro Creator',
            aiGenerationsUsed: 14,
            aiGenerationsLimit: 100,
            generationsUsed: 14,
            maxGenerations: 100,
          },
          selectedIntent
        );
        setCurrentScreen('builder');
      }, 500);
    }
  };

  const handleGoogleSignIn = () => {
    onLoginSuccess(
      {
        id: `google_${Date.now()}`,
        name: activeTab === 'incomer' ? 'New Incomer' : 'Alex Rivera',
        email: activeTab === 'incomer' ? 'newcreator@gmail.com' : 'alex@justwen.ai',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        plan: activeTab === 'incomer' ? 'Free Starter (New Incomer Bonus)' : 'Pro Creator',
        aiGenerationsUsed: 0,
        aiGenerationsLimit: 10,
        generationsUsed: 0,
        maxGenerations: 10,
      },
      selectedIntent
    );
    setCurrentScreen('builder');
  };

  const handleGitHubSignIn = () => {
    onLoginSuccess(
      {
        id: `github_${Date.now()}`,
        name: 'GitHub Creator',
        email: 'developer@github.com',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        plan: 'Free Starter (New Incomer Bonus)',
        aiGenerationsUsed: 0,
        aiGenerationsLimit: 10,
        generationsUsed: 0,
        maxGenerations: 10,
      },
      selectedIntent
    );
    setCurrentScreen('builder');
  };

  const handleGuestIncomerBypass = () => {
    onLoginSuccess(
      {
        id: `guest_${Date.now()}`,
        name: 'Guest Incomer',
        email: 'guest@justwen.ai',
        plan: 'Free Starter (Guest Trial)',
        aiGenerationsUsed: 0,
        aiGenerationsLimit: 5,
        generationsUsed: 0,
        maxGenerations: 5,
      },
      selectedIntent
    );
    setCurrentScreen('builder');
  };

  const activeIntentObj = INCOMER_INTENTS.find((i) => i.id === selectedIntent);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#070A11] px-4 py-8 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle Background Ambience */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl" />

      {/* Navigation Breadcrumb / Home Link */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('landing')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
          id="auth-back-to-home"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Just Wen AI</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[11px] font-semibold text-indigo-300">
            <Gift className="h-3 w-3 text-indigo-400" />
            <span>New Incomer Starter Bonus: 10 Free Generations</span>
          </span>
        </div>
      </div>

      {/* Main Split-Grid Container */}
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-[#0F172A]/90 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Section: Incomer Welcome Experience & Starter Pack (Lg: 5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-[#0C1222] to-[#090D18] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>New Incomer Onboarding</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight mb-3">
              Build your website with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Just Wen AI</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Welcome newcomer! Experience instantaneous, AI-driven web development. Simply type what you want, and watch responsive design happen live.
            </p>

            {/* Incomer Starter Perks Box */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Gift className="h-3.5 w-3.5 text-indigo-400" />
                <span>Your Incomer Welcome Pack</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">10 Free AI Generations</strong> — Generous credit to design, restyle, and refine.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">Instant Free Subdomain</strong> — Publish immediately to <code className="text-indigo-300">yourname.justwen.ai</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">10+ Premium Starter Templates</strong> — One-click import for portfolios, startups, cafes & stores.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <strong className="text-white font-medium">Zero Setup & No Credit Card</strong> — Instant access, export HTML/ZIP anytime.
                  </div>
                </li>
              </ul>
            </div>

            {/* Incomer Goal Selector */}
            {activeTab === 'incomer' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                  <span>What are you building first?</span>
                  <span className="text-[10px] text-indigo-400 font-normal">Pre-configures builder</span>
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {INCOMER_INTENTS.map((intent) => {
                    const Icon = intent.icon;
                    const isSelected = selectedIntent === intent.id;
                    return (
                      <button
                        type="button"
                        key={intent.id}
                        onClick={() => setSelectedIntent(intent.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left border transition text-xs ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold shadow-sm shadow-indigo-500/20'
                            : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="truncate">{intent.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Social Proof & Security Badge */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0F172A]"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0F172A]"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0F172A]"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="User"
                />
              </div>
              <div className="text-[11px]">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                  <span className="ml-1.5 font-bold text-slate-200">4.9/5</span>
                </div>
                <p className="text-slate-400">14,200+ first-time websites published</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Form View (Lg: 7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Top Segmented Tab: New Incomer vs Returning Member */}
          <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              id="tab-new-incomer"
              onClick={() => {
                setActiveTab('incomer');
                setSubFlow('default');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'incomer' && subFlow === 'default'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>New Incomer (Start Free)</span>
              <span className="hidden sm:inline-block rounded-full bg-white/20 px-1.5 py-0.2 text-[9px] font-extrabold uppercase">
                10 Free
              </span>
            </button>

            <button
              type="button"
              id="tab-returning-member"
              onClick={() => {
                setActiveTab('returning');
                setSubFlow('default');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'returning' && subFlow === 'default'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Returning Member Login</span>
            </button>
          </div>

          {/* Form Titles */}
          <div className="mb-6">
            {subFlow === 'forgot' ? (
              <>
                <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Reset Your Password</h2>
                <p className="text-xs text-slate-400 mt-1">Enter your email and we will send you a verification code.</p>
              </>
            ) : subFlow === 'verify' ? (
              <>
                <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Verify Your Account</h2>
                <p className="text-xs text-slate-400 mt-1">Enter the 6-digit confirmation code sent to <span className="text-indigo-300 font-mono">{email || 'your email'}</span>.</p>
              </>
            ) : activeTab === 'incomer' ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                    Create Your Incomer Account
                  </h2>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5">
                    Instant Access
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Claim your starter pack and launch your site in under 60 seconds.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                  Welcome Back to Just Wen AI
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Sign in to manage your published websites and ongoing projects.
                </p>
              </>
            )}
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-300 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Social One-Click Login Options (Active for both Incomer & Returning) */}
          {subFlow === 'default' && (
            <div className="space-y-2.5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  id="btn-google-auth"
                  className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  id="btn-github-auth"
                  className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition"
                >
                  <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Continue with GitHub</span>
                </button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0F172A] px-3 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                    Or with email credentials
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* New Incomer Name Input */}
            {activeTab === 'incomer' && subFlow === 'default' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / Studio Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    id="incomer-name-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jordan Lee"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Email Address Input */}
            {subFlow !== 'verify' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    id="incomer-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            {subFlow === 'default' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  {activeTab === 'returning' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSubFlow('forgot');
                        setErrorMsg('');
                      }}
                      className="text-[11px] text-indigo-400 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="incomer-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Live Password Strength Meter for New Incomers */}
                {activeTab === 'incomer' && password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Security Strength:</span>
                      <span className="font-semibold text-slate-200">{passwordStrength.text}</span>
                    </div>
                    <div className="flex h-1.5 gap-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 1 ? passwordStrength.color : 'bg-transparent'
                        } w-1/3`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 2 ? passwordStrength.color : 'bg-transparent'
                        } w-1/3`}
                      />
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score >= 3 ? passwordStrength.color : 'bg-transparent'
                        } w-1/3`}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Password for New Incomer */}
            {activeTab === 'incomer' && subFlow === 'default' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="incomer-confirm-password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono"
                  />
                </div>
              </div>
            )}

            {/* Verification Code Box */}
            {subFlow === 'verify' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 text-center">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  id="incomer-verify-code-input"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="482910"
                  className="w-full px-3 py-3 rounded-xl border border-slate-700 bg-slate-900 text-center tracking-widest font-mono text-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>Code expires in 10 mins</span>
                  <button
                    type="button"
                    onClick={() => setVerificationCode('582914')}
                    className="text-indigo-400 hover:underline"
                  >
                    Auto-fill demo code (582914)
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me / Terms */}
            {activeTab === 'returning' && subFlow === 'default' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>
            )}

            {activeTab === 'incomer' && subFlow === 'default' && (
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By joining Just Wen AI, you agree to our{' '}
                <span className="text-indigo-400">Terms of Service</span> and{' '}
                <span className="text-indigo-400">Privacy Policy</span>. No spam, ever.
              </p>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="auth-submit-btn"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Setting up workspace...</span>
              ) : subFlow === 'forgot' ? (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : subFlow === 'verify' ? (
                <>
                  <span>Confirm Code & Enter Builder</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : activeTab === 'incomer' ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Claim 10 Free Generations & Launch</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Sign In to Just Wen AI</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Sub-flow Back Button */}
          {(subFlow === 'forgot' || subFlow === 'verify') && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setSubFlow('default');
                  setErrorMsg('');
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Return to Sign In
              </button>
            </div>
          )}

          {/* Guest Incomer Option (Zero Friction Sandbox for Newcomers) */}
          {subFlow === 'default' && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-left">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Just looking around?</h4>
                    <p className="text-[10px] text-slate-400">Explore as a Guest Incomer without creating a password</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestIncomerBypass}
                  id="btn-guest-incomer"
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-200 transition shrink-0"
                >
                  Enter Guest Mode
                </button>
              </div>
            </div>
          )}

          {/* Bottom Switcher */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {activeTab === 'incomer' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  id="switch-to-returning"
                  onClick={() => {
                    setActiveTab('returning');
                    setSubFlow('default');
                    setErrorMsg('');
                  }}
                  className="font-semibold text-indigo-400 hover:underline"
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                New incomer to Just Wen AI?{' '}
                <button
                  type="button"
                  id="switch-to-incomer"
                  onClick={() => {
                    setActiveTab('incomer');
                    setSubFlow('default');
                    setErrorMsg('');
                  }}
                  className="font-semibold text-indigo-400 hover:underline"
                >
                  Claim your 10 free generations
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

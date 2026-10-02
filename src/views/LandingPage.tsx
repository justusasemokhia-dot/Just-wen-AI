import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Layout,
  Wand2,
  FileCode2,
  Smartphone,
  Image as ImageIcon,
  Rocket,
  CheckCircle,
  Play,
  Monitor,
  Tablet,
  CheckCircle2,
  Layers,
  ChevronRight,
  Shield,
  Zap,
  Gift,
} from 'lucide-react';
import { Screen } from '../types';
import { INITIAL_TEMPLATES } from '../data/templates';

interface LandingPageProps {
  onStartBuilding: (prompt?: string) => void;
  onExploreTemplates: () => void;
  setCurrentScreen: (screen: Screen) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  onExploreTemplates,
  setCurrentScreen,
}) => {
  const [heroPromptInput, setHeroPromptInput] = useState('');
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

  const sampleQuickPrompts = [
    'Boutique artisanal coffee roastery with shop & brew guide',
    'Modern Japanese dining room with tasting menu and table booking',
    'Autonomous AI developer platform with telemetry & pricing',
    'Luxury architecture studio portfolio with case studies',
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPromptInput.trim()) {
      onStartBuilding('Create a modern restaurant website with a dark theme, menu section, online booking, customer reviews, and contact information.');
    } else {
      onStartBuilding(heroPromptInput.trim());
    }
  };

  const aiFeatures = [
    {
      title: 'AI Website Generation',
      subtitle: 'Natural Language to Complete Architecture',
      description: 'Generate complete, production-ready websites in seconds simply from natural-language prompts. Layouts, sections, copy, and responsive styles configured instantly.',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'AI Design Assistant',
      subtitle: 'Harmonious Visual Systems',
      description: 'Intelligently balance typography step ratios, WCAG AA color contrast, baseline rhythm, and visual whitespace without manual CSS tweaking.',
      icon: Wand2,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'AI Content Generator',
      subtitle: 'Compelling Copy & Value Hooks',
      description: 'Generate authentic headlines, feature descriptions, customer testimonials, and high-converting calls-to-action tailored specifically to your domain.',
      icon: Layout,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'AI Code Generation',
      subtitle: 'Semantic, Clean & Fast Markup',
      description: 'Generate clean HTML5, modern Tailwind CSS, and lightweight components with zero vendor lock-in. Export anytime or host on our edge network.',
      icon: FileCode2,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Responsive Design',
      subtitle: 'Flawless on Every Screen',
      description: 'Websites automatically adapt across mobile phones, tablets, laptops, and ultra-wide desktops with touch-optimized controls and fluid grids.',
      icon: Smartphone,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'AI Image Support',
      subtitle: 'Curated Visual Assets',
      description: 'Automatically select high-resolution, thematic photography, badges, and contextual visual assets tailored to your industry niche.',
      icon: ImageIcon,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'One-Click Publishing',
      subtitle: 'Global Edge CDN Deployment',
      description: 'Publish generated websites to the web in under 3 seconds with free subdomains, custom domain mapping, and automatic SSL security.',
      icon: Rocket,
      color: 'from-rose-500 to-red-600',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#0B0F19] text-slate-100">
      {/* Luminous Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-indigo-600/18 via-purple-600/10 to-transparent blur-3xl opacity-80" />
      <div className="pointer-events-none absolute top-[700px] -right-40 w-[500px] h-[500px] bg-blue-600/10 blur-[130px]" />

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-sm shadow-indigo-500/20 backdrop-blur-md mb-8">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Next-Gen Just Wen AI 3.0 Live Engine</span>
          <span className="h-1 w-1 rounded-full bg-indigo-400" />
          <span className="text-slate-400">Natural Language to Production Site</span>
        </div>

        {/* Large Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-['Space_Grotesk'] mb-6">
          Describe It.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            Build It.
          </span>{' '}
          Launch It.
        </h1>

        {/* Supporting Text */}
        <p className="mx-auto max-w-2xl text-base sm:text-xl text-slate-300 leading-relaxed mb-10">
          Create beautiful, responsive websites with AI. Tell{' '}
          <strong className="text-white font-semibold">Just Wen AI</strong> what you need and watch your
          website come to life in seconds.
        </p>

        {/* Interactive AI Prompt Box on Hero */}
        <div className="mx-auto max-w-2xl mb-8">
          <form
            onSubmit={handleHeroSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-indigo-500/30 bg-[#0F172A]/90 p-2 shadow-2xl shadow-indigo-500/10 backdrop-blur-lg focus-within:border-indigo-500"
          >
            <div className="flex items-center gap-2.5 w-full pl-3 pr-2 py-2">
              <Sparkles className="h-5 w-5 text-indigo-400 shrink-0 animate-pulse" />
              <input
                type="text"
                value={heroPromptInput}
                onChange={(e) => setHeroPromptInput(e.target.value)}
                placeholder="e.g. Modern bakery in Paris with artisanal menu, pastry pre-order, and chef story..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              id="hero-generate-btn"
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Build My Website</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Prompt chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">Try asking:</span>
            {sampleQuickPrompts.slice(0, 2).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setHeroPromptInput(chip)}
                className="rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition"
              >
                "{chip}"
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onStartBuilding()}
            id="hero-start-building-free-btn"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition"
          >
            <Sparkles className="h-4 w-4" />
            <span>Start Building Free</span>
          </button>
          <button
            onClick={() => setCurrentScreen('signup')}
            id="hero-incomer-login-btn"
            className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
          >
            <Gift className="h-4 w-4 text-indigo-400" />
            <span>New Incomer? Get 10 Free Credits</span>
          </button>
          <button
            onClick={onExploreTemplates}
            id="hero-explore-templates-btn"
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-850 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
          >
            <Layout className="h-4 w-4 text-indigo-400" />
            <span>Explore Templates</span>
          </button>
        </div>

        {/* Large Animated Website-Builder Preview Mockup */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-700/80 bg-[#0F172A] p-2.5 sm:p-4 shadow-2xl shadow-indigo-500/10">
          {/* Mockup Window Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 px-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline-block">
                sitegen.ai/builder/live-preview
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1 text-xs text-indigo-400 border border-slate-800">
              <Zap className="h-3.5 w-3.5" />
              <span>Real-Time AI Canvas</span>
            </div>
          </div>

          {/* Interactive Mockup Body */}
          <div className="grid grid-cols-12 gap-3 mt-3">
            {/* Sidebar Simulation */}
            <div className="hidden md:block md:col-span-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-3 text-left">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">AI Studio Controls</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="p-2 rounded-lg bg-indigo-600/15 text-indigo-300 font-semibold">
                  ⚡ Restaurant Template
                </div>
                <div className="p-2 rounded-lg hover:bg-slate-800/60">🎨 Palette: Twilight Gold</div>
                <div className="p-2 rounded-lg hover:bg-slate-800/60">📱 Viewport: Fluid Grid</div>
                <div className="p-2 rounded-lg hover:bg-slate-800/60">📦 5 Sections Generated</div>
              </div>
            </div>

            {/* Generated Canvas Simulation */}
            <div className="col-span-12 md:col-span-9 rounded-xl border border-slate-800 bg-[#0B0F19] overflow-hidden text-left">
              {/* Fake generated website header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2.5 bg-slate-900/60">
                <span className="font-serif font-bold text-white text-sm">L’Aura Bistro</span>
                <div className="hidden sm:flex gap-3 text-[11px] text-slate-400">
                  <span>Menu</span>
                  <span>Philosophy</span>
                  <span>Chef</span>
                  <span>Reservations</span>
                </div>
                <span className="text-[11px] bg-amber-500 text-black px-2.5 py-1 rounded font-bold">
                  Book Table
                </span>
              </div>

              {/* Fake hero inside preview */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
                <div className="max-w-md">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2 font-semibold">
                    ★ Michelin Guide 2026 Recommended
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-tight">
                    Culinary Artistry Meets Modern Elegance
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Immerse your senses in seasonal tasting courses, organic natural wines, and an unforgettable candlelit atmosphere.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartBuilding()}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow hover:bg-amber-400 transition"
                    >
                      Open Live Builder
                    </button>
                    <span className="text-[11px] text-slate-400">Generated in 1.4s by Just Wen AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-slate-800/80 bg-[#0F172A]/40 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
                250k+
              </div>
              <div className="text-xs text-slate-400 mt-1">Websites Generated</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-['Space_Grotesk']">
                1.8s
              </div>
              <div className="text-xs text-slate-400 mt-1">Average Synthesis Speed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
                99.9%
              </div>
              <div className="text-xs text-slate-400 mt-1">Global Edge Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-['Space_Grotesk']">
                4.9/5
              </div>
              <div className="text-xs text-slate-400 mt-1">Customer Praise Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI FEATURES SECTION (Section 10 Requirement) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
            Core AI Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mb-4">
            Everything You Need to Create Exceptional Websites
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Just Wen AI combines state-of-the-art language models with responsive layout heuristics to deliver polished, complete websites.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-[#0F172A] p-6 transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feat.color} text-white shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition">
                  {feat.title}
                </h3>
                <span className="text-xs font-semibold text-slate-400 block mb-2">{feat.subtitle}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TEMPLATE MARKETPLACE SHOWCASE */}
      <section className="border-t border-slate-800 bg-[#090D16] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 block">
                Production-Ready Templates
              </span>
              <h2 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                Start from a Curated Architectural Archetype
              </h2>
            </div>
            <button
              onClick={onExploreTemplates}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              <span>View All 12 Categories</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_TEMPLATES.slice(0, 3).map((tmpl) => (
              <div
                key={tmpl.id}
                className="group rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden transition-all hover:border-indigo-500/40 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={tmpl.previewImage}
                    alt={tmpl.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-slate-900/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-slate-700">
                      {tmpl.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1">{tmpl.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">{tmpl.description}</p>
                  <button
                    onClick={() => onStartBuilding(tmpl.websiteData.promptUsed)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-950 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mb-4">
              Turn Your Vision Into a Live Website Today
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-8">
              Join thousands of creators, founders, and developers launching professional websites with Just Wen AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onStartBuilding()}
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-lg hover:bg-slate-100 transition"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Start Building Free</span>
              </button>
              <button
                onClick={() => setCurrentScreen('pricing')}
                className="rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
              >
                View Plans & Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

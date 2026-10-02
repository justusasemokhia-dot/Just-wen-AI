import React, { useState } from 'react';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Screen } from '../types';

interface PricingScreenProps {
  onSelectPlan: (planName: string) => void;
  setCurrentScreen: (screen: Screen) => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  onSelectPlan,
  setCurrentScreen,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Free Starter',
      price: billingCycle === 'annual' ? '$0' : '$0',
      period: 'forever',
      description: 'Ideal for trying out the AI engine and building your first project.',
      badge: null,
      highlighted: false,
      features: [
        '5 AI Website Generations / mo',
        'Just Wen AI Free Subdomain (mysite.justwen.ai)',
        'Access to 10+ standard templates',
        'Visual section drag-and-drop editor',
        'Responsive mobile preview simulation',
        'Standard edge hosting CDN',
      ],
      ctaText: 'Get Started Free',
      ctaAction: () => onSelectPlan('Free Starter'),
    },
    {
      name: 'Pro Creator',
      price: billingCycle === 'annual' ? '$19' : '$25',
      period: 'month',
      description: 'Everything freelancers, creators, and founders need to publish professional sites.',
      badge: 'Most Popular',
      highlighted: true,
      features: [
        'Unlimited AI Website Generations',
        'Custom Domain Support (e.g. www.mybrand.com)',
        'Full Clean Code Export (HTML/CSS & JSON)',
        'Advanced Multi-turn "Edit with AI"',
        'Custom SEO & OpenGraph Social Meta',
        'Priority synthesis queue (< 1.5s build time)',
        'Automatic SSL & DDoS edge protection',
      ],
      ctaText: 'Start Pro Trial',
      ctaAction: () => onSelectPlan('Pro Creator'),
    },
    {
      name: 'Business & Agency',
      price: billingCycle === 'annual' ? '$49' : '$59',
      period: 'month',
      description: 'For teams, agencies, and high-volume brands requiring custom solutions.',
      badge: 'Enterprise Grade',
      highlighted: false,
      features: [
        'Unlimited AI Website Generations & Workspaces',
        'Unlimited Custom Domains & White-labeling',
        'Team Collaboration & Role Permissions',
        'AI Copywriting & Brand Voice Memory',
        'Deep Real-Time Analytics & Heatmaps',
        'Custom API & Webhook Integrations',
        '24/7 Dedicated Priority Technical Support',
      ],
      ctaText: 'Upgrade to Business',
      ctaAction: () => onSelectPlan('Business & Agency'),
    },
  ];

  const faqs = [
    {
      q: 'How does Just Wen AI build websites?',
      a: 'Just Wen AI uses advanced language models trained on modern web design principles to translate your natural language prompt into a complete semantic website layout with responsive styling.',
    },
    {
      q: 'Can I export and host the code anywhere?',
      a: 'Yes! On Pro and Business plans, you can export completely clean, standalone HTML/CSS code with one click and host it on GitHub Pages, Netlify, Vercel, or any web server with zero vendor lock-in.',
    },
    {
      q: 'Do I get free SSL certificates for custom domains?',
      a: 'Every custom domain connected to Just Wen AI automatically provisions a high-grade Wildcard Let’s Encrypt SSL certificate at no additional cost.',
    },
    {
      q: 'Can I switch or cancel my plan anytime?',
      a: 'Absolutely. You can upgrade, downgrade, or cancel your subscription at any time with one click from your account settings.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Transparent, Value-Focused Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] mb-4">
          Simple Pricing for Ambitious Creators
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Build for free. Upgrade when you need custom domains, code export, and unlimited AI iterations.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="mt-8 inline-flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              billingCycle === 'monthly'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              billingCycle === 'annual'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between border transition relative ${
              plan.highlighted
                ? 'border-indigo-500 bg-gradient-to-b from-[#13192C] to-[#0F172A] shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/40'
                : 'border-slate-800 bg-[#0F172A] hover:border-slate-700'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-lg">
                {plan.badge}
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-slate-400 min-h-[36px] mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk']">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-400">/{plan.period}</span>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-3 mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Plan Inclusions
                </span>
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={plan.ctaAction}
              className={`w-full py-3 rounded-xl text-xs font-bold transition shadow-lg flex items-center justify-center gap-1.5 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25'
                  : 'border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <span>{plan.ctaText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">Have questions about plans, billing, or exporting?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
              <h3 className="font-bold text-sm text-white mb-2">{faq.q}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

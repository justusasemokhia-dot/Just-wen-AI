import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Keyboard,
  MessageSquare,
  Search,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Screen } from '../types';

interface HelpCenterProps {
  setCurrentScreen: (screen: Screen) => void;
  onTryPrompt: (prompt: string) => void;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
  setCurrentScreen,
  onTryPrompt,
}) => {
  const [search, setSearch] = useState('');

  const guides = [
    {
      title: 'How to write high-converting AI website prompts',
      summary: 'Include your target industry, desired aesthetic (dark/light, minimal, bold), key sections, and primary call to action.',
      promptExample: 'Create a minimalist Scandinavian pottery studio website with warm sand background, ceramic collection gallery, workshop booking form, and customer testimonials.',
    },
    {
      title: 'Refining your site using "Edit with AI"',
      summary: 'Give specific single-goal instructions like "Switch primary accent to vibrant orange" or "Add a 3-column pricing section with monthly billing".',
      promptExample: 'Make the hero title larger and add a badge saying "Featured in Forbes 30 Under 30".',
    },
    {
      title: 'Setting up custom domains & SSL',
      summary: 'Point your registrar’s CNAME or A records to cname.justwen.ai. SSL verification runs automatically within 60 seconds.',
      promptExample: null,
    },
  ];

  const shortcuts = [
    { key: 'Cmd / Ctrl + K', action: 'Quick Command Palette' },
    { key: 'Cmd / Ctrl + S', action: 'Save current visual changes' },
    { key: 'Cmd / Ctrl + E', action: 'Open "Edit with AI" modal' },
    { key: 'Cmd / Ctrl + P', action: 'Toggle live website preview' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 mb-3">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Knowledge & Support Center</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk'] mb-2">
          How can we help you create today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Learn prompt engineering best practices, explore keyboard shortcuts, or get in touch.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
          <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Documentation</h3>
          <p className="text-xs text-slate-400 mb-4">
            Step-by-step guides for domain routing, styling rules, and code exports.
          </p>
          <button
            onClick={() => setCurrentScreen('builder')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Open Builder</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
          <div className="p-2.5 w-fit rounded-xl bg-purple-500/10 text-purple-400 mb-3 border border-purple-500/20">
            <Keyboard className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Shortcuts</h3>
          <div className="space-y-1.5 text-xs text-slate-300">
            {shortcuts.slice(0, 2).map((s, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-slate-400 text-[11px]">{s.action}</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-indigo-300 border border-slate-700">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
          <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Support Team</h3>
          <p className="text-xs text-slate-400 mb-4">
            Need custom architecture help? Our 24/7 specialist team responds in under 5 minutes.
          </p>
          <a
            href="mailto:support@justwen.ai"
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            support@justwen.ai
          </a>
        </div>
      </div>

      {/* Prompt Engineering Guide */}
      <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-4 font-['Space_Grotesk'] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span>Prompt Engineering Guides for Just Wen AI</span>
        </h2>

        <div className="space-y-4">
          {guides.map((g, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
              <h3 className="font-bold text-sm text-white mb-1">{g.title}</h3>
              <p className="text-xs text-slate-400 mb-2 leading-relaxed">{g.summary}</p>
              {g.promptExample && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs">
                  <span className="italic text-indigo-200 truncate">"{g.promptExample}"</span>
                  <button
                    onClick={() => onTryPrompt(g.promptExample!)}
                    className="shrink-0 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition"
                  >
                    Try in Builder
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

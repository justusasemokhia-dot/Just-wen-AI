import React from 'react';
import { Sparkles, CheckCircle2, Loader2, Code2, Globe, Laptop } from 'lucide-react';
import { AI_GENERATION_STEPS } from '../utils/aiGenerator';

interface GenerationModalProps {
  currentStepIndex: number;
  prompt: string;
}

export const GenerationModal: React.FC<GenerationModalProps> = ({
  currentStepIndex,
  prompt,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / AI_GENERATION_STEPS.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-[#0F172A] p-6 sm:p-8 shadow-2xl shadow-indigo-500/10">
        {/* Futuristic glowing backdrop */}
        <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        {/* Header with AI indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/30">
            <div className="h-full w-full rounded-[11px] bg-slate-900 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Just Wen AI Synthesis
              </h3>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">Architecting complete responsive experience...</p>
          </div>
        </div>

        {/* User Prompt Bubble */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Prompt Request
          </span>
          <p className="text-xs text-slate-200 italic line-clamp-2">
            "{prompt}"
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
            <span>Synthesis Progress</span>
            <span className="text-indigo-400 font-mono">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step-by-Step Checklist */}
        <div className="space-y-2.5">
          {AI_GENERATION_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all ${
                  isCurrent
                    ? 'bg-indigo-950/40 text-indigo-200 border border-indigo-500/30 font-semibold'
                    : isCompleted
                    ? 'text-slate-400'
                    : 'text-slate-600 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-indigo-400 animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span>
                  Step {idx + 1}: {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Micro-metrics footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Laptop className="h-3.5 w-3.5 text-indigo-400" />
            Adaptive Responsive Grid
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-purple-400" />
            Production Ready
          </span>
        </div>
      </div>
    </div>
  );
};

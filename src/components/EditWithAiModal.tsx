import React, { useState } from 'react';
import { Sparkles, X, Send, Wand2, ArrowRight } from 'lucide-react';

interface EditWithAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyInstruction: (instruction: string) => Promise<void>;
  isProcessing: boolean;
}

export const EditWithAiModal: React.FC<EditWithAiModalProps> = ({
  isOpen,
  onClose,
  onApplyInstruction,
  isProcessing,
}) => {
  const [instruction, setInstruction] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    'Change the colors to blue and white.',
    'Add a pricing section.',
    'Make the hero section larger.',
    'Add a contact form.',
    'Make the design more modern.',
    'Switch to luxury dark gold aesthetic.',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim() || isProcessing) return;
    await onApplyInstruction(instruction.trim());
    setInstruction('');
    onClose();
  };

  const handleQuickPromptClick = async (prompt: string) => {
    setInstruction(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0F172A] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Edit with AI</h3>
              <p className="text-xs text-slate-400">Describe any change to your website layout, style, or content</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="my-4">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Suggested Instructions
          </label>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickPromptClick(qp)}
                className="text-xs text-left px-2.5 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 text-slate-300 hover:border-indigo-500/50 hover:text-white hover:bg-indigo-950/30 transition"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              rows={3}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g. Change the primary button to neon emerald, add customer satisfaction metrics, and make typography serif..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-500 resize-none"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!instruction.trim() || isProcessing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition"
            >
              {isProcessing ? (
                <span>Synthesizing...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Update Website</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

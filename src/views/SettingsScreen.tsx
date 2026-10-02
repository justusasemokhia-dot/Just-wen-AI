import React, { useState } from 'react';
import {
  User,
  Shield,
  Key,
  Globe,
  Sliders,
  CheckCircle2,
  Download,
  Trash2,
  Cpu,
  Sparkles,
  CreditCard,
  LogOut,
  LogIn,
} from 'lucide-react';
import { UserProfile, Screen } from '../types';

interface SettingsScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  setCurrentScreen: (screen: Screen) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  onUpdateUser,
  setCurrentScreen,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [aiModel, setAiModel] = useState('gemini-3.8-flash');
  const [creativity, setCreativity] = useState('0.7');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
          Account & Engine Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your profile, AI synthesis configuration, and subscription plan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Details Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Personal Profile</h2>
              <p className="text-xs text-slate-400">Update your account credentials and contact email</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
              >
                {saved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />}
                <span>{saved ? 'Changes Saved' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Subscription & Quota Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Subscription & Plan</h2>
                <p className="text-xs text-slate-400">Current tier: <strong className="text-indigo-300">{user.plan}</strong></p>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('pricing')}
              className="px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/20 transition"
            >
              Upgrade Plan
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300">AI Synthesis Quota</span>
              <span className="text-indigo-400 font-mono">
                {user.aiGenerationsUsed ?? user.generationsUsed ?? 0} / {user.aiGenerationsLimit ?? user.maxGenerations ?? 100} generations used
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{
                  width: `${Math.min(100, (((user.aiGenerationsUsed ?? user.generationsUsed ?? 0) / (user.aiGenerationsLimit ?? user.maxGenerations ?? 100)) * 100))}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* AI Synthesis Engine Settings */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Engine Configuration</h2>
              <p className="text-xs text-slate-400">Control Gemini models, temperature, and synthesis strictness</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Language Model</label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="gemini-3.8-flash">Gemini 3.8 Flash (Recommended - Fastest)</option>
                <option value="gemini-3.5-pro">Gemini 3.5 Pro (Deepest Context)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Creativity & Temperature: {creativity}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={creativity}
                onChange={(e) => setCreativity(e.target.value)}
                className="w-full h-2 rounded bg-slate-800 accent-indigo-500 mt-2"
              />
            </div>
          </div>
        </div>

        {/* Session & Account Access */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Session & Incomer Access</h2>
              <p className="text-xs text-slate-400 mt-0.5">Switch accounts or test the dedicated New Incomer onboarding login screen</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentScreen('signup')}
                id="btn-settings-new-incomer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Open New Incomer Screen</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentScreen('login')}
                id="btn-settings-sign-out"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

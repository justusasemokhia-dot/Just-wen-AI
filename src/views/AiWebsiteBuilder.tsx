import React, { useState } from 'react';
import {
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Edit3,
  Share2,
  Globe,
  Download,
  RotateCcw,
  Wand2,
  FolderKanban,
  LayoutGrid,
  Settings,
  HelpCircle,
  Plus,
  Send,
  Layers,
  Image as ImageIcon,
  Layout,
  ExternalLink,
  ChevronRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import {
  WebsiteProject,
  DeviceViewport,
  Screen,
  AiChatMessage,
} from '../types';
import { WebsiteCanvas } from '../components/WebsiteCanvas';
import { POPULAR_PROMPTS } from '../utils/aiGenerator';

interface AiWebsiteBuilderProps {
  currentWebsite: WebsiteProject;
  viewport: DeviceViewport;
  setViewport: (vp: DeviceViewport) => void;
  setCurrentScreen: (screen: Screen) => void;
  onGenerateWebsite: (prompt: string) => void;
  onOpenEditWithAi: () => void;
  onOpenPublish: () => void;
  onOpenExport: () => void;
  chatHistory: AiChatMessage[];
  isGenerating: boolean;
}

export const AiWebsiteBuilder: React.FC<AiWebsiteBuilderProps> = ({
  currentWebsite,
  viewport,
  setViewport,
  setCurrentScreen,
  onGenerateWebsite,
  onOpenEditWithAi,
  onOpenPublish,
  onOpenExport,
  chatHistory,
  isGenerating,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [leftSidebarActive, setLeftSidebarActive] = useState<string>('new');
  const [copiedShare, setCopiedShare] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', screen: 'dashboard' as Screen, icon: Layout },
    { id: 'new', label: 'New Website', screen: 'builder' as Screen, icon: Plus, highlight: true },
    { id: 'my-websites', label: 'My Websites', screen: 'projects' as Screen, icon: FolderKanban },
    { id: 'templates', label: 'Templates', screen: 'templates' as Screen, icon: LayoutGrid },
    { id: 'components', label: 'Components', screen: 'editor' as Screen, icon: Layers },
    { id: 'assets', label: 'Assets', screen: 'editor' as Screen, icon: ImageIcon },
    { id: 'projects', label: 'Projects', screen: 'projects' as Screen, icon: FolderKanban },
    { id: 'settings', label: 'Settings', screen: 'settings' as Screen, icon: Settings },
    { id: 'help', label: 'Help', screen: 'help' as Screen, icon: HelpCircle },
  ];

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;
    onGenerateWebsite(promptInput.trim());
    setPromptInput('');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#070A11] text-slate-100">
      {/* 1. LEFT SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-slate-800 bg-[#0B0F19] p-3 justify-between">
        <div className="space-y-6">
          <div>
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </div>
            <div className="mt-2 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = leftSidebarActive === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setLeftSidebarActive(item.id);
                      if (item.screen !== 'builder') {
                        setCurrentScreen(item.screen);
                      }
                    }}
                    id={`sidebar-item-${item.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Active Website Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-left">
            <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
              Active Project
            </span>
            <h4 className="text-xs font-bold text-white truncate">{currentWebsite.name}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{currentWebsite.category} Archetype</p>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              <span>{currentWebsite.sections.length} Sections</span>
              <span className="text-emerald-400 font-semibold">{currentWebsite.published ? 'Live' : 'Draft'}</span>
            </div>
          </div>
        </div>

        {/* Bottom AI engine status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 mb-1 text-slate-300 font-medium">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Gemini Flash Engine</span>
          </div>
          <p className="text-[10px] leading-tight">Ready for multi-turn generative website changes.</p>
        </div>
      </aside>

      {/* 2. CENTER WORKSPACE (Canvas + Top Responsive Toolbar) */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#070A11]">
        {/* Top Responsive Control Toolbar (Requirement 6) */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-[#0B0F19] px-4 sm:px-6">
          {/* Left: Project title & status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white truncate max-w-[150px] sm:max-w-xs">
                {currentWebsite.name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentWebsite.published
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {currentWebsite.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>

          {/* Center: Device Viewport Toggle (Desktop, Tablet, Mobile) */}
          <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setViewport('desktop')}
              id="vp-btn-desktop"
              title="Desktop View"
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                viewport === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              id="vp-btn-tablet"
              title="Tablet View"
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                viewport === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              id="vp-btn-mobile"
              title="Mobile View"
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition ${
                viewport === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right Toolbar Actions: Edit, Preview, Share, Publish, Export */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCurrentScreen('editor')}
              id="toolbar-edit-btn"
              title="Open Visual Editor"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden md:inline">Edit</span>
            </button>

            <button
              onClick={() => setCurrentScreen('preview')}
              id="toolbar-preview-btn"
              title="Fullscreen Preview"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Preview</span>
            </button>

            <button
              onClick={handleShare}
              id="toolbar-share-btn"
              title="Share Link"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              {copiedShare ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-purple-400" />}
              <span className="hidden md:inline">{copiedShare ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onOpenExport}
              id="toolbar-export-btn"
              title="Export Code"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden md:inline">Export</span>
            </button>

            <button
              onClick={onOpenPublish}
              id="toolbar-publish-btn"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Publish</span>
            </button>
          </div>
        </div>

        {/* Website Preview Canvas Container */}
        <div className="flex-1 overflow-auto p-2 sm:p-6 flex items-start justify-center bg-[#070A11]">
          <WebsiteCanvas website={currentWebsite} viewport={viewport} />
        </div>
      </div>

      {/* 3. RIGHT AI PANEL (Requirements 4 & 6) */}
      <aside className="w-80 sm:w-96 shrink-0 flex flex-col border-l border-slate-800 bg-[#0B0F19] h-full">
        {/* AI Panel Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-['Space_Grotesk']">
                AI Website Assistant
              </h3>
              <p className="text-[11px] text-slate-400">Describe or refine your website</p>
            </div>
          </div>
          <button
            onClick={onOpenEditWithAi}
            id="panel-edit-with-ai-btn"
            title="Edit with AI"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold transition"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>Edit with AI</span>
          </button>
        </div>

        {/* Chat / Prompts History Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Initial Welcome message */}
          <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-3 text-xs leading-relaxed text-slate-300">
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>SITEGEN AI Assistant</span>
            </div>
            Tell me about your business or idea, and I'll generate a complete, responsive website with curated imagery, modern typography, and interactive components.
          </div>

          {/* Chat History Messages */}
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col text-xs rounded-xl p-3 ${
                msg.sender === 'user'
                  ? 'ml-6 bg-indigo-600/20 border border-indigo-500/30 text-indigo-100'
                  : 'mr-6 bg-slate-900 border border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider">
                  {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          ))}

          {/* Quick Example Prompt (from user requirements) */}
          <div className="rounded-xl border border-slate-800 bg-[#0F172A]/70 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Example Prompt
            </span>
            <p className="text-xs text-slate-300 italic mb-2.5">
              "Create a modern restaurant website with a dark theme, menu section, online booking, customer reviews, and contact information."
            </p>
            <button
              onClick={() => onGenerateWebsite('Create a modern restaurant website with a dark theme, menu section, online booking, customer reviews, and contact information.')}
              className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700 flex items-center justify-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>Apply Example Prompt</span>
            </button>
          </div>

          {/* Suggestions chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggested Actions
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => onOpenEditWithAi()}
                className="w-full text-left p-2 rounded-lg bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
              >
                <span>🎨 Change colors to blue & white</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onOpenEditWithAi()}
                className="w-full text-left p-2 rounded-lg bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
              >
                <span>💳 Add tiered pricing section</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </button>
              <button
                onClick={() => onOpenEditWithAi()}
                className="w-full text-left p-2 rounded-lg bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center justify-between transition"
              >
                <span>⭐ Expand customer testimonials</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Regenerate & Input Box */}
        <div className="border-t border-slate-800 p-3 bg-[#0B0F19] space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => onGenerateWebsite(currentWebsite.promptUsed || 'Modern professional landing page with responsive layout')}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
            >
              <RotateCcw className="h-3.5 w-3.5 text-indigo-400" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={onOpenEditWithAi}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold transition"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Edit with AI</span>
            </button>
          </div>

          {/* Chat Prompt Input Field */}
          <form onSubmit={handleGenerate} className="flex items-center gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Describe the website you want to create..."
              disabled={isGenerating}
              className="flex-1 bg-slate-900 px-3 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!promptInput.trim() || isGenerating}
              id="generate-website-btn"
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-50 transition shadow-md shadow-indigo-500/20"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};

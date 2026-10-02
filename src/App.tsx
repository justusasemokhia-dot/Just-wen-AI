import React, { useState, useEffect } from 'react';
import {
  WebsiteProject,
  DeviceViewport,
  Screen,
  AiChatMessage,
  UserProfile,
  TemplateItem,
} from './types';
import { INITIAL_TEMPLATES } from './data/templates';
import {
  createSynthesizedWebsite,
  applyAiInstructionToWebsite,
  AI_GENERATION_STEPS,
} from './utils/aiGenerator';
import { Navigation } from './components/Navigation';
import { MobileBottomNav } from './components/MobileBottomNav';
import { GenerationModal } from './components/GenerationModal';
import { EditWithAiModal } from './components/EditWithAiModal';
import { PublishModal } from './components/PublishModal';
import { ExportModal } from './components/ExportModal';
import { WebsiteCanvas } from './components/WebsiteCanvas';

// Views
import { LandingPage } from './views/LandingPage';
import { AiWebsiteBuilder } from './views/AiWebsiteBuilder';
import { VisualEditor } from './views/VisualEditor';
import { TemplateLibrary } from './views/TemplateLibrary';
import { ProjectsDashboard } from './views/ProjectsDashboard';
import { PricingScreen } from './views/PricingScreen';
import { AuthScreens } from './views/AuthScreens';
import { SettingsScreen } from './views/SettingsScreen';
import { HelpCenter } from './views/HelpCenter';
import { ArrowLeft, Monitor, Tablet, Smartphone, Globe, Download, Wand2, X, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  // Initial user state
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_01',
    name: 'Sarah Connor',
    email: 'sarah@justwen.ai',
    plan: 'Pro Creator',
    aiGenerationsUsed: 14,
    aiGenerationsLimit: 100,
    generationsUsed: 14,
    maxGenerations: 100,
  });

  // Website and Workspace State
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteProject>(
    INITIAL_TEMPLATES[0].websiteData
  );

  const [projects, setProjects] = useState<WebsiteProject[]>([
    INITIAL_TEMPLATES[0].websiteData,
    INITIAL_TEMPLATES[1].websiteData,
    INITIAL_TEMPLATES[2].websiteData,
  ]);

  const [viewport, setViewport] = useState<DeviceViewport>('desktop');

  // AI Assistant Chat History
  const [chatHistory, setChatHistory] = useState<AiChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello! I am your Just Wen AI Architect. Describe your dream website or choose a template to begin.',
      timestamp: 'Just now',
    },
  ]);

  // Generation Modal State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStepIndex, setGenerationStepIndex] = useState(0);
  const [generationPrompt, setGenerationPrompt] = useState('');

  // Secondary Modals
  const [isEditWithAiOpen, setIsEditWithAiOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isProcessingEdit, setIsProcessingEdit] = useState(false);
  const [incomerNotification, setIncomerNotification] = useState<string | null>(null);

  // Trigger full AI Generation flow
  const handleGenerateWebsite = async (prompt: string) => {
    setGenerationPrompt(prompt);
    setIsGenerating(true);
    setGenerationStepIndex(0);

    // Add user message to assistant chat
    setChatHistory((prev) => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        sender: 'user',
        text: prompt,
        timestamp: 'Just now',
      },
    ]);

    // Animate generation steps sequentially
    const stepInterval = setInterval(() => {
      setGenerationStepIndex((prev) => {
        if (prev < AI_GENERATION_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      // Call server-side Gemini generation endpoint
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      let generatedSite: WebsiteProject;

      if (res.ok) {
        const data = await res.json();
        if (data.website && !data.useFallback) {
          const w = data.website;
          generatedSite = {
            id: `site_${Date.now()}`,
            name: w.name || 'AI Generated Project',
            slug: (w.name || 'site').toLowerCase().replace(/[^a-z0-9]/g, '-'),
            category: w.category || 'General',
            subdomain: `${(w.name || 'site').toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString().slice(-4)}.justwen.ai`,
            published: false,
            lastEdited: 'Just now',
            views: 0,
            createdAt: 'Today',
            thumbnailUrl: w.sections?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
            promptUsed: prompt,
            theme: {
              primaryColor: w.theme?.primaryColor || '#4F46E5',
              secondaryColor: w.theme?.secondaryColor || '#10B981',
              accentColor: w.theme?.accentColor || '#EC4899',
              backgroundColor: w.theme?.backgroundColor || '#0B0F19',
              cardBackground: w.theme?.cardBackground || '#13192B',
              textColor: w.theme?.textColor || '#E2E8F0',
              headingColor: w.theme?.headingColor || '#FFFFFF',
              fontFamily: w.theme?.fontFamily || 'sans',
              borderRadius: w.theme?.borderRadius || 'lg',
              mode: w.theme?.mode || 'dark',
            },
            header: w.header || {
              logoText: w.name || 'Brand',
              links: [{ id: '1', label: 'Home', href: '#' }],
              ctaText: 'Get Started',
              ctaHref: '#contact',
            },
            sections: w.sections || [],
            footer: w.footer || {
              copyright: `© ${new Date().getFullYear()} ${w.name}`,
              description: 'Generated with Just Wen AI',
              columns: [],
              socialLinks: [],
            },
            seo: w.seo || {
              title: w.name,
              description: prompt,
              keywords: ['ai website', 'modern web'],
              favicon: '🌐',
            },
          };
        } else {
          // Robust semantic synthesizer fallback
          generatedSite = createSynthesizedWebsite(prompt);
        }
      } else {
        generatedSite = createSynthesizedWebsite(prompt);
      }

      // Finish steps
      setTimeout(() => {
        clearInterval(stepInterval);
        setCurrentWebsite(generatedSite);
        setProjects((prev) => [generatedSite, ...prev.filter((p) => p.id !== generatedSite.id)]);
        setIsGenerating(false);
        setCurrentScreen('builder');

        // Add assistant reply message
        setChatHistory((prev) => [
          ...prev,
          {
            id: `msg_ai_${Date.now()}`,
            sender: 'assistant',
            text: `Generated "${generatedSite.name}" with ${generatedSite.sections.length} responsive sections tailored to: "${prompt}". You can now edit in Visual Studio, customize colors, or publish directly!`,
            timestamp: 'Just now',
          },
        ]);

        // Increment user generation count
        setUser((prev) => ({
          ...prev,
          aiGenerationsUsed: (prev.aiGenerationsUsed || 0) + 1,
          generationsUsed: (prev.generationsUsed || 0) + 1,
        }));
      }, 1800);
    } catch (err) {
      clearInterval(stepInterval);
      const fallbackSite = createSynthesizedWebsite(prompt);
      setCurrentWebsite(fallbackSite);
      setProjects((prev) => [fallbackSite, ...prev]);
      setIsGenerating(false);
      setCurrentScreen('builder');
    }
  };

  // Trigger "Edit with AI" instruction
  const handleApplyAiInstruction = async (instruction: string) => {
    setIsProcessingEdit(true);

    try {
      const res = await fetch('/api/ai/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentWebsite, instruction }),
      });

      let updatedSite: WebsiteProject;

      if (res.ok) {
        const data = await res.json();
        if (data.updatedWebsite && !data.useFallback) {
          updatedSite = {
            ...currentWebsite,
            ...data.updatedWebsite,
            lastEdited: 'Just now',
          };
        } else {
          updatedSite = applyAiInstructionToWebsite(currentWebsite, instruction).updatedWebsite;
        }
      } else {
        updatedSite = applyAiInstructionToWebsite(currentWebsite, instruction).updatedWebsite;
      }

      setCurrentWebsite(updatedSite);
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedSite.id ? updatedSite : p))
      );

      // Add to chat history
      setChatHistory((prev) => [
        ...prev,
        {
          id: `msg_u_${Date.now()}`,
          sender: 'user',
          text: `[Edit with AI]: ${instruction}`,
          timestamp: 'Just now',
        },
        {
          id: `msg_a_${Date.now()}`,
          sender: 'assistant',
          text: `Applied: "${instruction}" to ${updatedSite.name}. Updated layout & styling accordingly.`,
          timestamp: 'Just now',
        },
      ]);
    } catch (err) {
      const localResult = applyAiInstructionToWebsite(currentWebsite, instruction);
      setCurrentWebsite(localResult.updatedWebsite);
    } finally {
      setIsProcessingEdit(false);
    }
  };

  // Template selection
  const handleSelectTemplate = (template: TemplateItem) => {
    setCurrentWebsite(template.websiteData);
    setProjects((prev) => {
      if (prev.some((p) => p.id === template.websiteData.id)) return prev;
      return [template.websiteData, ...prev];
    });
    setCurrentScreen('builder');
  };

  // Duplicate project
  const handleDuplicateProject = (proj: WebsiteProject) => {
    const copy: WebsiteProject = {
      ...proj,
      id: `copy_${Date.now()}`,
      name: `${proj.name} (Copy)`,
      subdomain: `copy-${proj.subdomain}`,
      published: false,
      lastEdited: 'Just now',
    };
    setProjects((prev) => [copy, ...prev]);
  };

  // Delete project
  const handleDeleteProject = (projId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projId));
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] antialiased">
      {/* Global Header Navigation */}
      <Navigation
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        user={user}
        onNewWebsite={() => {
          setCurrentScreen('builder');
        }}
      />

      {/* New Incomer Welcome Banner */}
      {incomerNotification && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-slate-900 border-b border-indigo-500/30 px-4 py-2.5 text-xs text-indigo-200 flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-2.5 max-w-5xl mx-auto w-full">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
            <span className="font-medium">{incomerNotification}</span>
          </div>
          <button
            onClick={() => setIncomerNotification(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition"
            title="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Screen Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentScreen === 'landing' && (
          <LandingPage
            onStartBuilding={(prompt) => {
              if (prompt) {
                handleGenerateWebsite(prompt);
              } else {
                setCurrentScreen('builder');
              }
            }}
            onExploreTemplates={() => setCurrentScreen('templates')}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'builder' && (
          <AiWebsiteBuilder
            currentWebsite={currentWebsite}
            viewport={viewport}
            setViewport={setViewport}
            setCurrentScreen={setCurrentScreen}
            onGenerateWebsite={handleGenerateWebsite}
            onOpenEditWithAi={() => setIsEditWithAiOpen(true)}
            onOpenPublish={() => setIsPublishOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            chatHistory={chatHistory}
            isGenerating={isGenerating}
          />
        )}

        {currentScreen === 'editor' && (
          <VisualEditor
            website={currentWebsite}
            onUpdateWebsite={(upd) => {
              setCurrentWebsite(upd);
              setProjects((prev) => prev.map((p) => (p.id === upd.id ? upd : p)));
            }}
            setCurrentScreen={setCurrentScreen}
            onOpenEditWithAi={() => setIsEditWithAiOpen(true)}
          />
        )}

        {currentScreen === 'templates' && (
          <TemplateLibrary
            onSelectTemplate={handleSelectTemplate}
            setCurrentScreen={setCurrentScreen}
            onPreviewTemplate={(tmpl) => {
              setCurrentWebsite(tmpl.websiteData);
              setCurrentScreen('preview');
            }}
          />
        )}

        {currentScreen === 'projects' && (
          <ProjectsDashboard
            projects={projects}
            onSelectProject={(proj) => {
              setCurrentWebsite(proj);
              setCurrentScreen('builder');
            }}
            onEditProject={(proj) => {
              setCurrentWebsite(proj);
              setCurrentScreen('editor');
            }}
            onPreviewProject={(proj) => {
              setCurrentWebsite(proj);
              setCurrentScreen('preview');
            }}
            onPublishProject={(proj) => {
              setCurrentWebsite(proj);
              setIsPublishOpen(true);
            }}
            onDuplicateProject={handleDuplicateProject}
            onDeleteProject={handleDeleteProject}
            onExportProject={(proj) => {
              setCurrentWebsite(proj);
              setIsExportOpen(true);
            }}
            onCreateNewWebsite={() => setCurrentScreen('builder')}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'pricing' && (
          <PricingScreen
            onSelectPlan={(plan) => {
              setUser((prev) => ({ ...prev, plan }));
              alert(`Subscribed to ${plan}! Your limits have been upgraded.`);
            }}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {(currentScreen === 'login' || currentScreen === 'signup') && (
          <AuthScreens
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            initialMode={currentScreen === 'login' ? 'returning' : 'incomer'}
            onLoginSuccess={(loggedUser, starterIntent) => {
              setUser(loggedUser);
              if (starterIntent) {
                const matchingTemplate = INITIAL_TEMPLATES.find(
                  (t) =>
                    t.category.toLowerCase().includes(starterIntent.toLowerCase()) ||
                    t.id.toLowerCase().includes(starterIntent.toLowerCase())
                );
                if (matchingTemplate) {
                  setCurrentWebsite(matchingTemplate.websiteData);
                }
                setIncomerNotification(
                  `🎉 Welcome newcomer ${loggedUser.name}! Your free workspace is active with 10 AI credits and ${starterIntent} presets ready.`
                );
              } else {
                setIncomerNotification(
                  `👋 Welcome back, ${loggedUser.name}! Your workspace is synced.`
                );
              }
            }}
          />
        )}

        {(currentScreen === 'settings' || currentScreen === 'account') && (
          <SettingsScreen
            user={user}
            onUpdateUser={(upd) => setUser(upd)}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'help' && (
          <HelpCenter
            setCurrentScreen={setCurrentScreen}
            onTryPrompt={(prompt) => {
              handleGenerateWebsite(prompt);
            }}
          />
        )}

        {/* Fullscreen Preview Mode */}
        {currentScreen === 'preview' && (
          <div className="fixed inset-0 z-50 flex flex-col bg-[#0B0F19]">
            {/* Top Toolbar */}
            <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-[#0F172A] px-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentScreen('builder')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Exit Preview</span>
                </button>
                <span className="font-bold text-sm text-white hidden sm:inline">
                  {currentWebsite.name}
                </span>
              </div>

              {/* Viewport switcher */}
              <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5 inline mr-1" />
                  Desktop
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5 inline mr-1" />
                  Tablet
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5 inline mr-1" />
                  Mobile
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditWithAiOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit with AI</span>
                </button>
                <button
                  onClick={() => setIsPublishOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Publish</span>
                </button>
              </div>
            </div>

            {/* Canvas body */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center bg-[#070A11]">
              <WebsiteCanvas website={currentWebsite} viewport={viewport} />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation (for quick thumb access) */}
      <MobileBottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

      {/* Modals */}
      {isGenerating && (
        <GenerationModal
          currentStepIndex={generationStepIndex}
          prompt={generationPrompt}
        />
      )}

      <EditWithAiModal
        isOpen={isEditWithAiOpen}
        onClose={() => setIsEditWithAiOpen(false)}
        onApplyInstruction={handleApplyAiInstruction}
        isProcessing={isProcessingEdit}
      />

      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        website={currentWebsite}
        onConfirmPublish={(updated) => {
          setCurrentWebsite(updated);
          setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        }}
        onViewLive={() => setCurrentScreen('preview')}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        website={currentWebsite}
      />
    </div>
  );
}

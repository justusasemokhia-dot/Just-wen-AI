import React, { useState } from 'react';
import {
  Layers,
  Palette,
  Type,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Eye,
  CornerDownRight,
  Move,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import {
  WebsiteProject,
  WebsiteSection,
  SectionType,
  DeviceViewport,
  Screen,
} from '../types';
import { WebsiteCanvas } from '../components/WebsiteCanvas';

interface VisualEditorProps {
  website: WebsiteProject;
  onUpdateWebsite: (updated: WebsiteProject) => void;
  setCurrentScreen: (screen: Screen) => void;
  onOpenEditWithAi: () => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({
  website,
  onUpdateWebsite,
  setCurrentScreen,
  onOpenEditWithAi,
}) => {
  const [viewport, setViewport] = useState<DeviceViewport>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    website.sections[0]?.id || ''
  );
  const [inspectorTab, setInspectorTab] = useState<'content' | 'style' | 'sections'>('content');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const selectedSection = website.sections.find((s) => s.id === selectedSectionId);

  // Reorder sections
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...website.sections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    onUpdateWebsite({ ...website, sections: newSections });
  };

  // Delete section
  const deleteSection = (id: string) => {
    if (website.sections.length <= 1) return;
    const newSections = website.sections.filter((s) => s.id !== id);
    onUpdateWebsite({ ...website, sections: newSections });
    if (selectedSectionId === id) {
      setSelectedSectionId(newSections[0]?.id || '');
    }
  };

  // Add new section
  const handleAddSection = (type: SectionType) => {
    const newSec: WebsiteSection = {
      id: `sec_${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      subtitle: 'Customize this section headline and content in the inspector panel.',
      badge: 'New Section',
      align: 'center',
      items: [
        {
          id: `item_1`,
          title: 'Featured Item',
          description: 'High-impact value proposition description.',
          badge: 'Popular',
          price: '$49',
        },
        {
          id: `item_2`,
          title: 'Secondary Feature',
          description: 'Optimized workflow and scalable architecture.',
          badge: 'Fast',
          price: '$99',
        },
      ],
    };

    const newSections = [...website.sections, newSec];
    onUpdateWebsite({ ...website, sections: newSections });
    setSelectedSectionId(newSec.id);
  };

  // Update selected section fields
  const handleUpdateSelectedSection = (fields: Partial<WebsiteSection>) => {
    if (!selectedSectionId) return;
    const newSections = website.sections.map((s) =>
      s.id === selectedSectionId ? { ...s, ...fields } : s
    );
    onUpdateWebsite({ ...website, sections: newSections });
  };

  // Update theme settings
  const handleUpdateTheme = (themeFields: Partial<WebsiteProject['theme']>) => {
    onUpdateWebsite({
      ...website,
      theme: { ...website.theme, ...themeFields },
    });
  };

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#070A11] text-slate-100">
      {/* Top Bar for Visual Editor */}
      <div className="absolute top-16 left-0 right-0 z-20 flex h-13 items-center justify-between border-b border-slate-800 bg-[#0B0F19] px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('builder')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Builder</span>
          </button>
          <span className="text-xs font-bold text-white hidden sm:inline-block">
            Visual Studio: <span className="text-indigo-400">{website.name}</span>
          </span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
              viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="h-3 w-3" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
              viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="h-3 w-3" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
              viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3 w-3" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenEditWithAi}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Transform</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition"
          >
            {savedFeedback ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : null}
            <span>{savedFeedback ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport (Center) */}
      <div className="flex-1 overflow-auto pt-14 pb-8 px-4 flex items-start justify-center bg-[#070A11]">
        <div className="w-full max-w-5xl my-4">
          <WebsiteCanvas
            website={website}
            viewport={viewport}
            isEditorMode={true}
            selectedSectionId={selectedSectionId}
            onSelectSection={(secId) => setSelectedSectionId(secId)}
          />
        </div>
      </div>

      {/* Left/Right Inspector Drawer */}
      <aside className="w-80 sm:w-96 shrink-0 border-l border-slate-800 bg-[#0B0F19] pt-14 flex flex-col h-full z-10">
        {/* Inspector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 p-1">
          <button
            onClick={() => setInspectorTab('content')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center gap-1.5 ${
              inspectorTab === 'content' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Type className="h-3.5 w-3.5" />
            <span>Content</span>
          </button>
          <button
            onClick={() => setInspectorTab('style')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center gap-1.5 ${
              inspectorTab === 'style' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Styles</span>
          </button>
          <button
            onClick={() => setInspectorTab('sections')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition flex items-center justify-center gap-1.5 ${
              inspectorTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Sections ({website.sections.length})</span>
          </button>
        </div>

        {/* Tab 1: Section Content Inspector */}
        {inspectorTab === 'content' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedSection ? (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {selectedSection.type} Properties
                  </span>
                  <span className="text-[10px] bg-slate-800 text-indigo-400 px-2 py-0.5 rounded font-mono">
                    #{selectedSection.id}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge / Tag</label>
                  <input
                    type="text"
                    value={selectedSection.badge || ''}
                    onChange={(e) => handleUpdateSelectedSection({ badge: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Headline Title</label>
                  <input
                    type="text"
                    value={selectedSection.title}
                    onChange={(e) => handleUpdateSelectedSection({ title: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={selectedSection.subtitle || ''}
                    onChange={(e) => handleUpdateSelectedSection({ subtitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {selectedSection.imageUrl && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={selectedSection.imageUrl}
                      onChange={(e) => handleUpdateSelectedSection({ imageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                )}

                {/* Primary CTA */}
                {selectedSection.primaryCta && (
                  <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">Primary Action Button</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={selectedSection.primaryCta.label}
                        onChange={(e) =>
                          handleUpdateSelectedSection({
                            primaryCta: { ...selectedSection.primaryCta!, label: e.target.value },
                          })
                        }
                        placeholder="Label"
                        className="px-2.5 py-1 rounded border border-slate-700 bg-slate-950 text-xs text-slate-100"
                      />
                      <input
                        type="text"
                        value={selectedSection.primaryCta.href}
                        onChange={(e) =>
                          handleUpdateSelectedSection({
                            primaryCta: { ...selectedSection.primaryCta!, href: e.target.value },
                          })
                        }
                        placeholder="URL link"
                        className="px-2.5 py-1 rounded border border-slate-700 bg-slate-950 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                )}

                {/* Alignment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Text Alignment</label>
                  <div className="flex gap-2">
                    {(['left', 'center', 'right'] as const).map((al) => (
                      <button
                        key={al}
                        onClick={() => handleUpdateSelectedSection({ align: al })}
                        className={`flex-1 py-1 text-xs rounded border capitalize ${
                          selectedSection.align === al
                            ? 'border-indigo-500 bg-indigo-600 text-white font-bold'
                            : 'border-slate-700 bg-slate-800 text-slate-300'
                        }`}
                      >
                        {al}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">
                Click any section on the canvas to inspect and edit its content.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Global Design & Styles Inspector */}
        {inspectorTab === 'style' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Color Palette
              </span>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Primary Accent</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={website.theme.primaryColor}
                      onChange={(e) => handleUpdateTheme({ primaryColor: e.target.value })}
                      className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-400">{website.theme.primaryColor}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Canvas Background</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={website.theme.backgroundColor}
                      onChange={(e) => handleUpdateTheme({ backgroundColor: e.target.value })}
                      className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-400">{website.theme.backgroundColor}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Card Surface</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={website.theme.cardBackground}
                      onChange={(e) => handleUpdateTheme({ cardBackground: e.target.value })}
                      className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-xs font-mono text-slate-400">{website.theme.cardBackground}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Typography
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateTheme({ fontFamily: 'sans' })}
                  className={`flex-1 py-2 text-xs rounded-lg border ${
                    website.theme.fontFamily === 'sans'
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 font-bold'
                      : 'border-slate-700 bg-slate-800 text-slate-400'
                  }`}
                >
                  Plus Jakarta (Modern)
                </button>
                <button
                  onClick={() => handleUpdateTheme({ fontFamily: 'serif' })}
                  className={`flex-1 py-2 text-xs rounded-lg border font-serif ${
                    website.theme.fontFamily === 'serif'
                      ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 font-bold'
                      : 'border-slate-700 bg-slate-800 text-slate-400'
                  }`}
                >
                  Playfair (Editorial)
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Border Radius & Corners
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['none', 'sm', 'lg', 'full'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleUpdateTheme({ borderRadius: r })}
                    className={`py-1.5 text-xs rounded-lg border capitalize ${
                      website.theme.borderRadius === r
                        ? 'border-indigo-500 bg-indigo-600 text-white font-bold'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Reorder & Add Sections */}
        {inspectorTab === 'sections' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Section Tree
            </span>
            <div className="space-y-2">
              {website.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedSectionId(sec.id);
                    setInspectorTab('content');
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    selectedSectionId === sec.id
                      ? 'border-indigo-500 bg-indigo-600/15 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="font-semibold capitalize">{sec.type}</span>
                    <span className="text-slate-400 block text-[10px] truncate">{sec.title}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, 'up');
                      }}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, 'down');
                      }}
                      disabled={idx === website.sections.length - 1}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(sec.id);
                      }}
                      className="p-1 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* + Add Section Choices */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                + Insert New Section
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['pricing', 'features', 'testimonials', 'gallery', 'menu', 'contact'] as SectionType[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleAddSection(st)}
                      className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-700 bg-slate-850 hover:bg-indigo-600 hover:text-white text-slate-300 text-left capitalize transition"
                    >
                      <Plus className="h-3 w-3 text-indigo-400" />
                      <span>{st}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

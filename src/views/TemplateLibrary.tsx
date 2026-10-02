import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Eye,
  ExternalLink,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { TemplateItem, WebsiteProject, Screen } from '../types';
import { INITIAL_TEMPLATES } from '../data/templates';

interface TemplateLibraryProps {
  onSelectTemplate: (template: TemplateItem) => void;
  setCurrentScreen: (screen: Screen) => void;
  onPreviewTemplate: (template: TemplateItem) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  onSelectTemplate,
  setCurrentScreen,
  onPreviewTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Restaurant',
    'Technology',
    'Agency',
    'Business',
    'Portfolio',
    'E-commerce',
    'Education',
    'Finance',
    'Church',
    'Blog',
    'Landing Pages',
  ];

  const filteredTemplates = INITIAL_TEMPLATES.filter((tmpl) => {
    const matchesCat =
      selectedCategory === 'All' || tmpl.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Architect-Engineered Archetypes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
          Professional Template Library
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Jumpstart your website with industry-specific design foundations. Fully customizable with AI and our visual editor.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates (e.g., restaurant, SaaS, agency)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden flex flex-col justify-between transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div>
              {/* Thumbnail preview */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-slate-900/90 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white border border-slate-700">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1.5">{template.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="capitalize text-indigo-300 font-medium">
                    {template.websiteData.theme.mode} theme
                  </span>
                  <span>•</span>
                  <span>{template.websiteData.sections.length} pre-built sections</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => onPreviewTemplate(template)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition flex items-center justify-center gap-1.5"
              >
                <Eye className="h-3.5 w-3.5 text-indigo-400" />
                <span>Quick Preview</span>
              </button>
              <button
                onClick={() => onSelectTemplate(template)}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5"
              >
                <span>Use Template</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

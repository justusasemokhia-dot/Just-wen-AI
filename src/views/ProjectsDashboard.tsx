import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Globe,
  Edit3,
  Eye,
  MoreVertical,
  Copy,
  Trash2,
  Download,
  ExternalLink,
  Sparkles,
  BarChart3,
  Search,
} from 'lucide-react';
import { WebsiteProject, Screen } from '../types';

interface ProjectsDashboardProps {
  projects: WebsiteProject[];
  onSelectProject: (project: WebsiteProject) => void;
  onEditProject: (project: WebsiteProject) => void;
  onPreviewProject: (project: WebsiteProject) => void;
  onPublishProject: (project: WebsiteProject) => void;
  onDuplicateProject: (project: WebsiteProject) => void;
  onDeleteProject: (projectId: string) => void;
  onExportProject: (project: WebsiteProject) => void;
  onCreateNewWebsite: () => void;
  setCurrentScreen: (screen: Screen) => void;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  projects,
  onSelectProject,
  onEditProject,
  onPreviewProject,
  onPublishProject,
  onDuplicateProject,
  onDeleteProject,
  onExportProject,
  onCreateNewWebsite,
  setCurrentScreen,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
            My Websites
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage, publish, and monitor your AI-generated websites.
          </p>
        </div>

        <button
          onClick={onCreateNewWebsite}
          id="dashboard-create-new-btn"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition"
        >
          <Plus className="h-4 w-4" />
          <span>+ Create New Website</span>
        </button>
      </div>

      {/* Analytics Overview strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4">
          <span className="text-xs text-slate-400">Total Projects</span>
          <div className="text-2xl font-extrabold text-white mt-1 font-['Space_Grotesk']">
            {projects.length}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4">
          <span className="text-xs text-slate-400">Published Sites</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-['Space_Grotesk']">
            {projects.filter((p) => p.published).length}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4">
          <span className="text-xs text-slate-400">Edge Bandwidth</span>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1 font-['Space_Grotesk']">
            1.2 GB / 50 GB
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-4">
          <span className="text-xs text-slate-400">Global SSL Status</span>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-['Space_Grotesk']">
            100% Active
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden flex flex-col justify-between transition hover:border-indigo-500/40"
          >
            <div>
              {/* Thumbnail representation */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative h-44 cursor-pointer overflow-hidden border-b border-slate-800"
                style={{ backgroundColor: project.theme.backgroundColor }}
              >
                {/* Mini preview thumbnail mockup */}
                <div className="p-4 scale-90 origin-top opacity-90 transition group-hover:scale-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700/40">
                    <span className="font-bold text-xs" style={{ color: project.theme.headingColor }}>
                      {project.header.logoText}
                    </span>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: project.theme.primaryColor }}
                    >
                      {project.header.ctaText}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-extrabold line-clamp-1" style={{ color: project.theme.headingColor }}>
                      {project.sections[0]?.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                      {project.sections[0]?.subtitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      project.published
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-900/80 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {project.published ? 'Live Online' : 'Draft'}
                  </span>
                </div>

                {/* Dropdown Menu Trigger */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === project.id ? null : project.id);
                    }}
                    className="p-1 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Dropdown menu */}
                  {activeMenuId === project.id && (
                    <div className="absolute right-0 mt-1 w-36 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-xl z-30 text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateProject(project);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 text-left"
                      >
                        <Copy className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Duplicate</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onExportProject(project);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 text-left"
                      >
                        <Download className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Export Code</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 text-left"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-sm truncate">{project.name}</h3>
                  <span className="text-[10px] text-slate-400">{project.lastEdited}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {project.customDomain || project.subdomain}
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center gap-1.5">
              <button
                onClick={() => onEditProject(project)}
                className="flex-1 py-1.5 px-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition flex items-center justify-center gap-1"
              >
                <Edit3 className="h-3 w-3 text-indigo-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onPreviewProject(project)}
                className="flex-1 py-1.5 px-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition flex items-center justify-center gap-1"
              >
                <Eye className="h-3 w-3 text-cyan-400" />
                <span>Preview</span>
              </button>

              <button
                onClick={() => onPublishProject(project)}
                className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-sm transition flex items-center justify-center gap-1"
              >
                <Globe className="h-3 w-3" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        ))}

        {/* Create New Website Ghost Card */}
        <button
          onClick={onCreateNewWebsite}
          className="rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-[#0F172A]/30 p-8 flex flex-col items-center justify-center text-center transition group min-h-[260px]"
        >
          <div className="h-12 w-12 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center mb-3 transition">
            <Plus className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Create New Website</h4>
          <p className="text-xs text-slate-400 max-w-[200px]">
            Generate a full responsive site using natural language.
          </p>
        </button>
      </div>
    </div>
  );
};

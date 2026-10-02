import React, { useState } from 'react';
import { Code2, Copy, Download, X, CheckCircle2 } from 'lucide-react';
import { WebsiteProject } from '../types';
import { exportWebsiteAsHtml } from '../utils/aiGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  website: WebsiteProject;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  website,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'html' | 'json'>('html');

  if (!isOpen) return null;

  const htmlCode = exportWebsiteAsHtml(website);
  const jsonCode = JSON.stringify(website, null, 2);
  const currentCode = exportFormat === 'html' ? htmlCode : jsonCode;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${website.slug || 'website'}.${exportFormat}`;
    const blob = new Blob([currentCode], {
      type: exportFormat === 'html' ? 'text/html' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0F172A] p-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Export Clean Code</h3>
              <p className="text-xs text-slate-400">Zero dependencies, production-ready responsive markup</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Format Selector & Actions Bar */}
        <div className="flex items-center justify-between my-3 gap-2">
          <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
            <button
              onClick={() => setExportFormat('html')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                exportFormat === 'html' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Standalone HTML/CSS
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                exportFormat === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Schema JSON
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-indigo-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code View Canvas */}
        <div className="flex-1 overflow-auto rounded-xl border border-slate-800 bg-[#0B0F19] p-4 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre-wrap">{currentCode}</pre>
        </div>
      </div>
    </div>
  );
};

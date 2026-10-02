import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { WebsiteProject, SeoSettings } from '../types';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  website: WebsiteProject;
  onConfirmPublish: (updatedWebsite: WebsiteProject) => void;
  onViewLive: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  website,
  onConfirmPublish,
  onViewLive,
}) => {
  const [subdomain, setSubdomain] = useState(
    website.subdomain.replace('.justwen.ai', '').replace('.sitegen.ai', '')
  );
  const [customDomain, setCustomDomain] = useState(website.customDomain || '');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(website.published);
  const [copied, setCopied] = useState(false);

  // SEO State
  const [seoTitle, setSeoTitle] = useState(website.seo.title || website.name);
  const [seoDesc, setSeoDesc] = useState(website.seo.description || '');
  const [activeTab, setActiveTab] = useState<'domain' | 'seo'>('domain');

  if (!isOpen) return null;

  const liveUrl = customDomain ? `https://${customDomain}` : `https://${subdomain}.justwen.ai`;

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const updated: WebsiteProject = {
        ...website,
        subdomain: `${subdomain}.justwen.ai`,
        customDomain: customDomain || undefined,
        published: true,
        publishedUrl: liveUrl,
        lastEdited: 'Just now',
        seo: {
          ...website.seo,
          title: seoTitle,
          description: seoDesc,
        },
      };
      onConfirmPublish(updated);
      setIsPublishing(false);
      setIsPublishedSuccess(true);
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0F172A] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Publish Website</h3>
              <p className="text-xs text-slate-400">Deploy to high-speed global edge network with SSL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Successful Publishing State */}
        {isPublishedSuccess ? (
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-extrabold text-white mb-1 font-['Space_Grotesk']">
              Your website is live!
            </h4>
            <p className="text-xs text-slate-400 mb-6">
              Accessible globally with automatic HTTPS, Brotli compression, and zero cold starts.
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-700 bg-slate-900/90 mb-6 text-left">
              <div className="truncate mr-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Live Endpoint</span>
                <span className="text-sm font-semibold text-indigo-400 font-mono">{liveUrl}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition shrink-0"
              >
                <Copy className="h-3.5 w-3.5 text-indigo-400" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onViewLive();
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition"
              >
                <span>Visit Website</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 space-y-5">
            {/* Tabs for Domain vs SEO */}
            <div className="flex rounded-lg bg-slate-900/80 p-1 border border-slate-800">
              <button
                onClick={() => setActiveTab('domain')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                  activeTab === 'domain'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Domain & Hosting
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
                  activeTab === 'seo'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SEO & Social Meta
              </button>
            </div>

            {activeTab === 'domain' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Free Subdomain
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 overflow-hidden focus-within:border-indigo-500">
                    <span className="px-3 text-xs text-slate-400 bg-slate-800/80 border-r border-slate-700 py-2.5">
                      https://
                    </span>
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-100 focus:outline-none font-mono"
                      placeholder="mysite"
                    />
                    <span className="px-3 text-xs text-slate-400 bg-slate-800/80 border-l border-slate-700 py-2.5">
                      .justwen.ai
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Custom Domain (Optional)
                    </label>
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                      Pro Feature
                    </span>
                  </div>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="e.g. www.mybrand.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Point your CNAME record to <code className="text-indigo-300">cname.justwen.ai</code>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Includes automatic Let’s Encrypt Wildcard SSL, HTTP/3 QUIC support, and DDoS protection.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing || !subdomain.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition"
              >
                {isPublishing ? (
                  <span>Deploying to Edge...</span>
                ) : (
                  <>
                    <Globe className="h-4 w-4" />
                    <span>Publish Website</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

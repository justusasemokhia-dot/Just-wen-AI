import React from 'react';
import {
  WebsiteProject,
  WebsiteSection,
  DeviceViewport,
} from '../types';
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Edit2,
  Send,
} from 'lucide-react';

interface WebsiteCanvasProps {
  website: WebsiteProject;
  viewport?: DeviceViewport;
  isEditorMode?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onQuickEditItem?: (sectionId: string, itemId: string) => void;
}

export const WebsiteCanvas: React.FC<WebsiteCanvasProps> = ({
  website,
  viewport = 'desktop',
  isEditorMode = false,
  selectedSectionId = null,
  onSelectSection,
  onQuickEditItem,
}) => {
  const { theme, header, sections, footer } = website;
  const isDark = theme.mode === 'dark';

  // Radius map
  const radiusClass =
    theme.borderRadius === 'none'
      ? 'rounded-none'
      : theme.borderRadius === 'sm'
      ? 'rounded-md'
      : theme.borderRadius === 'lg'
      ? 'rounded-2xl'
      : theme.borderRadius === 'full'
      ? 'rounded-3xl'
      : 'rounded-xl';

  const btnRadiusClass =
    theme.borderRadius === 'full' ? 'rounded-full' : theme.borderRadius === 'lg' ? 'rounded-xl' : 'rounded-lg';

  // Width container for responsiveness simulation
  const viewportContainerClasses = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] mx-auto shadow-2xl rounded-2xl border-4 border-slate-700/80 overflow-hidden my-4',
    mobile: 'w-[375px] mx-auto shadow-2xl rounded-[36px] border-[6px] border-slate-800 overflow-hidden my-4 relative',
  }[viewport];

  return (
    <div
      className={`transition-all duration-300 ${viewportContainerClasses}`}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.fontFamily === 'serif' ? 'Playfair Display, Georgia, serif' : 'Plus Jakarta Sans, sans-serif',
      }}
      id="live-website-canvas"
    >
      {/* Mobile top notch simulation */}
      {viewport === 'mobile' && (
        <div className="h-6 bg-slate-900 flex items-center justify-center relative">
          <div className="w-24 h-3.5 bg-black rounded-b-xl" />
        </div>
      )}

      {/* Website Navigation Header */}
      <header
        className="sticky top-0 z-30 transition-colors border-b px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{
          backgroundColor: theme.backgroundColor,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-lg sm:text-xl font-bold tracking-tight"
            style={{ color: theme.headingColor }}
          >
            {header.logoText}
          </span>
          {header.tagline && (
            <span className="hidden sm:inline-block text-xs text-slate-400 border-l pl-2 ml-2 border-slate-700">
              {header.tagline}
            </span>
          )}
        </div>

        {/* Desktop Header Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {header.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="hover:opacity-80 transition"
              style={{ color: theme.textColor }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div>
          <a
            href={header.ctaHref}
            className={`inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 py-2 text-white transition shadow-sm hover:opacity-95 ${btnRadiusClass}`}
            style={{ backgroundColor: theme.primaryColor }}
          >
            {header.ctaText}
          </a>
        </div>
      </header>

      {/* Website Content Sections */}
      <main className="divide-y divide-transparent">
        {sections.map((section, idx) => {
          const isSelected = isEditorMode && selectedSectionId === section.id;

          return (
            <section
              key={section.id}
              id={`section-node-${section.id}`}
              onClick={() => onSelectSection && onSelectSection(section.id)}
              className={`relative transition-all duration-200 ${
                isEditorMode ? 'cursor-pointer hover:ring-2 hover:ring-indigo-400/50' : ''
              } ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-500/5' : ''}`}
            >
              {/* Editor badge indicator */}
              {isEditorMode && (
                <div
                  className={`absolute top-2 left-2 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 text-slate-300 opacity-60'
                  }`}
                >
                  <Edit2 className="h-3 w-3" />
                  <span className="capitalize">{section.type} Section</span>
                </div>
              )}

              {renderSectionContent(section, theme, radiusClass, btnRadiusClass, isDark, onQuickEditItem)}
            </section>
          );
        })}
      </main>

      {/* Website Footer */}
      <footer
        className="border-t px-6 sm:px-12 py-10 transition-colors"
        style={{
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div>
            <span
              className="text-base font-bold"
              style={{ color: theme.headingColor }}
            >
              {header.logoText}
            </span>
            <p className="text-xs text-slate-400 mt-1">{footer.copyright}</p>
          </div>

          {/* Social or quick links */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {footer.socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                className="hover:opacity-80 transition underline-offset-4 hover:underline"
                style={{ color: theme.textColor }}
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

function renderSectionContent(
  section: WebsiteSection,
  theme: any,
  radiusClass: string,
  btnRadiusClass: string,
  isDark: boolean,
  onQuickEditItem?: (secId: string, itemId: string) => void
) {
  const alignClass =
    section.align === 'center' ? 'text-center mx-auto' : section.align === 'right' ? 'text-right ml-auto' : 'text-left';

  switch (section.type) {
    case 'hero':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
          <div className={`grid gap-8 items-center ${section.imageUrl && section.align !== 'center' ? 'lg:grid-cols-12' : ''}`}>
            <div className={section.imageUrl && section.align !== 'center' ? 'lg:col-span-7' : 'max-w-3xl ' + alignClass}>
              {section.badge && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full mb-5"
                  style={{
                    backgroundColor: `${theme.primaryColor}18`,
                    color: theme.accentColor || theme.primaryColor,
                    border: `1px solid ${theme.primaryColor}33`,
                  }}
                >
                  <Sparkles className="h-3 w-3" />
                  {section.badge}
                </span>
              )}
              <h1
                className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-5"
                style={{ color: theme.headingColor }}
              >
                {section.title}
              </h1>
              {section.subtitle && (
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl">
                  {section.subtitle}
                </p>
              )}
              <div className={`flex flex-wrap items-center gap-3 ${section.align === 'center' ? 'justify-center' : ''}`}>
                {section.primaryCta && (
                  <a
                    href={section.primaryCta.href}
                    className={`inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-6 py-3 text-white shadow-lg transition hover:scale-[1.02] active:scale-[0.98] ${btnRadiusClass}`}
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <span>{section.primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {section.secondaryCta && (
                  <a
                    href={section.secondaryCta.href}
                    className={`inline-flex items-center gap-2 text-sm sm:text-base font-medium px-5 py-3 border transition hover:opacity-90 ${btnRadiusClass}`}
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                      color: theme.headingColor,
                    }}
                  >
                    <span>{section.secondaryCta.label}</span>
                  </a>
                )}
              </div>
            </div>

            {section.imageUrl && (
              <div className={section.align !== 'center' ? 'lg:col-span-5' : 'mt-8'}>
                <div className={`overflow-hidden shadow-2xl border border-slate-700/40 ${radiusClass}`}>
                  <img
                    src={section.imageUrl}
                    alt={section.title}
                    className="w-full h-auto object-cover max-h-[460px] hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'menu':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {section.badge && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2 block"
                style={{ color: theme.primaryColor }}
              >
                {section.badge}
              </span>
            )}
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: theme.headingColor }}
            >
              {section.title}
            </h2>
            {section.subtitle && <p className="text-sm text-slate-400">{section.subtitle}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {section.items?.map((item) => (
              <div
                key={item.id}
                className={`p-5 transition border border-transparent hover:border-slate-700/60 ${radiusClass}`}
                style={{ backgroundColor: theme.cardBackground }}
              >
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base" style={{ color: theme.headingColor }}>
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${theme.primaryColor}22`, color: theme.primaryColor }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-base" style={{ color: theme.primaryColor }}>
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {section.badge && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2 block"
                style={{ color: theme.primaryColor }}
              >
                {section.badge}
              </span>
            )}
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: theme.headingColor }}
            >
              {section.title}
            </h2>
            {section.subtitle && <p className="text-sm text-slate-400">{section.subtitle}</p>}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items?.map((item) => (
              <div
                key={item.id}
                className={`p-6 transition border border-slate-700/30 hover:border-indigo-500/40 flex flex-col justify-between ${radiusClass}`}
                style={{ backgroundColor: theme.cardBackground }}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 block">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="font-bold text-lg mb-2" style={{ color: theme.headingColor }}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'stats':
      return (
        <div
          className="border-y px-6 sm:px-12 py-12"
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {section.items?.map((item) => (
                <div key={item.id} className="p-3">
                  <div
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1"
                    style={{ color: theme.primaryColor }}
                  >
                    {item.statValue}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-400">{item.statLabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {section.badge && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2 block"
                style={{ color: theme.primaryColor }}
              >
                {section.badge}
              </span>
            )}
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: theme.headingColor }}
            >
              {section.title}
            </h2>
            {section.subtitle && <p className="text-sm text-slate-400">{section.subtitle}</p>}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {section.items?.map((item) => (
              <div
                key={item.id}
                className={`p-6 sm:p-8 flex flex-col justify-between border transition relative ${
                  item.highlighted
                    ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-500/30'
                    : 'border-slate-700/40 hover:border-slate-600'
                } ${radiusClass}`}
                style={{ backgroundColor: theme.cardBackground }}
              >
                {item.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-xl mb-1" style={{ color: theme.headingColor }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">{item.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold" style={{ color: theme.headingColor }}>
                      {item.price}
                    </span>
                    {item.period && <span className="text-xs text-slate-400">/{item.period}</span>}
                  </div>

                  {item.features && (
                    <ul className="space-y-2.5 mb-8 text-xs sm:text-sm">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <a
                  href={item.ctaHref || '#'}
                  className={`w-full py-2.5 px-4 text-center text-sm font-semibold transition ${btnRadiusClass} ${
                    item.highlighted
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : 'border border-slate-700 hover:bg-slate-800 text-slate-200'
                  }`}
                  style={item.highlighted ? { backgroundColor: theme.primaryColor } : {}}
                >
                  {item.ctaText || 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {section.badge && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2 block"
                style={{ color: theme.primaryColor }}
              >
                {section.badge}
              </span>
            )}
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: theme.headingColor }}
            >
              {section.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {section.items?.map((item) => (
              <div
                key={item.id}
                className={`p-6 border border-slate-700/30 flex flex-col justify-between ${radiusClass}`}
                style={{ backgroundColor: theme.cardBackground }}
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, r) => (
                      <Star key={r} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base italic text-slate-300 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: theme.headingColor }}>
                    {item.author}
                  </h4>
                  {item.role && <p className="text-xs text-slate-400">{item.role}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {section.badge && (
              <span
                className="text-xs font-bold uppercase tracking-wider mb-2 block"
                style={{ color: theme.primaryColor }}
              >
                {section.badge}
              </span>
            )}
            <h2
              className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3"
              style={{ color: theme.headingColor }}
            >
              {section.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {section.items?.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden border border-slate-700/40 group ${radiusClass}`}
                style={{ backgroundColor: theme.cardBackground }}
              >
                {item.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  {item.category && (
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-bold text-sm mb-1" style={{ color: theme.headingColor }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <div className={`p-8 sm:p-12 border border-slate-700/50 shadow-xl ${radiusClass}`} style={{ backgroundColor: theme.cardBackground }}>
            <div className="text-center mb-8">
              {section.badge && (
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-2 block"
                  style={{ color: theme.primaryColor }}
                >
                  {section.badge}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: theme.headingColor }}>
                {section.title}
              </h2>
              {section.subtitle && <p className="text-sm text-slate-400">{section.subtitle}</p>}
              {section.content && <p className="text-xs text-slate-400 mt-2">{section.content}</p>}
            </div>

            {/* Interactive Simulated Contact Form */}
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How can we assist you today?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 text-white font-semibold text-sm transition shadow-lg ${btnRadiusClass}`}
                style={{ backgroundColor: theme.primaryColor }}
              >
                {section.primaryCta?.label || 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      );

    default:
      return (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
          <p className="text-sm text-slate-400">{section.subtitle || section.content}</p>
        </div>
      );
  }
}

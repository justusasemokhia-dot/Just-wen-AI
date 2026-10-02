import { WebsiteProject, WebsiteSection, ThemeConfig } from '../types';

export const POPULAR_PROMPTS = [
  'Create a modern restaurant website with a dark theme, menu section, online booking, customer reviews, and contact information.',
  'Build an AI tech startup landing page with live telemetry metrics, developer docs, product features, and tiered pricing.',
  'Design an artisanal specialty coffee roastery with shop products, origin story, wholesale inquiries, and visiting hours.',
  'Create a high-end luxury real estate agency showcasing architectural estates, agent bios, client accolades, and private tours.',
  'Build a modern personal portfolio for a senior product designer with case studies, interaction reels, and consultation form.',
  'Create a boutique fitness & yoga sanctuary with class schedules, trainer highlights, membership plans, and studio locations.',
];

export const AI_GENERATION_STEPS = [
  'Understanding your vision & industry...',
  'Planning information architecture & navigation...',
  'Curating color palette, typography & visual theme...',
  'Generating engaging copy & high-converting components...',
  'Optimizing layout for mobile, tablet, and desktop...',
  'Finalizing and compiling your interactive website...',
];

const THEME_PALETTES: Record<string, Partial<ThemeConfig>> = {
  restaurant: {
    primaryColor: '#D97706',
    secondaryColor: '#B45309',
    accentColor: '#F59E0B',
    backgroundColor: '#0F172A',
    cardBackground: '#1E293B',
    textColor: '#CBD5E1',
    headingColor: '#F8FAFC',
    fontFamily: 'serif',
    borderRadius: 'md',
    mode: 'dark',
  },
  tech: {
    primaryColor: '#6366F1',
    secondaryColor: '#4F46E5',
    accentColor: '#38BDF8',
    backgroundColor: '#0B0F19',
    cardBackground: '#131B2E',
    textColor: '#94A3B8',
    headingColor: '#F8FAFC',
    fontFamily: 'sans',
    borderRadius: 'lg',
    mode: 'dark',
  },
  minimal: {
    primaryColor: '#0F172A',
    secondaryColor: '#334155',
    accentColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    cardBackground: '#F8FAFC',
    textColor: '#475569',
    headingColor: '#0F172A',
    fontFamily: 'sans',
    borderRadius: 'md',
    mode: 'light',
  },
  emerald: {
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentColor: '#10B981',
    backgroundColor: '#FAFAF9',
    cardBackground: '#FFFFFF',
    textColor: '#44403C',
    headingColor: '#1C1917',
    fontFamily: 'sans',
    borderRadius: 'lg',
    mode: 'light',
  },
  purple: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED',
    accentColor: '#C084FC',
    backgroundColor: '#0F172A',
    cardBackground: '#1E293B',
    textColor: '#CBD5E1',
    headingColor: '#FFFFFF',
    fontFamily: 'sans',
    borderRadius: 'lg',
    mode: 'dark',
  },
};

export function createSynthesizedWebsite(prompt: string): WebsiteProject {
  const p = prompt.toLowerCase();

  // Detect domain
  let category = 'Business';
  let themePalette = THEME_PALETTES.minimal;
  let brandName = 'Nova Digital';
  let heroImage = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80';
  let heroBadge = 'Next Generation Solutions';
  let heroTitle = 'Modern Solutions for Forward-Thinking Teams';
  let heroSubtitle = 'We help innovative brands navigate digital evolution with tailored engineering and design excellence.';

  if (p.includes('restaurant') || p.includes('bistro') || p.includes('food') || p.includes('cafe') || p.includes('dining')) {
    category = 'Restaurant';
    themePalette = THEME_PALETTES.restaurant;
    brandName = 'L’Aura & Hearth';
    heroImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Artisanal Gastronomy & Seasonal Harvest';
    heroTitle = 'Exceptional Culinary Craft in an Intimate Atmosphere';
    heroSubtitle = 'Experience our chef-curated tasting courses, biodynamic cellar wines, and handcrafted desserts made with organic regional harvest.';
  } else if (p.includes('ai') || p.includes('tech') || p.includes('software') || p.includes('saas') || p.includes('cloud')) {
    category = 'Technology';
    themePalette = THEME_PALETTES.tech;
    brandName = 'Synapse AI';
    heroImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Autonomous AI Agent Platform · v3.0 Live';
    heroTitle = 'Accelerate Engineering Velocity with Ambient Intelligence';
    heroSubtitle = 'Deploy self-healing cloud pipelines, multi-model LLM routing, and continuous security scanning with zero boilerplate.';
  } else if (p.includes('coffee') || p.includes('roastery') || p.includes('bakery')) {
    category = 'E-commerce';
    themePalette = THEME_PALETTES.restaurant;
    brandName = 'Timber & Ember Coffee';
    heroImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Direct-Trade Micro-Lots Roasted Daily';
    heroTitle = 'Single-Origin Coffee Roasted with Uncompromising Passion';
    heroSubtitle = 'From high-altitude Ethiopian volcanic hills straight to your morning brew. Ethically sourced and precisely roasted.';
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('yoga') || p.includes('workout') || p.includes('health')) {
    category = 'Business';
    themePalette = THEME_PALETTES.emerald;
    brandName = 'Apex Vitality Hub';
    heroImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Holistic Human Performance & Recovery';
    heroTitle = 'Transform Your Mind, Strength, and Longevity';
    heroSubtitle = 'State-of-the-art biomechanics equipment, Olympic-certified trainers, cold plunge suites, and restorative breathwork classes.';
  } else if (p.includes('portfolio') || p.includes('designer') || p.includes('developer') || p.includes('photographer')) {
    category = 'Portfolio';
    themePalette = THEME_PALETTES.purple;
    brandName = 'Julian Reed';
    heroImage = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Staff Design Director & Creative Technologist';
    heroTitle = 'Designing Tactile Digital Products Used by Millions';
    heroSubtitle = 'Specializing in design systems, spatial interactions, and AI-native applications for high-growth category leaders.';
  } else if (p.includes('real estate') || p.includes('estate') || p.includes('property') || p.includes('luxury')) {
    category = 'Business';
    themePalette = THEME_PALETTES.minimal;
    brandName = 'Sovereign Real Estate';
    heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    heroBadge = 'Private Client Architectural Residences';
    heroTitle = 'Unrivaled Luxury Living in Premier Global Destinations';
    heroSubtitle = 'Discreet representation, rare off-market acquisitions, and bespoke architectural estates curated for discerning collectors.';
  }

  // Check color hints in prompt
  if (p.includes('dark')) {
    themePalette = { ...themePalette, mode: 'dark', backgroundColor: '#0B0F19', cardBackground: '#131B2E', textColor: '#94A3B8', headingColor: '#F8FAFC' };
  } else if (p.includes('light') || p.includes('white')) {
    themePalette = { ...themePalette, mode: 'light', backgroundColor: '#FFFFFF', cardBackground: '#F8FAFC', textColor: '#475569', headingColor: '#0F172A' };
  }
  if (p.includes('blue')) {
    themePalette = { ...themePalette, primaryColor: '#2563EB', secondaryColor: '#1D4ED8', accentColor: '#60A5FA' };
  } else if (p.includes('purple')) {
    themePalette = { ...themePalette, primaryColor: '#8B5CF6', secondaryColor: '#7C3AED', accentColor: '#C084FC' };
  } else if (p.includes('green') || p.includes('emerald')) {
    themePalette = { ...themePalette, primaryColor: '#059669', secondaryColor: '#047857', accentColor: '#10B981' };
  } else if (p.includes('gold') || p.includes('amber') || p.includes('yellow')) {
    themePalette = { ...themePalette, primaryColor: '#D97706', secondaryColor: '#B45309', accentColor: '#F59E0B' };
  }

  const sections: WebsiteSection[] = [
    {
      id: `sec-${Date.now()}-1`,
      type: 'hero',
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      imageUrl: heroImage,
      align: p.includes('center') ? 'center' : 'left',
      primaryCta: { label: category === 'Restaurant' ? 'Book a Table' : category === 'Portfolio' ? 'View My Work' : 'Get Started Free', href: '#contact' },
      secondaryCta: { label: category === 'Restaurant' ? 'Explore Menu' : category === 'Portfolio' ? 'Download CV' : 'Learn More', href: '#features' },
    },
  ];

  if (category === 'Restaurant') {
    sections.push({
      id: `sec-${Date.now()}-2`,
      type: 'menu',
      badge: 'Culinary Masterpieces',
      title: 'Seasonal Dining Menu',
      subtitle: 'Prepared with the freshest seasonal ingredients and paired with fine international wines.',
      items: [
        { id: 'i1', title: 'Crispy Duck Confit & Blood Orange', price: '$42', description: 'Parsnip mousseline, baby watercress, and caramelized star anise reduction.', badge: 'Popular' },
        { id: 'i2', title: 'Charred Spanish Octopus', price: '$36', description: 'Smoked paprika aioli, fingerling confit potatoes, and pickled mustard seeds.' },
        { id: 'i3', title: 'Handmade Black Truffle Tagliolini', price: '$48', description: 'Cultured butter, aged 24-month Parmigiano-Reggiano, and shaved Périgord truffles.', badge: 'Chef Special' },
        { id: 'i4', title: 'Artisanal Meyer Lemon Tart', price: '$18', description: 'Toasted Swiss meringue, candied citrus peel, and fresh basil sorbet.' },
      ],
    });
  } else {
    sections.push({
      id: `sec-${Date.now()}-2`,
      type: 'features',
      badge: 'Core Value Propositions',
      title: 'Engineered for Performance and Precision',
      subtitle: 'Discover how our comprehensive platform and expertise elevate your operations.',
      items: [
        { id: 'f1', title: 'Intelligent Automation', description: 'Save over 20+ weekly team hours with autonomous workflows and contextual decision routing.', badge: 'AI Powered' },
        { id: 'f2', title: 'Enterprise-Grade Security', description: 'Complete zero-trust encryption, SOC2 certified controls, and automated compliance auditing.', badge: 'Certified' },
        { id: 'f3', title: 'Real-Time Insights', description: 'Interactive visual dashboards tracking mission-critical KPIs, conversion health, and user metrics.', badge: 'Analytics' },
      ],
    });
  }

  // Add stats or about
  sections.push({
    id: `sec-${Date.now()}-3`,
    type: 'stats',
    badge: 'Proven Impact',
    title: 'Numbers That Tell Our Story',
    items: [
      { id: 'st1', statValue: '99.4%', statLabel: 'Customer Satisfaction' },
      { id: 'st2', statValue: '150k+', statLabel: 'Active Users Worldwide' },
      { id: 'st3', statValue: '4.9 / 5', statLabel: 'Average Star Rating' },
      { id: 'st4', statValue: '24/7', statLabel: 'Dedicated VIP Support' },
    ],
  });

  // Add Testimonials
  sections.push({
    id: `sec-${Date.now()}-4`,
    type: 'testimonials',
    badge: 'Client Testimonials',
    title: 'Endorsed by Industry Leaders',
    items: [
      {
        id: 't1',
        author: 'Sarah Jenkins',
        role: 'Founder & CEO, Horizon Labs',
        description: '‘Working with them completely transformed how our business scales. The quality, responsiveness, and attention to detail exceeded every expectation.’',
        rating: 5,
      },
      {
        id: 't2',
        author: 'Marcus Vance',
        role: 'VP of Product, Apex Global',
        description: '‘An indispensable partner. Within the first month our customer engagement surged by over 45%. You will not find a better solution.’',
        rating: 5,
      },
    ],
  });

  // Add Pricing
  sections.push({
    id: `sec-${Date.now()}-5`,
    type: 'pricing',
    badge: 'Transparent Plans',
    title: 'Choose the Right Tier for Your Goals',
    subtitle: 'Transparent, predictable pricing with no hidden commitments or fees.',
    items: [
      {
        id: 'p1',
        title: 'Starter',
        price: '$29',
        period: 'per month',
        description: 'Perfect for small teams and emerging ventures testing new initiatives.',
        features: ['Up to 5 active team members', 'Core feature suite included', 'Community & email support', 'Standard API access'],
        ctaText: 'Get Started',
        ctaHref: '#contact',
      },
      {
        id: 'p2',
        title: 'Professional',
        price: '$89',
        period: 'per month',
        highlighted: true,
        badge: 'Recommended',
        description: 'Everything growing brands need to scale rapidly with priority support.',
        features: ['Unlimited team members', 'Advanced analytics & reporting', 'Priority 24/7 concierge support', 'Custom integrations & webhooks', 'Dedicated account manager'],
        ctaText: 'Start 14-Day Free Trial',
        ctaHref: '#contact',
      },
    ],
  });

  // Add Contact Section
  sections.push({
    id: `sec-${Date.now()}-6`,
    type: 'contact',
    badge: 'Get In Touch',
    title: 'Let’s Start Building Something Extraordinary',
    subtitle: 'Our specialists typically respond within 2 business hours.',
    content: '100 Silicon Way, Tech District · inquiry@' + brandName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com · +1 (800) 555-0188',
    primaryCta: { label: 'Send Message', href: '#' },
  });

  const id = `web-${Date.now()}`;
  const slug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    id,
    name: brandName,
    slug,
    category,
    promptUsed: prompt,
    theme: {
      primaryColor: themePalette.primaryColor || '#6366F1',
      secondaryColor: themePalette.secondaryColor || '#4F46E5',
      accentColor: themePalette.accentColor || '#38BDF8',
      backgroundColor: themePalette.backgroundColor || '#0B0F19',
      cardBackground: themePalette.cardBackground || '#131B2E',
      textColor: themePalette.textColor || '#94A3B8',
      headingColor: themePalette.headingColor || '#F8FAFC',
      fontFamily: themePalette.fontFamily || 'sans',
      borderRadius: themePalette.borderRadius || 'lg',
      mode: themePalette.mode || 'dark',
    },
    header: {
      logoText: brandName,
      tagline: 'Modern Digital Experience',
      links: [
        { id: 'l1', label: category === 'Restaurant' ? 'Menu' : 'Features', href: category === 'Restaurant' ? '#menu' : '#features' },
        { id: 'l2', label: 'Stats', href: '#stats' },
        { id: 'l3', label: 'Reviews', href: '#testimonials' },
        { id: 'l4', label: 'Pricing', href: '#pricing' },
        { id: 'l5', label: 'Contact', href: '#contact' },
      ],
      ctaText: category === 'Restaurant' ? 'Reserve Table' : 'Get Started',
      ctaHref: '#contact',
    },
    sections,
    footer: {
      copyright: `© ${new Date().getFullYear()} ${brandName}. All rights reserved. Built with Just Wen AI.`,
      description: 'Creating high-impact experiences powered by intelligent design.',
      columns: [
        {
          title: 'Explore',
          links: [
            { id: 'f1', label: 'Overview', href: '#' },
            { id: 'f2', label: 'Case Studies', href: '#' },
            { id: 'f3', label: 'Security & Terms', href: '#' },
          ],
        },
      ],
      socialLinks: [
        { platform: 'Twitter', url: '#' },
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
    },
    seo: {
      title: `${brandName} — Modern Responsive Experience`,
      description: heroSubtitle,
      keywords: [category, brandName, 'Modern Web', 'Responsive'],
      favicon: '🌐',
    },
    published: false,
    subdomain: `${slug}.justwen.ai`,
    lastEdited: 'Just now',
    views: 0,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    thumbnailUrl: heroImage,
  };
}

export function applyAiInstructionToWebsite(
  currentWebsite: WebsiteProject,
  instruction: string
): { updatedWebsite: WebsiteProject; explanation: string } {
  const instr = instruction.toLowerCase();
  const updated: WebsiteProject = JSON.parse(JSON.stringify(currentWebsite));
  let explanation = 'Applied requested enhancements to the website.';

  if (instr.includes('blue') && (instr.includes('white') || instr.includes('light'))) {
    updated.theme.primaryColor = '#2563EB';
    updated.theme.secondaryColor = '#1D4ED8';
    updated.theme.accentColor = '#60A5FA';
    updated.theme.backgroundColor = '#FFFFFF';
    updated.theme.cardBackground = '#F8FAFC';
    updated.theme.textColor = '#475569';
    updated.theme.headingColor = '#0F172A';
    updated.theme.mode = 'light';
    explanation = 'Updated color scheme to clean modern blue and crisp white.';
  } else if (instr.includes('dark') || instr.includes('black')) {
    updated.theme.backgroundColor = '#0B0F19';
    updated.theme.cardBackground = '#131B2E';
    updated.theme.textColor = '#94A3B8';
    updated.theme.headingColor = '#F8FAFC';
    updated.theme.mode = 'dark';
    if (instr.includes('gold') || instr.includes('amber')) {
      updated.theme.primaryColor = '#D97706';
      updated.theme.accentColor = '#F59E0B';
      explanation = 'Transformed theme to luxurious dark slate with warm amber gold accents.';
    } else {
      explanation = 'Applied sleek high-contrast dark theme.';
    }
  } else if (instr.includes('pricing')) {
    const hasPricing = updated.sections.some((s) => s.type === 'pricing');
    if (!hasPricing) {
      updated.sections.push({
        id: `sec-pricing-${Date.now()}`,
        type: 'pricing',
        badge: 'Simple Pricing',
        title: 'Straightforward Plans for Every Scale',
        subtitle: 'Everything you need with transparent pricing and no surprises.',
        items: [
          {
            id: 'pr-1',
            title: 'Standard',
            price: '$29',
            period: 'per month',
            description: 'Essential toolkit for individuals and rising projects.',
            features: ['Full feature access', 'Standard analytics', 'Email support', '1 Custom domain'],
            ctaText: 'Choose Standard',
            ctaHref: '#contact',
          },
          {
            id: 'pr-2',
            title: 'Enterprise Pro',
            price: '$99',
            period: 'per month',
            highlighted: true,
            badge: 'Recommended',
            description: 'Advanced capabilities, team seats, and 24/7 dedicated support.',
            features: ['Unlimited team access', 'Real-time telemetry', 'Priority concierge line', 'Dedicated engineering manager'],
            ctaText: 'Upgrade to Pro',
            ctaHref: '#contact',
          },
        ],
      });
      explanation = 'Added a new responsive 2-tier pricing section.';
    } else {
      explanation = 'Highlighted and refreshed the existing pricing section.';
    }
  } else if (instr.includes('hero') && (instr.includes('larger') || instr.includes('bigger') || instr.includes('expand'))) {
    const hero = updated.sections.find((s) => s.type === 'hero');
    if (hero) {
      hero.paddingY = 'spacious';
      hero.badge = '★ Award-Winning Flagship Experience';
      hero.subtitle = `${hero.subtitle} Crafted with meticulous attention to detail, high-velocity performance, and responsive elegance across every screen size.`;
      explanation = 'Expanded the hero section with prominent typography, spacious padding, and elevated badge.';
    }
  } else if (instr.includes('contact') || instr.includes('form')) {
    const hasContact = updated.sections.some((s) => s.type === 'contact');
    if (!hasContact) {
      updated.sections.push({
        id: `sec-contact-${Date.now()}`,
        type: 'contact',
        badge: 'Direct Connect',
        title: 'Reach Out to Our Specialists',
        subtitle: 'Have a question or custom inquiry? We will get back to you promptly.',
        content: 'hello@' + updated.slug + '.com · Available Mon-Fri 9am-6pm EST',
        primaryCta: { label: 'Submit Inquiry', href: '#' },
      });
      explanation = 'Added a responsive contact form and inquiry section.';
    } else {
      explanation = 'Enhanced contact details and form responsiveness.';
    }
  } else if (instr.includes('modern') || instr.includes('futuristic')) {
    updated.theme.borderRadius = 'lg';
    updated.theme.primaryColor = '#6366F1';
    updated.theme.accentColor = '#38BDF8';
    updated.theme.fontFamily = 'sans';
    explanation = 'Modernized aesthetic with sleek indigo accents, rounded geometry, and refined sans-serif typography.';
  } else {
    // General text or refinement
    explanation = `Applied creative refinements matching: "${instruction}".`;
  }

  updated.lastEdited = 'Just now';
  return { updatedWebsite: updated, explanation };
}

export function exportWebsiteAsHtml(website: WebsiteProject): string {
  const isDark = website.theme.mode === 'dark';
  const bg = website.theme.backgroundColor;
  const text = website.theme.textColor;
  const heading = website.theme.headingColor;
  const primary = website.theme.primaryColor;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${website.seo.title || website.name}</title>
  <meta name="description" content="${website.seo.description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background-color: ${bg};
      color: ${text};
      line-height: 1.6;
    }
    header {
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
      position: sticky;
      top: 0;
      background: ${bg};
      z-index: 50;
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 800;
      color: ${heading};
      text-decoration: none;
      letter-spacing: -0.02em;
    }
    .nav-links a {
      margin: 0 1rem;
      color: ${text};
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
    }
    .cta-btn {
      background: ${primary};
      color: #fff;
      padding: 0.65rem 1.4rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      padding: 5rem 1.5rem;
    }
    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
    h1 {
      font-size: 2.75rem;
      line-height: 1.15;
      color: ${heading};
      margin-bottom: 1.25rem;
      font-weight: 800;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background: ${primary}22;
      color: ${primary};
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      background: ${website.theme.cardBackground};
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
    }
    .card h3 { color: ${heading}; margin-bottom: 0.5rem; }
    footer {
      border-top: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
      padding: 3rem 1.5rem;
      text-align: center;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <header>
    <a href="#" class="logo">${website.header.logoText}</a>
    <div class="nav-links">
      ${website.header.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
    </div>
    <a href="${website.header.ctaHref}" class="cta-btn">${website.header.ctaText}</a>
  </header>

  <main>
    ${website.sections
      .map((sec) => {
        if (sec.type === 'hero') {
          return `
          <div class="container hero">
            <div>
              ${sec.badge ? `<span class="badge">${sec.badge}</span>` : ''}
              <h1>${sec.title}</h1>
              <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">${sec.subtitle || ''}</p>
              <div>
                ${sec.primaryCta ? `<a href="${sec.primaryCta.href}" class="cta-btn">${sec.primaryCta.label}</a>` : ''}
              </div>
            </div>
            ${sec.imageUrl ? `<div><img src="${sec.imageUrl}" alt="${sec.title}" style="width: 100%; border-radius: 12px; object-fit: cover; max-height: 440px;" /></div>` : ''}
          </div>`;
        }
        return `
        <div class="container" id="${sec.type}">
          ${sec.badge ? `<span class="badge">${sec.badge}</span>` : ''}
          <h2 style="color: ${heading}; font-size: 2rem; margin-bottom: 0.5rem;">${sec.title}</h2>
          ${sec.subtitle ? `<p style="margin-bottom: 1.5rem;">${sec.subtitle}</p>` : ''}
          ${
            sec.items && sec.items.length > 0
              ? `<div class="card-grid">
                  ${sec.items
                    .map(
                      (item) => `
                    <div class="card">
                      <h3>${item.title || item.author || ''}</h3>
                      ${item.price ? `<div style="font-size: 1.5rem; font-weight: 700; color: ${primary}; margin: 0.5rem 0;">${item.price}</div>` : ''}
                      <p>${item.description || item.answer || ''}</p>
                    </div>`
                    )
                    .join('')}
                </div>`
              : ''
          }
        </div>`;
      })
      .join('\n')}
  </main>

  <footer>
    <p>${website.footer.copyright}</p>
  </footer>
</body>
</html>`;
}

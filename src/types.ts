export type Screen =
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'verify-email'
  | 'dashboard'
  | 'builder'
  | 'editor'
  | 'preview'
  | 'templates'
  | 'projects'
  | 'pricing'
  | 'settings'
  | 'publish'
  | 'account'
  | 'help';

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  headingColor: string;
  fontFamily: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  mode: 'dark' | 'light';
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface HeaderConfig {
  logoText: string;
  tagline?: string;
  links: NavLink[];
  ctaText: string;
  ctaHref: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterConfig {
  copyright: string;
  description?: string;
  columns: FooterColumn[];
  socialLinks: Array<{ platform: string; url: string }>;
}

export type SectionType =
  | 'hero'
  | 'features'
  | 'about'
  | 'menu'
  | 'pricing'
  | 'testimonials'
  | 'gallery'
  | 'cta'
  | 'contact'
  | 'faq'
  | 'stats';

export interface SectionItem {
  id: string;
  title?: string;
  description?: string;
  price?: string;
  period?: string;
  badge?: string;
  icon?: string;
  imageUrl?: string;
  author?: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
  highlighted?: boolean;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  category?: string;
  question?: string;
  answer?: string;
  statValue?: string;
  statLabel?: string;
}

export interface WebsiteSection {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  paddingY?: 'compact' | 'normal' | 'spacious';
  backgroundColor?: string;
  textColor?: string;
  imageUrl?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  items?: SectionItem[];
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string[];
  favicon: string;
  ogImage?: string;
}

export interface WebsiteProject {
  id: string;
  name: string;
  slug: string;
  category: string;
  promptUsed: string;
  theme: ThemeConfig;
  header: HeaderConfig;
  sections: WebsiteSection[];
  footer: FooterConfig;
  seo: SeoSettings;
  published: boolean;
  publishedUrl?: string;
  subdomain: string;
  customDomain?: string;
  lastEdited: string;
  views: number;
  createdAt: string;
  thumbnailUrl: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  previewImage: string;
  tags: string[];
  websiteData: WebsiteProject;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'business' | 'Free Starter' | 'Pro Creator' | 'Business & Agency' | string;
  aiGenerationsUsed: number;
  aiGenerationsLimit: number;
  connectedGoogle?: boolean;
  generationsUsed: number;
  maxGenerations: number;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  appliedAction?: string;
}

import { client } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  _key: string;
  label: string;
  link: string;
  emphasis?: boolean;
}

export interface MenuContact {
  dropInHeading?: string;
  address?: string;
  getInTouchHeading?: string;
  phone?: string;
  email?: string;
}

export interface SocialLink {
  _key: string;
  platform: "linkedin" | "instagram" | "vimeo";
  url: string;
}

export interface SiteSettings {
  siteTitle?: string;
  siteDescription?: string;
  faviconUrl?: string;
  ogImageUrl?: string;
  sidebarLogoUrl?: string;
  wordmarkLogoUrl?: string;
  navigation?: NavItem[];
  menuContact?: MenuContact;
  socialLinks?: SocialLink[];
}

export interface HeroSlide {
  _key: string;
  company: string;
  projectName: string;
  videoId: string;
  url?: string;
}

export interface LogoImage {
  _key: string;
  alt?: string;
  url: string;
}

export interface HomePageData {
  heroSlides?: HeroSlide[];
  introText?: string;
  workVideoId?: string;
  brandsHeading?: string;
  brandLogos?: LogoImage[];
  accoladesHeading?: string;
  accoladeLogos?: LogoImage[];
}

export interface WorkCategory {
  title: string;
  slug: string;
}

export interface Project {
  _id: string;
  title: string;
  client?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface TeamMember {
  _key: string;
  name: string;
  role?: string;
  photoUrl?: string;
}

export interface AboutPageData {
  heading?: string;
  paragraphs?: string[];
  teamHeading?: string;
  teamMembers?: TeamMember[];
}

export interface FooterLink {
  _key: string;
  label: string;
  link: string;
}

export interface FooterData {
  getInTouchHeading?: string;
  phone?: string;
  email?: string;
  dropInHeading?: string;
  address?: string;
  legalText?: string;
  footerLinks?: FooterLink[];
}

export interface LegalPageData {
  title?: string;
  body?: unknown[];
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const getSiteSettings = () =>
  client.fetch<SiteSettings | null>(
    `*[_id == "siteSettings"][0]{
      siteTitle,
      siteDescription,
      "faviconUrl": favicon.asset->url,
      "ogImageUrl": ogImage.asset->url,
      "sidebarLogoUrl": sidebarLogo.asset->url,
      "wordmarkLogoUrl": wordmarkLogo.asset->url,
      navigation,
      menuContact,
      socialLinks
    }`
  );

export const getHomePage = () =>
  client.fetch<HomePageData | null>(
    `*[_id == "homePage"][0]{
      heroSlides,
      introText,
      workVideoId,
      brandsHeading,
      "brandLogos": brandLogos[]{ _key, alt, "url": asset->url },
      accoladesHeading,
      "accoladeLogos": accoladeLogos[]{ _key, alt, "url": asset->url }
    }`
  );

export const getWorkCategories = () =>
  client.fetch<WorkCategory[]>(
    `*[_type == "workCategory"] | order(order asc){ title, "slug": slug.current }`
  );

export const getProjects = () =>
  client.fetch<Project[]>(
    `*[_type == "project"] | order(order asc){
      _id,
      title,
      client,
      "category": category->slug.current,
      tags,
      "imageUrl": image.asset->url,
      videoUrl
    }`
  );

export const getWorkPage = () =>
  client.fetch<{ heading?: string } | null>(`*[_id == "workPage"][0]{ heading }`);

export const getAboutPage = () =>
  client.fetch<AboutPageData | null>(
    `*[_id == "aboutPage"][0]{
      heading,
      paragraphs,
      teamHeading,
      "teamMembers": teamMembers[]{ _key, name, role, "photoUrl": photo.asset->url }
    }`
  );

export const getFooter = () =>
  client.fetch<FooterData | null>(`*[_id == "footer"][0]`);

export const getPrivacyPage = () =>
  client.fetch<LegalPageData | null>(`*[_id == "privacyPage"][0]{ title, body }`);

export const getTermsPage = () =>
  client.fetch<LegalPageData | null>(`*[_id == "termsPage"][0]{ title, body }`);

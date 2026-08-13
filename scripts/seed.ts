/**
 * Seed script — migrates all placeholder content into Sanity.
 * Run with:  npx sanity exec scripts/seed.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const client = getCliClient({ apiVersion: "2025-06-01" });

// ─── helpers ──────────────────────────────────────────────────────────────────

let keyCounter = 0;
const key = () => `seed${(keyCounter++).toString(36).padStart(4, "0")}`;

async function uploadLocalImage(relPath: string, filename: string) {
  const buf = readFileSync(join(process.cwd(), relPath));
  const asset = await client.assets.upload("image", buf, { filename });
  return asset._id;
}

async function uploadRemoteImage(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  return asset._id;
}

const imageRef = (assetId: string, extra: Record<string, unknown> = {}) => ({
  _type: "image",
  _key: key(),
  asset: { _type: "reference", _ref: assetId },
  ...extra,
});

const block = (text: string, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

// ─── seed data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { slug: "studio", title: "Studio", order: 1 },
  { slug: "vfx", title: "VFX", order: 2 },
  { slug: "broadcast", title: "Broadcast", order: 3 },
  { slug: "originals", title: "Originals", order: 4 },
];

const PROJECTS = [
  { id: 1,  title: "Rise As One",           client: "Nike",         category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 2,  title: "Edge of Impossible",    client: "Red Bull",     category: "studio",    tags: ["Live Action"] },
  { id: 3,  title: "The Crown — S6 Promo",  client: "Netflix",      category: "broadcast", tags: ["VFX", "Motion Design"] },
  { id: 4,  title: "Impossible Is Nothing", client: "Adidas",       category: "studio",    tags: ["Live Action", "3D"] },
  { id: 5,  title: "Behind the Mac",        client: "Apple",        category: "studio",    tags: ["Live Action"] },
  { id: 6,  title: "Original Series Launch",client: "HBO",          category: "broadcast", tags: ["VFX", "Animation"] },
  { id: 7,  title: "Year in Search",        client: "Google",       category: "studio",    tags: ["Live Action", "Motion Design"] },
  { id: 8,  title: "The Drive",             client: "BMW",          category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 9,  title: "Galaxy of Dreams",      client: "Disney+",      category: "originals", tags: ["3D", "Animation"] },
  { id: 10, title: "Wrapped 2024",          client: "Spotify",      category: "studio",    tags: ["2D", "Motion Design"] },
  { id: 11, title: "Prime Day Campaign",    client: "Amazon",       category: "broadcast", tags: ["VFX", "Live Action"] },
  { id: 12, title: "Electric Future",       client: "Volkswagen",   category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 13, title: "Succession — Finale",   client: "HBO",          category: "broadcast", tags: ["Live Action"] },
  { id: 14, title: "Just Do It — 2024",     client: "Nike",         category: "vfx",       tags: ["VFX", "3D"] },
  { id: 15, title: "The Last of Us — S2",   client: "HBO",          category: "vfx",       tags: ["VFX", "Live Action"] },
  { id: 16, title: "Summer Originals",      client: "Amazon Prime", category: "originals", tags: ["Live Action", "Motion Design"] },
];

const TEAM = [
  { seed: "team1", name: "Sarah Mitchell", role: "Founding Partner\nExecutive Creative Director" },
  { seed: "team2", name: "David Okafor",   role: "Partner\nCreative Head of Studio" },
  { seed: "team3", name: "Rachel Torres",  role: "Executive Producer\nManaging Director" },
  { seed: "team4", name: "James Park",     role: "Head\nof Production" },
  { seed: "team5", name: "Lena Fischer",   role: "VFX\n& Originals Producer" },
  { seed: "team6", name: "Marcus Reid",    role: "Head\nof Broadcast" },
];

const ABOUT_PARAGRAPHS = [
  "GTG Studios is an independently owned, artist-led creative studio that loves big ideas and great people. We are at the forefront of a new wave of interdisciplinary production practice.",
  "We represent a diverse range of world-class commercial film and video directors. Our studio creates award-winning animation, motion design and VFX. Our full-service Broadcast facility cuts and finishes the biggest global formats and documentaries, and in Originals we dream up the content that we wished existed.",
  "We explore lateral solutions, using next generation technology and bespoke tools. Located in Los Angeles, our team collaborates with our global network of established and emerging talent to deliver work that moves people.",
];

// Red version of the sidebar asterisk mark, for the favicon
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.9 53.7"><path fill="#EB2A24" d="M56.25,18.68c-1.09-2.57-3.19-4.3-6.04-4.67-2.67-.35-5.2.5-7.43,2.08l-5.14,3.64c-1.11-1.2-2.44-2.18-3.94-2.87l2.05-7.06c.67-2.29.35-4.7-.91-6.63C33.37.91,30.93.05,28.31,0c-3.32-.06-6.18,1.74-7.11,5.02-.5,1.78-.36,3.72.17,5.54l1.82,6.3c-1.5.7-2.84,1.68-3.95,2.89l-5.81-4.1c-2.76-1.95-6.3-2.37-9.32-.79-3.61,1.88-5.16,6.61-3.32,10.25,1.43,2.83,4.29,4.47,7.45,4.64l7.87.41c.26,1.68.86,3.25,1.72,4.64l-5.66,4.5c-1.75,1.4-2.9,3.07-3.55,5.14-.88,2.78.08,5.68,2.38,7.42,1.53,1.15,3.3,1.96,5.29,1.82,3.54-.25,6.44-2.59,7.6-5.93l2.5-7.22c.67.11,1.36.18,2.06.18s1.4-.07,2.07-.19l2.59,7.42c1.24,3.57,4.6,5.92,8.32,5.71,2.21-.12,4.13-1.28,5.58-2.84,1.22-1.31,1.69-3.13,1.54-4.92-.24-2.77-1.81-5.02-3.96-6.73l-5.52-4.38c.86-1.39,1.46-2.95,1.72-4.63l7.82-.41c1.57-.08,3.13-.59,4.41-1.35,3.49-2.05,4.76-6.06,3.21-9.72Z"/></svg>`;

// ─── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding GTG Studios content…\n");

  // 1. Categories
  console.log("→ Work categories");
  for (const cat of CATEGORIES) {
    await client.createOrReplace({
      _id: `workCategory-${cat.slug}`,
      _type: "workCategory",
      title: cat.title,
      slug: { _type: "slug", current: cat.slug },
      order: cat.order,
    });
  }

  // 2. Projects (with picsum thumbnails uploaded as real assets)
  console.log("→ Projects (uploading 16 thumbnails…)");
  for (const p of PROJECTS) {
    const assetId = await uploadRemoteImage(
      `https://picsum.photos/seed/gtg${p.id}/800/450`,
      `project-${p.id}.jpg`
    );
    await client.createOrReplace({
      _id: `project-${p.id}`,
      _type: "project",
      title: p.title,
      client: p.client,
      category: { _type: "reference", _ref: `workCategory-${p.category}` },
      tags: p.tags,
      image: imageRef(assetId),
      order: p.id,
    });
    console.log(`   ✓ ${p.title}`);
  }

  // 3. Brand + accolade logos
  console.log("→ Brand logos");
  const brandFiles = readdirSync(join(process.cwd(), "public/logos/brands")).filter((f) => f.endsWith(".svg")).sort();
  const brandLogos = [];
  for (const f of brandFiles) {
    const assetId = await uploadLocalImage(`public/logos/brands/${f}`, f);
    brandLogos.push(imageRef(assetId, { alt: f.replace(".svg", "") }));
  }

  console.log("→ Accolade badges");
  const accFiles = readdirSync(join(process.cwd(), "public/logos/accolades")).filter((f) => f.endsWith(".svg")).sort();
  const accoladeLogos = [];
  for (const f of accFiles) {
    const assetId = await uploadLocalImage(`public/logos/accolades/${f}`, f);
    accoladeLogos.push(imageRef(assetId, { alt: f.replace(".svg", "") }));
  }

  // 4. Team photos
  console.log("→ Team photos");
  const teamMembers = [];
  for (const m of TEAM) {
    const assetId = await uploadRemoteImage(
      `https://picsum.photos/seed/${m.seed}/600/700`,
      `${m.seed}.jpg`
    );
    teamMembers.push({
      _type: "teamMember",
      _key: key(),
      name: m.name,
      role: m.role,
      photo: imageRef(assetId),
    });
  }

  // 5. Favicon + OG image
  console.log("→ Favicon + OG image");
  const faviconAsset = await client.assets.upload(
    "image",
    Buffer.from(FAVICON_SVG),
    { filename: "favicon.svg" }
  );
  let ogImage: Record<string, unknown> | null = null;
  try {
    const ogAssetId = await uploadRemoteImage(
      "http://localhost:3000/opengraph-image",
      "og-image.png"
    );
    ogImage = { _type: "image", asset: { _type: "reference", _ref: ogAssetId } };
  } catch {
    console.log("   (dev server not reachable — skipping OG image, set it in Studio)");
  }

  // 6. Singletons
  console.log("→ Site Settings");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "GTG Studios — Film & Video Production",
    siteDescription:
      "GTG Studios is a full-service film and video production company crafting compelling content for ambitious brands and global audiences.",
    favicon: { _type: "image", asset: { _type: "reference", _ref: faviconAsset._id } },
    ...(ogImage ? { ogImage } : {}),
    navigation: [
      { _type: "navItem", _key: key(), label: "HOME", link: "/", emphasis: true },
      { _type: "navItem", _key: key(), label: "WORK", link: "/work", emphasis: true },
      { _type: "navItem", _key: key(), label: "Studio", link: "/work?category=studio", emphasis: false },
      { _type: "navItem", _key: key(), label: "VFX", link: "/work?category=vfx", emphasis: false },
      { _type: "navItem", _key: key(), label: "Broadcast", link: "/work?category=broadcast", emphasis: false },
      { _type: "navItem", _key: key(), label: "Originals", link: "/work?category=originals", emphasis: false },
      { _type: "navItem", _key: key(), label: "ABOUT", link: "/about", emphasis: true },
    ],
    menuContact: {
      dropInHeading: "Drop in:",
      address: "Los Angeles, CA",
      getInTouchHeading: "Get in touch:",
      phone: "+1 (310) 555-1212",
      email: "hello@gtgstudios.com",
    },
    socialLinks: [
      { _type: "socialLink", _key: key(), platform: "linkedin", url: "https://www.linkedin.com" },
      { _type: "socialLink", _key: key(), platform: "instagram", url: "https://www.instagram.com" },
      { _type: "socialLink", _key: key(), platform: "vimeo", url: "https://vimeo.com" },
    ],
  });

  console.log("→ Hero");
  await client.createOrReplace({
    _id: "hero",
    _type: "hero",
    backgroundVideoId: "l4qXAeMAWUI",
    showreelVideoId: "l4qXAeMAWUI",
    playButtonLabel: "Play Showreel",
  });

  console.log("→ Home Page");
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    introText:
      "We are a full-service film and video production company that fuses emotion, craft and ambition to make engaging content for ambitious brands and global audiences.",
    workVideoId: "Bcpu-jqAL6w",
    brandsHeading:
      "We work with the biggest brands, broadcasters, agencies and marketers, in collaboration with the best creative minds around.",
    brandLogos,
    accoladesHeading: "Accolades",
    accoladeLogos,
  });

  console.log("→ Work Page");
  await client.createOrReplace({
    _id: "workPage",
    _type: "workPage",
    heading: "WORK",
  });

  console.log("→ About Page");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "ABOUT",
    paragraphs: ABOUT_PARAGRAPHS,
    teamHeading: "Our Team",
    teamMembers,
  });

  console.log("→ Footer");
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    getInTouchHeading: "Get in touch:",
    phone: "+1 (310) 555-1212",
    email: "hello@gtgstudios.com",
    dropInHeading: "Drop in:",
    address: "Los Angeles, CA",
    legalText:
      "GTG Studios. Content on this site may have been changed from the original broadcast version for display purposes. All rights reserved.",
    footerLinks: [
      { _type: "footerLink", _key: key(), label: "Instagram", link: "https://www.instagram.com" },
      { _type: "footerLink", _key: key(), label: "LinkedIn", link: "https://www.linkedin.com" },
      { _type: "footerLink", _key: key(), label: "Vimeo", link: "https://vimeo.com" },
      { _type: "footerLink", _key: key(), label: "Privacy", link: "/privacy" },
      { _type: "footerLink", _key: key(), label: "Terms", link: "/terms" },
    ],
  });

  console.log("→ Privacy + Terms");
  await client.createOrReplace({
    _id: "privacyPage",
    _type: "privacyPage",
    title: "Privacy Policy",
    body: [
      block("Privacy Policy", "h2"),
      block("GTG Studios (“we”, “us”) respects your privacy. This policy explains what information we collect when you visit our website and how we use it."),
      block("Information We Collect", "h3"),
      block("We collect only the information you choose to share with us — for example when you contact us by email or phone. Our site does not require an account and does not collect personal information automatically beyond standard server logs."),
      block("How We Use Information", "h3"),
      block("Information you share is used solely to respond to your enquiry. We do not sell or share your personal information with third parties."),
      block("Contact", "h3"),
      block("Questions about this policy? Contact us at hello@gtgstudios.com."),
    ],
  });
  await client.createOrReplace({
    _id: "termsPage",
    _type: "termsPage",
    title: "Terms of Service",
    body: [
      block("Terms of Service", "h2"),
      block("By accessing this website you agree to the following terms. If you do not agree, please do not use the site."),
      block("Content", "h3"),
      block("All content on this site — including films, images, and text — is owned by GTG Studios or its clients and is protected by copyright. Content may have been changed from the original broadcast version for display purposes. You may not reproduce, distribute, or use any content without written permission."),
      block("Liability", "h3"),
      block("This site is provided “as is” without warranties of any kind. GTG Studios is not liable for any damages arising from your use of the site."),
      block("Contact", "h3"),
      block("Questions about these terms? Contact us at hello@gtgstudios.com."),
    ],
  });

  console.log("\n✓ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

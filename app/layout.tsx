import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/lib/queries";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);

  return {
    title: settings?.siteTitle ?? "GTG Studios — Film & Video Production",
    description:
      settings?.siteDescription ??
      "GTG Studios is a full-service film and video production company crafting compelling content for ambitious brands and global audiences.",
    ...(settings?.faviconUrl
      ? { icons: { icon: [{ url: settings.faviconUrl }] } }
      : {}),
    ...(settings?.ogImageUrl
      ? {
          openGraph: {
            images: [{ url: `${settings.ogImageUrl}?w=1200&h=630&fit=crop`, width: 1200, height: 630 }],
          },
          twitter: { card: "summary_large_image" },
        }
      : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

import AboutClient from "./AboutClient";
import { getAboutPage, getFooter, getSiteSettings } from "@/sanity/lib/queries";

export default async function AboutPage() {
  const [about, footer, settings] = await Promise.all([
    getAboutPage().catch(() => null),
    getFooter().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <AboutClient
      about={about}
      footer={footer}
      wordmarkUrl={settings?.wordmarkLogoUrl}
    />
  );
}

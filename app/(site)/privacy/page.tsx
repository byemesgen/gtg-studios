import LegalPage from "../components/LegalPage";
import { getFooter, getPrivacyPage, getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const page = await getPrivacyPage().catch(() => null);
  return { title: page?.title ?? "Privacy Policy" };
}

export default async function PrivacyPage() {
  const [page, footer, settings] = await Promise.all([
    getPrivacyPage().catch(() => null),
    getFooter().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  return (
    <LegalPage page={page} footer={footer} wordmarkUrl={settings?.wordmarkLogoUrl} />
  );
}

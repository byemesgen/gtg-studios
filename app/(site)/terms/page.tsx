import LegalPage from "../components/LegalPage";
import { getFooter, getTermsPage, getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const page = await getTermsPage().catch(() => null);
  return { title: page?.title ?? "Terms of Service" };
}

export default async function TermsPage() {
  const [page, footer, settings] = await Promise.all([
    getTermsPage().catch(() => null),
    getFooter().catch(() => null),
    getSiteSettings().catch(() => null),
  ]);
  return (
    <LegalPage page={page} footer={footer} wordmarkUrl={settings?.wordmarkLogoUrl} />
  );
}

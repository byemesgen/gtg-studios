import LegalPage from "../components/LegalPage";
import { getFooter, getPrivacyPage } from "@/sanity/lib/queries";

export async function generateMetadata() {
  const page = await getPrivacyPage().catch(() => null);
  return { title: page?.title ?? "Privacy Policy" };
}

export default async function PrivacyPage() {
  const [page, footer] = await Promise.all([
    getPrivacyPage().catch(() => null),
    getFooter().catch(() => null),
  ]);
  return <LegalPage page={page} footer={footer} />;
}

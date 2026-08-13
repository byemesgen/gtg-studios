import AboutClient from "./AboutClient";
import { getAboutPage, getFooter } from "@/sanity/lib/queries";

export default async function AboutPage() {
  const [about, footer] = await Promise.all([
    getAboutPage().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return <AboutClient about={about} footer={footer} />;
}

import Hero from "@/app/components/Hero";
import AnimatedText from "@/app/components/AnimatedText";
import Work from "@/app/components/Work";
import Brands from "@/app/components/Brands";
import Accolades from "@/app/components/Accolades";
import Footer from "@/app/components/Footer";
import {
  getHomePage,
  getSiteSettings,
  getWorkCategories,
  getFooter,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [home, settings, categories, footer] = await Promise.all([
    getHomePage().catch(() => null),
    getSiteSettings().catch(() => null),
    getWorkCategories().catch(() => []),
    getFooter().catch(() => null),
  ]);

  return (
    <main>
      <Hero
        slides={home?.heroSlides}
        wordmarkUrl={settings?.wordmarkLogoUrl}
      />
      <AnimatedText text={home?.introText} />
      <Work videoId={home?.workVideoId} categories={categories} />
      <Brands heading={home?.brandsHeading} logos={home?.brandLogos} />
      <Accolades heading={home?.accoladesHeading} logos={home?.accoladeLogos} />
      <Footer data={footer} wordmarkUrl={settings?.wordmarkLogoUrl} />
    </main>
  );
}

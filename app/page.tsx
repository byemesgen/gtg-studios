import Hero from "@/app/components/Hero";
import AnimatedText from "@/app/components/AnimatedText";
import Work from "@/app/components/Work";
import Brands from "@/app/components/Brands";
import Accolades from "@/app/components/Accolades";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AnimatedText />
      <Work />
      <Brands />
      <Accolades />
      <Footer />
    </main>
  );
}

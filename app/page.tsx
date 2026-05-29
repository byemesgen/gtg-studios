import Hero from "@/app/components/Hero";
import AnimatedText from "@/app/components/AnimatedText";
import Work from "@/app/components/Work";
import Clients from "@/app/components/Clients";
import Services from "@/app/components/Services";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AnimatedText />
      <Work />
      <Clients />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

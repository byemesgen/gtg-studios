import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import Clients from "@/app/components/Clients";
import Services from "@/app/components/Services";
import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Clients />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

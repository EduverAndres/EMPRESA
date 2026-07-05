import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import MissionVision from "@/components/MissionVision";
import Process from "@/components/Process";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <MissionVision />
        <Process />
        <Services />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

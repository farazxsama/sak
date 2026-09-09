import Image from "next/image";
import HeroSection from "@/components/Home/HeroSection";
import About from "@/components/Home/About";
import Services from "@/components/Home/Services"
import FeaturedProjects from "@/components/Home/FeaturedProjects";
import TrustedBy from "@/components/Home/TrustedBy";
import Stats from "@/components/Home/Stats";
import Process from "@/components/Home/Process";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <About/>
      <Services/>
      <FeaturedProjects/>
      <TrustedBy/>
      <Stats/>
      <Process/>
      <CTA/>
    </>
  );
}

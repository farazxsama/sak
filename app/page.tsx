
import Hero from "@/components/Home3d/Hero";
import Statement from "@/components/Home3d/Statement";
import BrandingSection from "@/components/Home3d/BrandingSection";

import ArrowImageSection from "@/components/Home3d/ArrowImageSection"
import Services from "@/components/Home/Services"
import FeaturedProjects from "@/components/Home/FeaturedProjects";
import Services3d from "@/components/Home3d/Services3d";
import TrustedBy from "@/components/Home/TrustedBy";
import Stats from "@/components/Home/Stats";
import Process from "@/components/Home/Process";
import CTA from "@/components/Home/CTA";


export default function Home() {
  return (
    <>
     {/* 3d hero */}
      <Hero/> 

     {/* 3d find statement */}
      {/* <Statement/> */}
      <BrandingSection/>

      {/* <Services/> */}
      <Stats/>
      <Services/>

      {/* 3d arrow image section */}
      <ArrowImageSection/>

      <FeaturedProjects/>

      {/* Services 3d */}
      <Services3d/>

     
      <TrustedBy/>
      <Process/>
      <CTA/>
    </>
  );
}

import './home.css';
import HeroSection from '@/components/Home/HeroSection';
import About from '@/components/Home/About';
import Services from '@/components/Home/Services';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import TrustedBy from '@/components/Home/TrustedBy';
import Stats from '@/components/Home/Stats';
import Process from '@/components/Home/Process';
import CTA from '@/components/Home/CTA';
import ExperienceCanvas from '@/components/Home/3D/ExperienceCanvas';
import ScrollProvider from '@/components/Home/ScrollProvider';

export default function Home() {
  return (
    <ScrollProvider>
      <div
        id="home-experience"
        className="relative min-h-screen text-[#292722] selection:bg-[#C6A15B] selection:text-[#292722] overflow-x-hidden"
      >
        <ExperienceCanvas />

        <main className="relative z-10">
            <HeroSection />
            <About />
            <Services />
            <FeaturedProjects />
            <TrustedBy />
            <Stats />
            <Process />
            <CTA />
        </main>
      </div>
    </ScrollProvider>
  );
}


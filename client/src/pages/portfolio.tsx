import { useEffect } from "react";
import Navigation from "@/components/portfolio/navigation";
import HeroSection from "@/components/portfolio/hero-section";
import AboutSection from "@/components/portfolio/about-section";
import PortfolioSection from "@/components/portfolio/portfolio-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import ContactSection from "@/components/portfolio/contact-section";
import Footer from "@/components/portfolio/footer";
import Chatbot from "@/components/portfolio/chatbot";

export default function Portfolio() {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.classList.add('smooth-scroll');
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </div>
  );
}

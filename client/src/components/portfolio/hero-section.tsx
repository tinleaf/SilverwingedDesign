import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github } from "lucide-react";
// Using public folder for reliable asset loading in production

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 pb-20 bg-black relative" style={{ backgroundImage: 'url(/images/Background_1751294827149.png)', backgroundSize: 'cover', backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-slide-up text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Data-Driven
              <span style={{ color: 'hsl(var(--custom-grey-text))' }}> UX Designer</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I turn data into information and information into insight. I design user-centered experiences across multiple apps and real-world interactions by integrating AI and classic data analysis of feedback to promote data-driven development decisions within budget and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('#portfolio')}
                className="bg-primary text-white hover:bg-[#145017]"
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Get In Touch
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center">
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

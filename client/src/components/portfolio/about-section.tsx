import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import type { Skill } from "@shared/schema";
// Using public folder for reliable asset loading in production

export default function AboutSection() {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">About Me</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data-driven UX designer turning insights into powerful user experiences through research and validation
          </p>
        </div>
        
        <div className="text-center">
          {/* Profile image - centered and above header on mobile */}
          <div className="md:hidden mb-8">
            <img 
              src="/images/profile_1751296289128.jpg"
              alt="Kirsi Rohbock - UX Designer" 
              className="rounded-xl shadow-lg w-48 h-48 object-cover grayscale mx-auto" 
            />
          </div>
          
          <h3 className="text-2xl font-bold text-black mb-6">Data-driven Design is User-centered Design</h3>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8 max-w-2xl mx-auto text-left">
            <div className="flex-1">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Great design is more than visual—it integrates into the patterns and habits that shape our lives. Designing a powerful user experience requires data on these patterns. Finding patterns in complex data through user research and machine learning promotes user-centered development decisions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                My UX process is flexible to timelines, business needs, and funding. I begin and end with research to identify the correct problem and validate direction throughout implementation, accelerating development to benefit users and businesses.
              </p>
            </div>
            {/* Profile image - side by side on desktop */}
            <div className="hidden md:block flex-shrink-0">
              <img 
                src="/images/profile_1751296289128.jpg"
                alt="Kirsi Rohbock - UX Designer" 
                className="rounded-xl shadow-lg w-48 h-48 object-cover grayscale" 
              />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : (
                skills?.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Experience, Project } from "@shared/schema";
// Using public folder for reliable asset loading in production

// Map case studies to experience periods based on years
const getCaseStudiesForExperience = (experiencePeriod: string, company: string, projects: Project[]): Project[] => {
  if (!projects) return [];
  
  // Extract years from experience period
  const periodMatch = experiencePeriod.match(/(\d{4})/g);
  if (!periodMatch) return [];
  
  const startYear = parseInt(periodMatch[0]);
  const endYear = experiencePeriod.includes('Present') ? 2025 : (periodMatch[1] ? parseInt(periodMatch[1]) : startYear);
  
  // Special rule: Software Technology Group should not show any case studies
  if (company === "Software Technology Group") {
    return [];
  }
  
  return projects.filter(project => {
    const projectYear = parseInt(project.year);
    return projectYear >= startYear && projectYear <= endYear;
  });
};

export default function ExperienceSection() {
  const { data: experiences, isLoading: experiencesLoading } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const isLoading = experiencesLoading || projectsLoading;

  return (
    <section 
      id="experience" 
      className="py-20"
      style={{ backgroundColor: 'hsl(0, 0%, 98%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Experience Timeline</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My journey in UX design and the impact I've created along the way
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-400"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="flex-1 pr-8">
                    <Card 
                      className="bg-white shadow-lg border border-gray-200 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow"></div>
                  <div className="flex-1 pl-8"></div>
                </div>
              ))
            ) : (
              experiences?.map((experience, index) => {
                const relevantCaseStudies = getCaseStudiesForExperience(experience.period, experience.company, projects || []);
                
                return (
                  <div key={experience.id} className="relative flex items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="flex-1 pr-8 text-right">
                          <Card 
                            className="bg-white shadow-lg border border-gray-200 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: "url(/images/Background-wht_1751295905079.png)" }}
                          >
                            <CardContent className="p-6">
                              <div className="text-sm text-gray-500 mb-1">{experience.period}</div>
                              <h3 className="text-xl font-bold text-black mb-2">{experience.position}</h3>
                              <p className="text-primary font-medium mb-2">{experience.company}</p>
                              <p className="text-gray-600 mb-4">{experience.description}</p>
                              
                              {relevantCaseStudies.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold text-black mb-2">Related Case Studies:</h4>
                                  <div className="flex flex-wrap gap-2 justify-end">
                                    {relevantCaseStudies.map((project) => (
                                      <Link key={project.id} href={`/case-study/${project.id}`}>
                                        <Badge 
                                          variant="secondary" 
                                          className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                                        >
                                          {project.title}
                                        </Badge>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow ${
                          experience.current ? 'bg-primary' : 'bg-primary'
                        }`}></div>
                        <div className="flex-1 pl-8"></div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 pr-8"></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow ${
                          experience.current ? 'bg-primary' : 'bg-primary'
                        }`}></div>
                        <div className="flex-1 pl-8">
                          <Card 
                            className="bg-white shadow-lg border border-gray-200 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: "url(/images/Background-wht_1751295905079.png)" }}
                          >
                            <CardContent className="p-6">
                              <div className="text-sm text-gray-500 mb-1">{experience.period}</div>
                              <h3 className="text-xl font-bold text-black mb-2">{experience.position}</h3>
                              <p className="text-primary font-medium mb-2">{experience.company}</p>
                              <p className="text-gray-600 mb-4">{experience.description}</p>
                              
                              {relevantCaseStudies.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="text-sm font-semibold text-black mb-2">Related Case Studies:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {relevantCaseStudies.map((project) => (
                                      <Link key={project.id} href={`/case-study/${project.id}`}>
                                        <Badge 
                                          variant="secondary" 
                                          className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                                        >
                                          {project.title}
                                        </Badge>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
// Using public folder for reliable asset loading in production

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "research", label: "Research" },
    { key: "design", label: "Design" },
    { key: "mentor", label: "Mentorship" },
  ];

  const filteredProjects = projects?.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  ) || [];

  return (
    <section 
      id="portfolio" 
      className="py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundColor: 'hsl(var(--custom-grey))', backgroundImage: 'url(/images/Background-gry_1751295870038.png)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My UX process in action: Research, Define, Ideate, Design, Validate, and Mentor
          </p>
        </div>
        
        {/* Portfolio Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full transition-colors ${
                activeFilter === filter.key 
                  ? "bg-primary text-white" 
                  : "bg-white text-black hover:text-primary"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="portfolio-card overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="portfolio-card bg-white shadow-lg overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {project.tags?.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className={`text-xs ${
                          tag.toLowerCase().includes('mobile') ? 'bg-blue-100 text-blue-800' :
                          tag.toLowerCase().includes('web') || tag.toLowerCase().includes('saas') ? 'bg-purple-100 text-purple-800' :
                          tag.toLowerCase().includes('research') ? 'bg-red-100 text-red-800' :
                          tag.toLowerCase().includes('e-commerce') ? 'bg-orange-100 text-orange-800' :
                          tag.toLowerCase().includes('healthcare') ? 'bg-teal-100 text-teal-800' :
                          tag.toLowerCase().includes('fitness') ? 'bg-pink-100 text-pink-800' :
                          tag.toLowerCase().includes('education') ? 'bg-purple-100 text-purple-800' :
                          tag.toLowerCase().includes('dashboard') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.year}</span>
                    <Link href={`/case-study/${project.id}`}>
                      <Button 
                        variant="link" 
                        className="text-primary hover:text-[#145017] font-medium p-0"
                      >
                        View Case Study
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

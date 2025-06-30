import { 
  users, 
  projects,
  experiences,
  skills,
  contacts,
  chatMessages,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill,
  type Contact,
  type InsertContact,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio methods
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  
  getAllExperiences(): Promise<Experience[]>;
  getAllSkills(): Promise<Skill[]>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  
  saveChatMessage(chatMessage: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private experiences: Map<number, Experience>;
  private skills: Map<number, Skill>;
  private contacts: Map<number, Contact>;
  private chatMessages: Map<number, ChatMessage>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.experiences = new Map();
    this.skills = new Map();
    this.contacts = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;
    
    this.initializePortfolioData();
  }

  private initializePortfolioData() {
    // Initialize projects
    const initialProjects: Project[] = [
      {
        id: 1,
        title: "Research Case Study",
        description: "Research to gather user needs and analyze proposed solutions. Cost-effective research that saves money and time through user interviews and data analysis.",
        category: "research",
        tags: ["User Research", "Data Analysis"],
        year: "2020",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/research-case-study_orig.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/research-case-study.html"
      },
      {
        id: 2,
        title: "Define Case Study",
        description: "Workflow mapping to define needs before investing in development. Communicating how research impacts requirements across teams.",
        category: "research",
        tags: ["Workflows", "User Journeys"],
        year: "2018",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/requirements_orig.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/define-case-study.html"
      },
      {
        id: 3,
        title: "Ideate Case Study",
        description: "Multi-discipline requirements gathering sessions using whiteboards and collaboration workshops to find solutions.",
        category: "design",
        tags: ["Collaboration", "Workshops"],
        year: "2020",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/editor/whiteboard.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/ideate-case-study.html"
      },
      {
        id: 4,
        title: "Design Case Study",
        description: "Creating wireframes and high-fidelity mockups. Wireframes provide the best ROI for collaboration and implementation.",
        category: "design",
        tags: ["Wireframes", "Prototyping"],
        year: "2016",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/design_orig.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/design-case-study.html"
      },
      {
        id: 5,
        title: "Validate Case Study",
        description: "End-to-end, task-based user tests that help teams iterate, regroup, and adapt to changing requirements.",
        category: "research",
        tags: ["User Testing", "Analytics"],
        year: "2017",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/published/video-interview.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/validate-case-study.html"
      },
      {
        id: 6,
        title: "Mentorship Philosophy",
        description: "Training materials and workshops to advocate user research in development sprints and democratize design.",
        category: "mentor",
        tags: ["Training", "Advocacy"],
        year: "2021",
        imageUrl: "https://silverwingeddesign.weebly.com/uploads/1/2/5/6/125671218/published/research-documentation.png",
        caseStudyUrl: "https://silverwingeddesign.weebly.com/mentor.html"
      }
    ];

    initialProjects.forEach(project => {
      this.projects.set(project.id, project);
    });

    // Initialize experiences
    const initialExperiences: Experience[] = [
      {
        id: 1,
        position: "Lead UX Designer",
        company: "Church of Jesus Christ of Latter-day Saints",
        period: "Jun 2021 - Present",
        description: "Developed design system for BYU-Pathway products. Led end-to-end design process for large-scale product initiatives for the finance department. Conducted accessibility compliance audit ensuring WCAG 2.2 AA standards. Coordinated design team efforts to define and evolve design patterns across products.",
        current: true
      },
      {
        id: 2,
        position: "Sr. UX Designer",
        company: "Software Technology Group",
        period: "Jul 2020 - Jun 2021",
        description: "Designed international issue tracking and map illustration web applications using agile design. Researched user needs through online workshops, prototyped and user tested in Figma and with live code. Created and tested accessibility audit and implementation plan for WCAG A, AA, and AAA standards.",
        current: false
      },
      {
        id: 3,
        position: "Sr. UI/UX Designer & Researcher",
        company: "Willis Towers Watson",
        period: "Jan 2017 - Jul 2020",
        description: "Developed design program for internal tools department. Solved complex dependencies for insurance application manager, service, and micro front ends for web and mobile. Solicited feedback from internal and external users through website-triggered surveys, email requests, and in-person interviews. Mentored mid-level and entry-level designers.",
        current: false
      },
      {
        id: 4,
        position: "UI/UX Designer",
        company: "ProKarma: Church of Jesus Christ of Latter-day Saints",
        period: "Feb 2015 - Dec 2016",
        description: "Gathered requirements and conducted collaborative strategic design for mobile planner, mapping, and lesson management application. Designed, gathered and documented user interface requirements for referral management and employee management applications. Prototyped user experience solutions and presented to users and managers.",
        current: false
      },
      {
        id: 5,
        position: "Graphic Design Coordinator",
        company: "Western Governors University",
        period: "Nov 2012 - Feb 2015",
        description: "Managed and budgeted print projects, including multi-page brochures and direct mail campaigns. Helped develop refreshed brand guidelines, streamlining design across 6 campuses and 5 colleges.",
        current: false
      },
      {
        id: 6,
        position: "Graphic Designer/Marketing Coordinator",
        company: "Centershift Inc.",
        period: "Jun 2012 - Oct 2013",
        description: "Worked with developers on mobile and web applications. Designed and conducted social media and print campaigns that set a new bar for the industry. Budgeted, interviewed and hired third party resources for self-storage trade shows. Managed social media including Facebook, Twitter, Google+ and LinkedIn, increasing online participation by 500%.",
        current: false
      }
    ];

    initialExperiences.forEach(experience => {
      this.experiences.set(experience.id, experience);
    });

    // Initialize skills
    const initialSkills: Skill[] = [
      { id: 1, name: "Design Systems Development", percentage: 95 },
      { id: 2, name: "Data-Driven Decision Making", percentage: 95 },
      { id: 3, name: "Design Advocacy", percentage: 93 },
      { id: 4, name: "User Research & Interviews", percentage: 93 },
      { id: 5, name: "Accessibility Design (WCAG)", percentage: 92 },
      { id: 6, name: "Cross-functional Leadership", percentage: 90 },
      { id: 7, name: "Systems Thinking", percentage: 89 },
      { id: 8, name: "Figma & Prototyping", percentage: 100 },
      { id: 9, name: "Strategic Thinking", percentage: 85 },
      { id: 10, name: "Adaptability & Change Management", percentage: 84 },
      { id: 11, name: "Stakeholder Management", percentage: 82 },
      { id: 12, name: "Facilitation & Workshop Leadership", percentage: 82 },
      { id: 13, name: "User Testing & Analytics", percentage: 91 },
      { id: 14, name: "Mentorship & Training", percentage: 88 },
      { id: 15, name: "Mobile-first Design", percentage: 88 },
      { id: 16, name: "Agile & DevSecOps", percentage: 82 },
      { id: 17, name: "Data Visualization", percentage: 85 },
      { id: 18, name: "HTML/CSS/JavaScript", percentage: 78 },
      { id: 19, name: "React & Modern Frameworks", percentage: 58 }
    ];

    initialSkills.forEach(skill => {
      this.skills.set(skill.id, skill);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.category === category
    );
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values());
  }

  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      company: insertContact.company || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async saveChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId++;
    const chatMessage: ChatMessage = { 
      ...insertChatMessage, 
      id, 
      createdAt: new Date() 
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values());
  }
}

export const storage = new MemStorage();

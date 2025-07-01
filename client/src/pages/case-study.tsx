import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";
import Navigation from "@/components/portfolio/navigation";
import Footer from "@/components/portfolio/footer";

export default function CaseStudy() {
  const [match, params] = useRoute("/case-study/:id");
  const projectId = params?.id ? parseInt(params.id) : null;

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const project = projects?.find(p => p.id === projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Link href="/#portfolio">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#portfolio">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className="text-sm text-gray-500">
              Project Year: {project.year}
            </div>
          </div>

          {project.imageUrl && (
            <div className="mb-12 w-1/2 mx-auto">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {getCaseStudyContent(project)}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-gray-600 mb-8">
            Let's discuss how data-driven design can help your project succeed.
          </p>
          <Link href="/#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function getCaseStudyContent(project: Project) {
  switch (project.id) {
    case 1: // Research Case Study
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem</h2>
            <p className="text-gray-600 mb-6">
              Medicare-eligible customers with funding from previous employers are <strong>frustrated</strong> at:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• <strong>Having to call in to get information</strong> on missing premium reimbursements</li>
              <li>• <strong>Being bounced around various call center employees</strong> when trying to get to the bottom of funding issues</li>
              <li>• Getting <strong>the wrong answer</strong> to various funding questions</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Goals</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reduce Call Times</h3>
                <p className="text-gray-600">Streamline the processes to <strong>reduce the number of transfers</strong> and the time it takes to find an answer</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Increase Accuracy</h3>
                <p className="text-gray-600">Display funding information clearly so the <strong>correct answer can be found</strong> quickly</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Improve Training</h3>
                <p className="text-gray-600">Make sure that <strong>call center employees understand how funding works</strong> and give consistent answers to customers</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Research Approach</h2>
            <p className="text-gray-600 mb-6">
              This was the <strong>first user research initiative of its kind</strong> within the company. I conducted interviews with <strong>7 customer support representatives</strong> - 4 junior level and 3 senior level staff - to understand their current workflows and pain points. The research was <strong>enthusiastically received by call center managers</strong>, who had been seeking data-driven solutions to improve their team's efficiency.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenges</h2>
            <p className="text-gray-600 mb-6">
              At the beginning of the project, Medicare-eligible customers would <strong>notice their reimbursement</strong> hadn't arrived in time. They would then <strong>call in to the call center</strong>, and be <strong>routed to a funding representative</strong>. The funding rep would use up to five different tools to 1) <strong>discover the specific rules</strong> for that customer and the specific account, 2) <strong>research the most recent payments</strong> made, and 3) <strong>review the account information</strong> and eligible expenses. It could take anywhere from 20 - 60 minutes.
            </p>
            <p className="text-gray-600 italic">"We have too many places to look for an answer."</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Solution</h2>
            <p className="text-gray-600 mb-6">
              Our product manager was also a funding subject matter expert. He knew funding inside and out, and had an Excel-based design that he believed would help customer service representatives (CSRs) answer questions quickly and easily. <strong>I had some concerns</strong> that the solution wouldn't be enough to clearly communicate the reasons a customer hadn't received their funding. In order to smooth the process, <strong>my first step was to mock up his solution</strong> in Figma, and then also mock up a proposed alternative.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proposed Solution A</h3>
                <p className="text-gray-600">Solution A: the timeline view had the advantage of an information hierarchy meant to <strong>show the interactions of the various rules</strong> for each monthly reimbursement and how they affected the final payment. The concern was that it would still be confusing, unless the user already understood how funding worked.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Proposed Solution B</h3>
                <p className="text-gray-600">Solution B: the record view had the advantage of more clearly showing time-based transactions, similar to a more familiar bank history structure. The disadvantage was that it <strong>didn't always show changes as clearly</strong>, since changes that affected one month could happen months later or earlier.</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Methods</h2>
            <p className="text-gray-600 mb-6">
              We decided to run an A-B, B-A test with a sample of 9 CSRs and funding representatives of various levels of experience. First, I <strong>spot tested each design</strong> with a few CSRs, and <strong>made some adjustments</strong> to both. I then <strong>mocked up two different scenarios</strong> in each improved design. We presented a simple scenario in one of the designs, then a more complex scenario in the other design, <strong>randomly assigning each test structure to the participating CSRs</strong>. The tests were created in Usertesting.com, and sent to participating CSRs for <strong>unmoderated, recorded user tests</strong>.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Results & Impact</h2>
            <div className="bg-primary/5 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Outcomes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">72%</div>
                  <p className="text-gray-600">Reduction in call time for funding-related inquiries</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <p className="text-gray-600">Success rate in identifying problems correctly</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lessons Learned</h3>
            <p className="text-gray-600 mb-6">
              Of the nine respondents, <strong>only one preferred the original timeline view</strong>, the rest found it confusing. We also had only <strong>30% success in identifying the correct problem using the timeline</strong>, and only <strong>70% success identifying the problem on the record view</strong>.
            </p>
            <p className="text-gray-600 mb-6">
              The one positive respondent was an expert in funding issues and already understood the basics of how it worked. Digging into her reasoning proved to us that <strong>there was value in the timeline that could not be replicated in the record view</strong>, so we decided to <strong>combine the two</strong>. That way, CSRs would have two different ways to look for relevant data in the same place. The <strong>record section showed when updates were applied</strong>. The <strong>timeline section displayed how the different rules combined to block a reimbursement</strong>.
            </p>
            <p className="text-gray-600">
              We combined the two views, made some changes to the timeline view to make it less cluttered and more intuitive, and tested again. This time, we achieved <strong>over 98% success on both tasks</strong> and <strong>reduced call times by 72%</strong> for funding-related inquiries. CSRs <strong>demonstrated good understanding</strong> of the complexities involved in answering funding questions, and <strong>the UI helped educate those who were initially less certain</strong>. The <strong>three-layered testing strategy</strong> helped us come to a usable solution <strong>within only 2 weeks</strong>.
            </p>
          </div>
        </div>
      );

    case 2: // Define Case Study
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem</h2>
            <p className="text-gray-600 mb-6">
              Data management team members (CPDI Analysts) are <strong>frustrated</strong> at:
            </p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• <strong>How long it takes to load data</strong></li>
              <li>• <strong>How much they need to re-write</strong> what is loaded before insurance carriers will approve the plan descriptions</li>
              <li>• The need to use <strong>multiple tools to manage</strong> different kinds of plan data</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Goals</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lower Cost</h3>
                <p className="text-gray-600">Streamline processes and tools to <strong>lower the cost of loading data</strong> through automation</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Update Technology</h3>
                <p className="text-gray-600">Update old technology and tools with a <strong>single, versatile application</strong></p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Improve Data Structure</h3>
                <p className="text-gray-600">Create a data structure that gives <strong>more granularity and flexibility</strong> for different plan types</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenges</h2>
            <p className="text-gray-600 mb-6">
              We had <strong>less than six months</strong> to completely refactor the old tools, a <strong>previous redesign effort had already partially failed</strong>, further complicating the workflows, and <strong>each plan type had different standardized files formats</strong> that needed to be processed and rendered in ways that could be displayed clearly and accurately on the end website.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Solution</h2>
            <p className="text-gray-600 mb-6">
              Because time was short, it was important to <strong>interview the users</strong> and map how they currently loaded plan data, as well as <strong>document variations between different plan types</strong>.
            </p>
            <p className="text-gray-600 mb-6">
              I scheduled an aggressive interview schedule, interviewing 4 data team members in a single day. I validated the workflow with more team members the next day, identifying pain points, opportunities for improvement, and potential solutions.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Within a week</strong>, we were able to <strong>build user stories and designs based on real-world experience</strong>.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Methods</h2>
            <p className="text-gray-600 mb-6">
              Typically, ideal team workflows are created and managed by team supervisors. In order to get to the bottom of how work was actually being done, I decided to start with <strong>end user open-ended interviews</strong>. This allowed me to better identify problems in the current tools without introducing bias. For this to work, I needed to get <strong>research approval from stakeholders</strong>, <strong>interview analysts</strong>, <strong>synthesize the data into a current workflow</strong>, then <strong>identify pain points</strong> and <strong>present a revised workflow</strong> to stakeholders and the development team.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lessons Learned</h2>
            <p className="text-gray-600">
              By interviewing the data management team, we learned several points in the two existing tools required extensive workarounds. By going directly to those who loaded and managed plan data, we were able to <strong>cut design iterations by 60%</strong>, and <strong>reduce issues found in the prototyping phase</strong>. Only a week's worth of research <strong>gave the team a solid plan</strong>, <strong>increased confidence</strong> in making design and development decisions, and <strong>reduced back-and-forth among stakeholders</strong>.
            </p>
          </div>
        </div>
      );

    case 3: // Ideate Case Study
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem</h2>
            <p className="text-gray-600 mb-6">
              <strong>Hack-a-thon challenge</strong>: Develop a solution that can add business value.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Initial idea</strong>: Find a way to implement machine learning in online search that integrates into existing customer help channels.
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Collaboration workshop</strong>: I ran a workshop with our hack-a-thon team to brainstorm ideas, prioritize team goals, and identify the idea we wanted to present.
            </p>
            <p className="text-gray-600">
              <strong>Collaborative solution</strong>: A cognitive intercept that can integrate machine learning into existing help channels, which presents a much lower risk of abandonment, and allows AI-based customer interactions to be slowly introduced and tested without disrupting existing experiences.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Goals</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lower Cost</h3>
                <p className="text-gray-600">Streamline processes and tools to <strong>lower the cost of supporting customers</strong> through automated machine learning</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Increase Satisfaction</h3>
                <p className="text-gray-600">Help customers find answers to their questions <strong>with a seamless, non-interruptive solution</strong></p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Improve Search</h3>
                <p className="text-gray-600">Create metadata for search results that enables <strong>more accurate answers</strong> with a minimum of upfront data cleaning</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Challenges</h2>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Only <strong>one week</strong> to implement a proof-of-concept while <strong>still completing our normal workload</strong></li>
              <li>• <strong>None of our team had previous machine learning experience</strong></li>
              <li>• None of us had worked together as a team previously, so we <strong>needed to organize and pull together</strong></li>
              <li>• Current search was <strong>completely broken</strong></li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Solution</h2>
            <p className="text-gray-600 mb-6">
              We used an existing data set and added our existing help files. Using a lower lane, we mocked up a search experience that would implement cognitive intercept. I was in charge of <strong>cleaning the data</strong>, identifying and <strong>testing a use case</strong>, <strong>presenting our ideas</strong> and <strong>building the business case</strong> while my teammates focused on developing the necessary code for a demo.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Methods</h2>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• Used an <strong>existing medical insurance data set</strong> for basic conversational interactions, and enhanced it with our own data</li>
              <li>• Research the potential <strong>financial gain</strong></li>
              <li>• Used Microsoft bot framework (QnA Maker), React components for bot UI, and Azure Cognitive Services which allowed us to <strong>ingest and process our data</strong></li>
              <li>• <strong>Shadowed customer support representatives</strong> to identify and test a good use case for the proof-of-concept</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lessons Learned</h2>
            <p className="text-gray-600">
              I learned the importance of showing ROI and financial potential for ideas. Our presentation helped us win the Hack-a-thon, because we went beyond simple solutions and built an actual business case.
            </p>
          </div>
        </div>
      );

    case 4: // Design Case Study - AreaBook
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
            <p className="text-gray-600 mb-4">AreaBook should enable religious teachers (missionaries) to:</p>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>• <strong>Schedule</strong> appointments with interested people and <strong>review schedule</strong> with an eye to efficiently utilize remaining time</li>
              <li>• <strong>Track teaching pathways</strong> for interested people</li>
              <li>• <strong>Track progress</strong> and set goals for key performance indicators</li>
              <li>• <strong>Find appointment locations</strong> and map travel routes</li>
              <li>• <strong>Sync information</strong> across multiple devices and from multiple data sets while <strong>protecting sensitive data</strong></li>
            </ul>
            <p className="text-gray-600">And it had to <strong>function offline</strong> with minimal battery use on both Android and iOS devices, so that the app could be used worldwide.</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem to Solve - How do we...?</h2>
            <p className="text-gray-600 mb-6">
              Besides maintaining an old web-based version of the app, we <strong>had development at different places</strong> on our Apple and Android apps, and we had several key features that still needed to be developed. Once we got the platforms in sync, we needed to <strong>implement a planning feature</strong> that would allow scheduling various activities, and filling schedule holes. At this point, AreaBook was mostly just a map application with a contact list.
            </p>
            <p className="text-gray-600">
              My first order of business was to review the features in both major platforms. After review, another designer and I were able to get feature parity within only a few sprints.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The State of the Project</h2>
            <p className="text-gray-600 mb-6">
              We started daily 15-minute design stand-ups, as well as our team stand-ups. While we did not originally have access to our end users, we were able to get limited access during the rollout of this phase of design. With that, we were able to get essential feedback, report back to our stakeholders, and adjust some of the priorities we had previously made.
            </p>
            <p className="text-gray-600">
              This feedback caused us to adjust the task features we had been planning on, and switch the focus from tasks to people. Achieving goals was more important than individual tasks. We also realized that rather than navigating back and forth between planning and teaching records, as we had previously assumed, often one companion in the pair would have the teaching record open while the other made changes to the plans for the day.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Design Process</h2>
            <p className="text-gray-600 mb-6">
              We designed for three development teams: one for iOS, one for Android, and one to maintain the current app while we redesigned. With so much development support, we soon reached a great cadence of work. I would work out the basic strategy of each feature with designer, developer, and stakeholder input, sketch it out in Balsamiq, test with users, make adjustments, and then I would lay out the iOS version while my coworker laid out the Android version.
            </p>
            <p className="text-gray-600">
              The cadence of work, working so closely with product management, other designers, and development, as well as Agile, sprint-driven development quickly made this one of my favorite projects.
            </p>
          </div>
        </div>
      );

    case 5: // Validate Case Study
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem to be solved</h2>
            <p className="text-gray-600 mb-6">
              When I first began this project, we had been running a Qualtrics-intercept feedback survey for a couple of years. This survey could pop up almost anywhere in the site, and invited current users to take a rather long and involved feedback survey.
            </p>
            <p className="text-gray-600 mb-6">
              The results were used to troubleshoot site issues. Most of the time, a request would come from management to research a specific issue. In order to return results, I had to sift through multiple text entry fields using simple search terms, and then find a way to visualize the data in a meaningful way.
            </p>
            <p className="text-gray-600">
              Additionally, we received very limited feedback results. Each research project would take me a day or two before I could have anything useful to report. We needed a way to increase feedback and make it easier to visualize key information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Approach</h2>
            <p className="text-gray-600 mb-6">
              In the short run, the first thing I did was create reporting in Qualtrics on our existing surveys. I then created a shareable link that could be given to anyone in the company to view basic survey trends and feedback.
            </p>
            <p className="text-gray-600 mb-6">
              Then, I researched reporting metrics, what different reporting numbers such as CSAT and NPS meant, how best to implement them for effective feedback, and how to report on them.
            </p>
            <p className="text-gray-600">
              After my secondary research and reviewing the current surveys, I determined two key places where CSAT numbers would be informative, and realized that our NPS would be more accurate if we asked it through email, or early in the experience, before customers had done any transactions on our site. I also hypothesized that with text analytics, we could get just as good specificity in targeting problem areas, but with a much simpler (and therefore more inviting) feedback collection method.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Outcome</h2>
            <p className="text-gray-600 mb-6">
              Because of our simplified survey, our responses went up <strong>20 times the previous response rate</strong>, exceeding our expectations to the point where we ended up reducing the frequency of the intercept.
            </p>
            <p className="text-gray-600 mb-6">
              Additionally, we had only to run the information through text analytics to get results that could help us identify trends in pain points and prioritize feature development.
            </p>
            <p className="text-gray-600">
              Applying the principles of user experience to feedback options helped us come to a solution that was easier to implement, easier to maintain, easier to analyze and easier to communicate results to the rest of the company, resulting in increased employee engagement.
            </p>
          </div>
        </div>
      );

    case 6: // Mentorship Philosophy
      return (
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem to be solved</h2>
            <p className="text-gray-600 mb-6">
              For a year or two, I wore two hats: designer and research consultant. We needed to train other designers, product managers, and developers to help shift our culture to be more research-minded and give them the skills to understand when to research, how to research, and how to interpret their results.
            </p>
            <p className="text-gray-600">
              We needed a core body of basic research training materials to help elevate our research practices.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Approach</h2>
            <p className="text-gray-600 mb-6">
              The first approach was to create a variety of basic research materials in our knowledge base. Generating articles that could be easily shared required robust secondary research.
            </p>
            <p className="text-gray-600 mb-6">
              Next, we decided to generate a series of help videos to train other researchers in using Qualtrics (our main survey resource) and usertesting.com.
            </p>
            <p className="text-gray-600">
              Finally, we hosted several multi-disciplinary workshops to help encourage teams to think more critically of their own assumptions and be eager to research and test.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Outcome</h2>
            <p className="text-gray-600 mb-6">
              One workshop, as an example, was intended to help product management and lead developers understand the challenges of identifying user experience solutions. The morning included a few personal exercises to show how proper research could save time and help validate assumptions before development time was spent.
            </p>
            <p className="text-gray-600 mb-6">
              The afternoon included a fun activity to help demonstrate how cross-functional collaboration could more quickly reach results with good ROI.
            </p>
            <p className="text-gray-600 mb-6">
              Of course, different teams adopted the culture of research in their own ways. On my team, developers began to participate in user interviews. We also opened a Slack channel with our users so everyone on the team could see feedback as it came in. We did need to work with the team to understand how to review and prioritize our findings, but it helped our team work together to improve the user experience.
            </p>
            <p className="text-gray-600">
              In the end, developers often adjusted their own solutions based on the empathy and understanding they had gained from participating in research. Interacting directly with users helped smooth our backlog grooming sessions, and helped us identify potential pain points before final implementation of new features.
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Case Study Details</h2>
          <p className="text-gray-600">
            This case study demonstrates the application of user-centered design principles to solve real-world 
            problems. Through careful research, collaborative design, and iterative validation, we created 
            solutions that truly meet user needs while achieving business objectives.
          </p>
        </div>
      );
  }
}
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateChatResponse(message: string): Promise<string> {
  try {
    const portfolioContext = `
    You are Kirsi Rohbock's portfolio assistant. Here's information about Kirsi:

    ABOUT KIRSI:
    - Data-driven UX Designer specializing in turning data into insights
    - Founder of Silverwinged Design (2020-Present)
    - Previously UX Research Specialist (2018-2020), Design Process Mentor (2019-Present)
    - Specializes in user-centered design that integrates complex data analysis and machine learning
    - Contact: kirsi.rohbock@gmail.com

    CORE PHILOSOPHY:
    "Data is the Lifeblood of User-centered Design"
    - Great design integrates into patterns and habits that shape our lives
    - Finding patterns in complex data through user research and machine learning
    - Flexible UX process that begins and ends with research
    - Accelerates development to benefit users and businesses

    SKILLS:
    - Data Analysis & Visualization (95%)
    - User Research & Interviews (93%)
    - Wireframing & Prototyping (90%)
    - Cross-functional Collaboration (88%)
    - User Testing & Validation (91%)
    - Process Mentorship (85%)

    UX PROCESS:
    1. Research - gather data, interview users, discover the problem
    2. Define - create workflows, map user journeys, report research results
    3. Ideate - facilitate whiteboard sessions, conduct collaboration workshops
    4. Design - create wireframes, design high-fidelity mockups, prototype
    5. Validate - test solutions, design feedback strategy, conduct user testing
    6. Mentor - advocate research, democratize design, elevate processes

    CASE STUDIES:
    1. Research Case Study - Cost-effective research through user interviews and data analysis
    2. Define Case Study - Workflow mapping to define needs before development investment
    3. Ideate Case Study - Multi-discipline requirements gathering using collaboration workshops
    4. Design Case Study - Wireframes and high-fidelity mockups for optimal ROI
    5. Validate Case Study - End-to-end user testing to iterate and adapt
    6. Mentorship Philosophy - Training materials to advocate research and democratize design

    Please answer questions about Kirsi's work, experience, data-driven approach, and UX process in a helpful and professional manner.
    
    If you cannot answer a question or need more specific information, politely direct users to contact Kirsi directly at kirsi.rohbock@gmail.com for personalized assistance.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: portfolioContext
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. For specific questions about Kirsi's work or to discuss potential projects, please email her directly at kirsi.rohbock@gmail.com.";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later or contact Kirsi directly at kirsi.rohbock@gmail.com.";
  }
}

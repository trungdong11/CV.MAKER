<script setup lang="ts">
// import { useEvaluateStore } from '@/stores/evaluate'
// const evaluateStore = useEvaluateStore()
// const { evaluateDetail } = toRefs(evaluateStore)

const getScoreColor = computed(() => {
  return (score: number, section: string) => {
    const percent = handlePercent(score, section)
    if (percent > 0 && percent < 75) {
      return 'text-[#d89745] bg-[#ffe0b9]'
    } else if (percent >= 75 && percent <= 100) {
      return 'bg-[#cdf0e4] text-[#249a71]'
    }
    return 'text-[#ff576f] bg-[#ffeef1]'
  }
})

const handlePercent = (num: number, section: string) => {
  let total = 0

  switch (section) {
    case 'Personal Info':
      total = 10
      break
    case 'Summary':
      total = 10
      break
    case 'Skills':
      total = 15
      break
    case 'Work Experience':
      total = 20
      break
    case 'Education':
      total = 10
      break
    case 'Projects':
      total = 15
      break
    case 'Certifications':
      total = 5
      break
    case 'Languages':
      total = 5
      break
    case 'Organizational & Volunteering':
      total = 5
      break
    case 'Awards':
      total = 5
      break
    default:
      break
  }

  return (num / total) * 100
}

const evaluateDetail = {
  cv_id: 'CV154-Cloud_Specialist',
  sections: [
    {
      section: 'Personal Info',
      content_score: 9.85,
      final_score: 9.15,
      grammar_errors: {
        minor: 1,
        severe: 1,
      },
      grammar_errors_detailed: [
        {
          location: 'Vietnam, Da Nang City',
          type: 'grammar',
          description:
            "Improper use of commas in an address.  'Da Nang City' should be considered part of the same location element as 'Vietnam'.",
          suggestion: 'Vietnam, Da Nang',
        },
        {
          location:
            '•\ntrungdong0811@gmail.com\n•\n0353504690\n•\nlinkedin.com/in/trung-dong-le-6a66ba291\ngithub.com/trungdong11',
          type: 'syntax',
          description:
            "The use of bullet points is inappropriate for a contact section within a resume or similar document.  It's visually cluttered and lacks formal structure.",
          suggestion:
            'Replace the bullet points with a more formal formatting. For example:\n\nEmail: trungdong0811@gmail.com\nPhone: 0353504690\nLinkedIn: linkedin.com/in/trung-dong-le-6a66ba291\nGitHub: github.com/trungdong11',
        },
      ],
      suggestions: [
        {
          issue: 'Lack of clear contact information formatting and presentation.',
          suggestion:
            'Use a consistent and visually appealing format for contact information.  Instead of bullet points, consider using a more structured approach. For example:\n\n**Contact**\n\n* **Name:** Trung Dong Le\n* **Phone:** +84 353 504 690 (Include country code for international clarity)\n* **Email:** trungdong0811@gmail.com\n* **LinkedIn:** linkedin.com/in/trung-dong-le-6a66ba291\n* **GitHub:** github.com/trungdong11\n\nThis makes the information easier to scan and read, and adding the country code to the phone number enhances professionalism.',
        },
        {
          issue: 'Missing address details and potentially important information.',
          suggestion:
            "While you've stated the city and country, providing a full address (at least street and postal code) might be beneficial, depending on the job applications.  If you are uncomfortable sharing a full home address, you can provide a separate mailing address or consider leaving this out entirely if unnecessary for the specific roles you are applying for. For some roles, specifying the city and country is sufficient. Also consider adding your nationality if it is relevant to potential employers.",
        },
        {
          issue: 'Inconsistent use of capitalization and spacing.',
          suggestion:
            'Ensure consistent capitalization (Vietnam, Da Nang City) and spacing throughout the personal information section.  Maintain the same style for city and country names (either all capitalized or title case).  The current formatting is inconsistent and detracts from professionalism.',
        },
      ],
      quality: 'Good',
    },
    {
      section: 'Summary',
      content_score: 9.15,
      final_score: 8.25,
      grammar_errors: {
        minor: 2,
        severe: 1,
      },
      grammar_errors_detailed: [
        {
          location: 'Line 1',
          type: 'Syntax',
          description:
            "The sentence fragment 'Experienced Front-end developer with' needs a verb or a complete clause to form a grammatically correct sentence.",
          suggestion:
            'Experienced Front-end developer with 2 years of expertise in Web Development, I am confident...',
        },
        {
          location: 'Line 2',
          type: 'Grammar',
          description:
            "The number '2' should be written out as 'two' for better readability in formal writing.",
          suggestion: 'two',
        },
        {
          location: 'Line 4',
          type: 'Grammar',
          description:
            "Inconsistent use of capitalization. 'I’m' should be 'I am' for consistency with the rest of the text.",
          suggestion: 'I am',
        },
      ],
      suggestions: [
        {
          issue:
            'The summary is too generic and lacks specific accomplishments or quantifiable results.  It reads like a generic job application statement.',
          suggestion:
            "Instead of stating general skills, quantify your achievements. For example, instead of 'contribute to delivering high-quality products,' say something like 'Reduced website load time by 15% through optimization techniques, resulting in a 10% increase in user engagement.'  Focus on 2-3 key achievements that highlight your skills and impact. This will make your summary far more compelling and memorable.",
        },
        {
          issue:
            "The wording is somewhat informal ('I’m seeking opportunities'). The tone should be more professional and confident.",
          suggestion:
            "Replace informal language with more professional phrasing. For example, instead of 'I’m seeking opportunities,' try 'Seeking a challenging role in...' or 'Highly motivated to contribute to...'  Maintain a confident and proactive tone throughout the summary. Avoid phrases like 'I am confident in my ability' as it's implied through your achievements.",
        },
        {
          issue:
            "The summary lacks specific technological skills.  It only mentions 'Front-end developer' without providing details.",
          suggestion:
            "Include specific technologies and frameworks you are proficient in.  For instance, 'Experienced Front-end developer with 2 years of expertise in React, Angular, or Vue.js, HTML5, CSS3, and JavaScript.'  This shows prospective employers your relevant skills at a glance and makes your summary more targeted to specific job opportunities.",
        },
      ],
      quality: 'Good',
    },
    {
      section: 'Skills',
      content_score: 11.56,
      final_score: 11.16,
      grammar_errors: {
        minor: 2,
        severe: 0,
      },
      grammar_errors_detailed: [
        {
          location: 'Languages Programing:',
          type: 'grammar',
          description: "Incorrect word order; should be 'Programming Languages'",
          suggestion: 'Programming Languages:',
        },
        {
          location: 'Agile/Crum',
          type: 'vocabulary',
          description:
            "Crum is not a recognized project management methodology. Likely a typo for 'Scrum'",
          suggestion: 'Agile/Scrum',
        },
        {
          location: 'VueJs, NuxtJs',
          type: 'style',
          description:
            'Inconsistent capitalization; should be consistent capitalization (e.g., all lowercase, or camelCase).',
          suggestion: 'Vue.js, Nuxt.js',
        },
        {
          location: 'Git, Postman, Swagger, Figma',
          type: 'style',
          description:
            'Inconsistent capitalization; should be consistent capitalization (e.g., all lowercase, or camelCase).',
          suggestion: 'Git, Postman, Swagger, Figma',
        },
        {
          location: 'HTML, CSS, Javascript, Typescript',
          type: 'style',
          description:
            'Inconsistent capitalization; should be consistent capitalization (e.g., all lowercase, or camelCase).',
          suggestion: 'HTML, CSS, JavaScript, TypeScript',
        },
        {
          location: 'SCSS, Tailwind, NPM',
          type: 'style',
          description:
            'Inconsistent capitalization; should be consistent capitalization (e.g., all lowercase, or camelCase).',
          suggestion: 'SCSS, Tailwind, npm',
        },
      ],
      suggestions: [
        {
          issue:
            'Inconsistent and informal categorization of skills.  The headings are not uniformly professional and lack clear hierarchy.',
          suggestion:
            "Restructure the skills section into logical categories with clear, concise headings.  For example, consider grouping skills under 'Frontend Development,' 'Backend Development' (if applicable), 'Development Tools,' 'Project Management,' and 'Languages.'  This improves readability and highlights relevant expertise for specific roles.  Instead of 'Framework:', use 'JavaScript Frameworks' or similar.  Instead of 'Developer Tools:', use 'Development & Collaboration Tools'.  Instead of 'Languages Programing:', use 'Programming Languages'.",
        },
        {
          issue:
            "Lack of detail and quantification of skills.  Simply listing tools doesn't demonstrate proficiency.",
          suggestion:
            "Add quantifiable achievements and detail to showcase your skill level. Instead of just listing 'VueJs, NuxtJs,' describe specific projects where you utilized these frameworks, highlighting accomplishments (e.g., 'Developed a Vue.js application resulting in a 20% increase in user engagement,' or 'Migrated legacy application to Nuxt.js, improving page load time by 15%').  For languages, specify proficiency levels (e.g., 'Proficient in JavaScript,' 'Conversational in Typescript').",
        },
        {
          issue:
            'Missing crucial skills depending on the target job. The provided skills are quite general and could benefit from expansion based on the desired role.',
          suggestion:
            'Tailor your skills section to each job application.  Review the job description carefully and identify key skills and keywords. If the role requires backend skills, add them with specific examples.  If the role requires database experience, mention specific databases used (e.g., MySQL, PostgreSQL, MongoDB) and your level of proficiency. Similarly, if testing is required, include relevant testing frameworks and methodologies (e.g., Jest, Cypress, Unit Testing).',
        },
      ],
      quality: 'Weak',
    },
    {
      section: 'Work Experience',
      content_score: 16.9,
      final_score: 14.7,
      grammar_errors: {
        minor: 6,
        severe: 2,
      },
      grammar_errors_detailed: [
        {
          location: 'VietNam',
          type: 'grammar',
          description: 'Incorrect capitalization. Country names should be capitalized.',
          suggestion: 'Vietnam',
        },
        {
          location: 'Jun 2023 - Present',
          type: 'grammar',
          description: "Inconsistent capitalization.  'Jun' should be 'June'.",
          suggestion: 'June 2023 - Present',
        },
        {
          location: 'develop in JavaScript with framework VueJS',
          type: 'syntax',
          description: "Awkward phrasing.  'with framework' is unnecessary and slightly redundant.",
          suggestion: 'develop in JavaScript using the VueJS framework',
        },
        {
          location: 'expand the online learning and booking system capabilities',
          type: 'vocabulary',
          description: "Wordy and slightly unclear.  'capabilities' is vague.",
          suggestion: 'enhance the online learning and booking systems',
        },
        {
          location: 'These two systems are the company’s main products.',
          type: 'syntax',
          description:
            'Slightly redundant after the previous sentence.  The connection is already clear.',
          suggestion: '',
        },
        {
          location: 'Technology Used:',
          type: 'grammar',
          description: 'Should be title case.',
          suggestion: 'Technologies Used:',
        },
        {
          location: 'Javascript',
          type: 'grammar',
          description: "Inconsistent capitalization; should match 'JavaScript'.",
          suggestion: 'JavaScript',
        },
        {
          location: 'NuxtJs',
          type: 'grammar',
          description:
            "Inconsistent capitalization; should be 'Nuxt.js' or 'NuxtJS' for consistency.",
          suggestion: 'Nuxt.js',
        },
      ],
      suggestions: [
        {
          issue:
            'The description of responsibilities is vague and lacks quantifiable achievements.  Phrases like "expand the online learning and booking system capabilities" are too general and don\'t demonstrate the impact of the work.',
          suggestion:
            'Replace the vague description with specific accomplishments.  For example, instead of "expand the online learning and booking system capabilities," quantify your contributions.  Did you improve page load speed by X%? Did you increase user engagement by Y%? Did you add Z new features?  Rewrite the paragraph to highlight 2-3 key achievements with measurable results.  For instance: "Developed and implemented three new features for the online learning system, resulting in a 15% increase in user engagement.  Optimized the booking system\'s front-end architecture, reducing page load time by 20% and improving user experience." ',
        },
        {
          issue:
            "The mention of Trello and Kanban is relevant but doesn't directly showcase skills.  It's better to highlight project management skills subtly within the context of accomplishments rather than listing the project management tools.",
          suggestion:
            'Instead of explicitly stating "Tasks are managed on a Trello board using Kanban methodology," integrate project management skills into the achievement descriptions. For example, "Successfully managed the front-end development of a new feature using Kanban methodology, delivering the project on time and within budget." This implicitly demonstrates your project management skills without explicitly stating the tools used.',
        },
        {
          issue:
            "The 'Technology Used' section is presented as a separate list, which is less visually appealing and less integrated into the overall description. ",
          suggestion:
            'Integrate the technologies used naturally within the description of your responsibilities.  For example, instead of a separate list, you could write something like: "As a FrontEnd Developer at Sucodev, I leverage my expertise in JavaScript (including VueJS, NuxtJS, and TypeScript) and styling frameworks (SCSS and Tailwind CSS) to develop and maintain the company\'s flagship online learning and booking systems. I utilize NPM for package management and ensure cross-browser compatibility with HTML and CSS." This makes the technology section more contextual and improves the flow of the description.',
        },
      ],
      quality: 'Weak',
    },
    {
      section: 'Education',
      content_score: 9.64,
      final_score: 8.74,
      grammar_errors: {
        minor: 2,
        severe: 1,
      },
      grammar_errors_detailed: [
        {
          location: 'EDUCATION',
          type: 'syntax',
          description:
            "The heading 'EDUCATION' should be formatted consistently with the rest of the text, typically using title case or sentence case.",
          suggestion: 'Education',
        },
        {
          location: 'Jan 2021 - Present',
          type: 'grammar',
          description:
            'While understood,  it is better to use a more formal date range presentation, especially in a resume or CV.',
          suggestion: 'January 2021 – Present',
        },
        {
          location: 'Danang University of Science and Technology',
          type: 'vocabulary',
          description:
            'While grammatically correct, using the full name of the university on multiple lines might be visually better for readability in a resume context.',
          suggestion:
            'Break into multiple lines for better readability, for example: \nDanang University \nof Science and Technology',
        },
      ],
      suggestions: [
        {
          issue: "Lack of specificity regarding the degree's completion status and GPA.",
          suggestion:
            "Specify whether the Bachelor of Information Technology is 'in progress', 'completed', or 'expected completion date: [Month, Year]'.  Additionally, if you have a GPA above 3.5 (or equivalent), include it to highlight academic achievement.  For example:  'Bachelor of Information Technology, Expected Completion: December 2024, GPA: 3.8/4.0'.",
        },
        {
          issue: 'Missing relevant coursework or projects that demonstrate skills.',
          suggestion:
            "Add a brief list (3-5 bullet points) of relevant coursework or projects undertaken during the degree program that are directly related to the target jobs you are applying for. For example: 'Relevant Coursework: Database Management Systems, Software Engineering, Data Structures and Algorithms, Web Development, Artificial Intelligence.  Project: Developed a mobile application using Java and Android Studio for [brief description of project and outcome].' This showcases practical skills and achievements.",
        },
        {
          issue: 'Inconsistent date formatting and lack of a formal structure.',
          suggestion:
            "Use a consistent date format (e.g., MM/YYYY or Month YYYY) throughout. Employ a clearer structure, like listing the degree name first, followed by the institution, and then the dates.  For example: \n'**Bachelor of Information Technology**\nDanang University of Science and Technology\nJanuary 2021 – Present (or Expected Completion: December 2024)'",
        },
      ],
      quality: 'Good',
    },
    {
      section: 'Projects',
      content_score: 11.83,
      final_score: 11.83,
      grammar_errors: {
        minor: 0,
        severe: 0,
      },
      grammar_errors_detailed: [],
      suggestions: [
        {
          issue: 'Inconsistent and informal language; lack of quantifiable results.',
          suggestion:
            "Rewrite descriptions using more professional and concise language, focusing on achievements and quantifiable results.  For example, instead of 'We developed a platform allowing users...', try 'Developed a user-friendly quiz creation and hosting platform with over [Number] registered users, enabling them to create customizable quizzes and interactive slides.'  For S-Booking, quantify contributions like 'Improved booking management efficiency by [Percentage]% through the implementation of [Specific feature]' or 'Reduced administrative overhead by [Percentage]% through automation of [Specific task].'  Avoid bullet points where possible and instead integrate the key features into concise paragraphs. Remove informal phrasing like 'somes groups' and 'like a community'.",
        },
        {
          issue: 'Missing crucial details in project descriptions.',
          suggestion:
            'Expand on the technical challenges faced and solutions implemented.  For Quizzfly, mention the database technology used, the deployment environment (e.g., AWS, Azure, etc.), and any testing methodologies employed. For S-Booking, specify the scale of the project (number of users, branches, or transactions handled).  Highlight specific technologies or frameworks used beyond the basic HTML, CSS, and JavaScript.  Did you utilize any state management solutions, API integration, or testing frameworks?',
        },
        {
          issue: 'Unclear project structure and inconsistent formatting.',
          suggestion:
            "Adopt a consistent and visually appealing structure for each project.  Use bold headings for project names, clearly defined roles, and a concise, impactful summary statement at the beginning of each project description.  Then, use bullet points to highlight key responsibilities and accomplishments, ensuring each point starts with a strong action verb (e.g., 'Developed,' 'Implemented,' 'Integrated').  Maintain consistent capitalization and punctuation throughout.",
        },
      ],
      quality: 'Good',
    },
    {
      section: 'Certifications',
      content_score: 4.07,
      final_score: 4.07,
      grammar_errors: {
        minor: 0,
        severe: 0,
      },
      grammar_errors_detailed: [],
      suggestions: [
        {
          issue:
            'Lack of clarity and consistent formatting.  The provided content is empty, making it impossible to assess clarity and professionalism.  No certifications are listed, hindering the evaluation of their relevance and impact.',
          suggestion:
            "Populate the 'Certifications' section with a list of all relevant certifications. Each certification should be presented in a clear and consistent format. For example:  Use bullet points, list the certification name in bold, and then provide the awarding body, date of completion, and any relevant identification number (e.g., certificate number).  If a certification has an expiration date, include it. Example: \n\n* **Project Management Professional (PMP)**, Project Management Institute (PMI), June 2022, Certification ID: 1234567\n* **Certified Scrum Master (CSM)**, Scrum Alliance, October 2021",
        },
        {
          issue:
            'Missing critical details that add value to the certifications. Without additional information, the certifications lack context and impact.',
          suggestion:
            'For each certification, add a brief description (one sentence) highlighting the key skills or knowledge gained and how it is relevant to the target job roles. This demonstrates the practical application of the certifications and strengthens the CV. Example: \n\n* **Project Management Professional (PMP)**, Project Management Institute (PMI), June 2022, Certification ID: 1234567; *Demonstrates expertise in managing complex projects and leading high-performing teams.*',
        },
        {
          issue:
            'The section is ineffective in attracting attention if left empty or poorly formatted.  It blends in with the rest of the CV rather than standing out as a key achievement.',
          suggestion:
            "Consider adding a header to the section like 'Professional Certifications' or 'Key Certifications.'  If appropriate, order the certifications by relevance to the target roles or by date of completion (most recent first).  If space allows, use a visually appealing format (such as a table) to enhance readability and make the certifications more prominent. For instance, you could use columns for Certification Name, Issuing Body, Date Achieved, and a brief description.",
        },
      ],
      quality: 'Good',
    },
    {
      section: 'Languages',
      content_score: 1.21,
      final_score: 1.21,
      grammar_errors: {
        minor: 0,
        severe: 0,
      },
      grammar_errors_detailed: [],
      suggestions: [
        {
          issue: 'Lack of proficiency level specified for each language.',
          suggestion:
            "Instead of simply listing languages, use a standardized proficiency scale (e.g., CEFR levels: A1, A2, B1, B2, C1, C2; or a descriptive scale: Native, Fluent, Conversational, Basic) to clearly indicate your competency in each language.  For example, instead of 'English', write 'English (Native)' or 'English (C2)'.  This provides recruiters with a quantifiable measure of your language skills.",
        },
        {
          issue: 'Missing information on spoken and written abilities.',
          suggestion:
            "Differentiate between spoken and written proficiency for each language. Many roles require different levels of competency in each.  For example, 'Spanish: Conversational (spoken), Basic (written)' clearly shows a gap and helps the recruiter understand your capabilities accurately. This granular detail avoids assumptions and presents a complete picture.",
        },
        {
          issue: 'Potential for unclear or informal language.',
          suggestion:
            "Avoid informal phrasing such as 'a bit' or 'okay'.  Use precise and professional language. For instance, instead of 'English, a bit of French', write 'English (Native), French (A1)'. This demonstrates attention to detail and professionalism, creating a more impactful impression.",
        },
      ],
      quality: 'Weak',
    },
    {
      section: 'Organizational & Volunteering',
      content_score: 2.45,
      final_score: 2.45,
      grammar_errors: {
        minor: 0,
        severe: 0,
      },
      grammar_errors_detailed: [],
      suggestions: [
        {
          issue:
            'Lack of quantifiable achievements and impact description.  The section only lists roles and organizations, failing to showcase the value brought to each.',
          suggestion:
            "For each role, add quantifiable achievements whenever possible.  Instead of saying 'Volunteered at the local soup kitchen,' try something like 'Volunteered at the local soup kitchen, assisting in serving meals to an average of 50 individuals per week for six months, resulting in a smoother and more efficient service delivery.'  Focus on results and impact—what did you accomplish, and how did your contributions benefit the organization?",
        },
        {
          issue:
            'Inconsistent use of tense and potentially unclear timeline.  The reader may not understand the duration of each involvement.',
          suggestion:
            "Use consistent past tense verbs for completed activities.  Clearly state the start and end dates (or duration) for each role.  For example, instead of just mentioning 'Treasurer, Student Government,' use 'Treasurer, Student Government (September 2020 - May 2022).' This provides clarity and demonstrates commitment.",
        },
        {
          issue:
            'Potential lack of structure and visual appeal.  A simple list may not be attention-grabbing.',
          suggestion:
            "Structure the information using bullet points under each organization/role. This improves readability.  Consider using a consistent format with headings like 'Organization Name,' 'Role,' 'Dates,' 'Responsibilities,' and 'Achievements.'  This provides a clean, structured, and visually appealing section that highlights key contributions effectively.",
        },
      ],
      quality: 'Weak',
    },
    {
      section: 'Awards',
      content_score: 2,
      final_score: 2,
      grammar_errors: {
        minor: 0,
        severe: 0,
      },
      grammar_errors_detailed: [],
      suggestions: [
        {
          issue:
            "The 'Awards' section is empty.  This missed opportunity prevents the candidate from showcasing achievements and highlighting their capabilities.",
          suggestion:
            'Add any awards, scholarships, grants, or recognitions received.  For each award, include the award name, awarding institution, date received, and a brief description (one sentence) highlighting the significance or achievement it represents. For example:\n\n"Dean\'s List, University of California, Berkeley, 2021-2023. Awarded to students maintaining a GPA of 3.5 or higher."\n\n"National Merit Scholar, National Merit Scholarship Corporation, 2020.  Recognized for exceptional academic ability and achievement on the PSAT/NMSQT."',
        },
        {
          issue:
            'Even if awards exist, the lack of context makes it difficult to assess their significance.',
          suggestion:
            "Instead of simply listing awards, quantify the achievements where possible.  For example, instead of 'Employee of the Month,' try 'Employee of the Month, October 2023, awarded for exceeding sales targets by 25% and consistently demonstrating exceptional customer service.'  This provides context and strengthens the impact of the award.",
        },
        {
          issue:
            "The absence of an 'Awards' section might lead recruiters to assume a lack of noteworthy achievements.",
          suggestion:
            "If no formal awards exist, consider adding a separate section titled 'Achievements' or 'Recognition' to highlight significant accomplishments, contributions, or projects that demonstrate skills and capabilities relevant to the target jobs.  This could include things like exceeding performance goals, leading successful projects, or receiving positive feedback from superiors or clients.  Quantify these achievements whenever possible.",
        },
      ],
      quality: 'Weak',
    },
  ],
  total_content_score: 78.66,
  total_final_score: 73.56,
  content_score_100: 78.66,
  final_score_100: 73.56,
  total_grammar_errors: 18,
}
</script>
<template>
  <div class="flex flex-col gap-8 w-full">
    <div
      v-for="item in evaluateDetail?.sections"
      :key="item.section"
      class="w-full rounded-xl p-5 shadow flex flex-col gap-4"
    >
      <div class="flex items-center w-full">
        <div class="flex items-center gap-2 w-[400px]">
          <span
            class="i-material-symbols-light-person-apron-outline text-[20px] text-primary"
          ></span>
          <h2 class="text-base font-medium">{{ item?.section }}</h2>
        </div>
        <div class="flex items-center gap-4">
          <p
            class="text-xs font-medium px-3 py-0.5 rounded-xl"
            :class="getScoreColor(item?.final_score, item?.section)"
          >
            {{ item?.quality }}
          </p>
          <p
            class="text-xs font-medium px-3 py-0.5 rounded-xl"
            :class="getScoreColor(item?.final_score, item?.section)"
          >
            {{ handlePercent(item?.final_score, item?.section).toFixed() }}%
          </p>
        </div>
      </div>
      <div
        v-if="item?.grammar_errors_detailed.length > 0"
        class="flex w-full"
      >
        <div class="flex flex-col gap-1 w-full rounded-lg text-[#ff576f] bg-[#ffeef1] p-5">
          <h2 class="text-base font-medium">Grammars Error</h2>
          <div class="flex flex-col gap-4">
            <div
              v-for="grammarItem in item.grammar_errors_detailed"
              :key="grammarItem.type"
              class="flex flex-col gap-1"
            >
              <p class="font-xs">Location: {{ grammarItem?.location }}</p>
              <p class="font-xs">Description: {{ grammarItem?.description }}</p>
              <p class="font-xs p-3 rounded-lg bg-[#cdf0e4] text-[#249a71]">
                Suggestion: {{ grammarItem?.suggestion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>

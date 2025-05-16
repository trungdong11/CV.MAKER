<template>
  <div class="container">
    <button
      class="btn"
      @click="generatePDF()"
    >
      Download CV as PDF
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import jsPDF from 'jspdf'
import { formatDateUs } from '@/utils/format'

const cvData = ref({
  createdAt: '2024-03-07T13:39:44.967Z',
  updatedAt: '2024-03-07T13:39:44.967Z',
  summary:
    'Experienced Front-end developer with 2 years of expertise in Web Development. I am confident in my ability to solve technical challenges and contribute to delivering high-quality products. Im seeking opportunities that allow me to make meaningful contributions while continuing to grow my skills.',
  personalDetails: {
    fullname: 'Le Trung Dong',
    phoneNumber: '0353504690',
    address: 'Vietnam, Da Nang City',
    email: 'trungdong0811@gmail.com',
  },
  socials: [
    { icon: 'linkedin', link: 'https://linkedin.com/in/johndoe' },
    { icon: 'github', link: 'https://github.com/johndoe' },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      startDate: '2013-09-01T00:00:00.000Z',
      endDate: '2017-06-30T00:00:00.000Z',
      schoolLink: 'https://university.edu',
      city: 'Ho Chi Minh City',
      GPA: 3.8,
      description: 'Major in Software Engineering',
    },
  ],
  languages: [
    {
      language: 'English',
      proficiency: 'Fluent',
    },
    {
      language: 'Vietnamese',
      proficiency: 'Native',
    },
  ],
  skills: [
    {
      skillCategory: 'Programming Languages',
      listOfSkill: 'JavaScript, TypeScript, Python, Java',
    },
    {
      skillCategory: 'Frameworks',
      listOfSkill: 'React, Node.js, Express, NestJS',
    },
  ],
  works: [
    {
      companyName: 'Tech Solutions Inc.',
      isCurrentWorking: true,
      position: 'Senior Software Engineer',
      location: 'Ho Chi Minh City, Vietnam',
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: '2023-12-31T00:00:00.000Z',
      description:
        'As a FrontEnd Developer at Sucodev, I mainly develop in JavaScript with framework VueJS to expand the online learning and booking system capabilities. These two systems are the company’s main products. Tasks are managed on a Trello board using Kanban methodology. Technology Used: Javascript, VueJS, NuxtJs, SCSS, Tailwind, NPM, HTML, CSS, TypeScript',
    },
    {
      companyName: 'StartUp Co.',
      isCurrentWorking: false,
      position: 'Software Developer',
      location: 'Hanoi, Vietnam',
      startDate: '2017-07-01T00:00:00.000Z',
      endDate: '2019-12-31T00:00:00.000Z',
      description:
        'As a FrontEnd Developer at Sucodev, I mainly develop in JavaScript with framework VueJS to expand the online learning and booking system capabilities. These two systems are the company’s main products. Tasks are managed on a Trello board using Kanban methodology. Technology Used: Javascript, VueJS, NuxtJs, SCSS, Tailwind, NPM, HTML, CSS, TypeScript',
    },
  ],
  projects: [
    {
      name: 'QUIZZFLY',
      link: 'https://quizzfly.com',
      startDate: '2024-09-01',
      endDate: '',
      isOngoing: true,
      description: `
      <p>Role: FrontEnd Developer, Project Manager</p>
      <p>Technology: HTML, TAILWIND, VUEJS 3, TYPESCRIPT</p>
      <p>Description: We developed a platform allowing users to register accounts, create customizable quizzes, slides sets in various formats and play quizzes</p>
      <ul>
        <li>With questions we have some types like True/False, multiple-choice</li>
        <li>Creating interactive slides with content and image sharing capabilities.</li>
        <li>Enabled users to set time limits, customize backgrounds, and assign point values to each question.</li>
        <li>Designed a real-time hosting system where users can organize live trivia sessions, allowing participants to join, answer questions, and compete based on speed and accuracy.</li>
        <li>Integrated real-time score tracking to determine the fastest and most accurate responders.</li>
        <li>Create some groups, invite members to share documents, your own questions and can discuss like a community about all topics</li>
      </ul>
    `,
    },
    {
      name: 'S-Booking',
      link: 'https://s-booking.com',
      startDate: '2024-01-01',
      endDate: '',
      isOngoing: true,
      description: `
      <p>Role: FrontEnd Developer </p>
      <p>Technology: HTML, SCSS, VueJS 3 </p>
      <p>Description: I contributed to developing a comprehensive booking management website tailored for branch managers in the hospitality and service industries, including hotels, spas, salons, and dining. This project enables managers to handle all aspects of branch management, from branch registration and service/product creation to detailed booking and invoice management.</p>
      <p>Key functionalities include the ability to confirm or reject bookings, oversee branch activities, and monitor revenue statistics on daily, weekly, monthly, and quarterly bases, supporting efficient decision-making and streamlined booking operations across all services in the ecosystem.</p>
    `,
    },
  ],
  certification: [
    {
      certificationName: 'AWS Certified Developer',
      issuingOrganization: 'Amazon Web Services',
      issuedDate: '2022-03-15T00:00:00.000Z',
      certificationLink: 'https://aws.amazon.com/certification',
      credentialId: 'AWS-123456',
    },
  ],
  organization: [
    {
      name: 'Vietnam Developer Community',
      position: 'Technical Lead',
      address: 'Ho Chi Minh City, Vietnam',
      startDate: '2021-01-01T00:00:00.000Z',
      endDate: '2023-12-31T00:00:00.000Z',
      description: 'Leading technical workshops and mentoring junior developers',
    },
  ],
  award: [
    {
      awardTitle: 'Best Developer Award',
      awardTitleLink: 'https://example.com/award',
      issuer: 'Tech Community Vietnam',
      issuedDate: '2022-12-15T00:00:00.000Z',
      description: 'Awarded for outstanding contribution to open source projects',
    },
  ],
})

const checkPageOverflow = (doc, currentY, additionalHeight = 10) => {
  const pageHeight = doc.internal.pageSize.height
  const marginBottom = 20
  if (currentY + additionalHeight > pageHeight - marginBottom) {
    doc.addPage()
    return 20
  }
  return currentY
}

const addLetterSpacing = (text, spacing = 0.6) => {
  return text.split('').join(' '.repeat(spacing))
}

const generatePDF = () => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [250, 350],
    })

    const { personalDetails, summary, socials, skills } = cvData.value
    let y = 20
    const pageWidth = doc.internal.pageSize.width
    const marginLeft = 10
    const marginRight = 10
    const contentWidth = pageWidth - marginLeft - marginRight

    // parse HTML for description
    const parseHTMLToLines = (html) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const lines = []

      const walk = (node) => {
        if (node.nodeName === '#text') {
          const text = node.textContent.trim()
          if (text) lines.push(text)
        } else if (node.nodeName === 'P') {
          walkChildren(node)
        } else if (node.nodeName === 'UL') {
          node.childNodes.forEach((li) => {
            if (li.nodeName === 'LI') {
              const bullet = '• ' + li.textContent.trim()
              lines.push(bullet)
            }
          })
        } else {
          walkChildren(node)
        }
      }

      const walkChildren = (node) => {
        node.childNodes.forEach(walk)
      }

      walkChildren(doc.body)
      return lines
    }

    // Header: Name
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    const name = personalDetails.fullname.toUpperCase()
    const nameX = (pageWidth - doc.getTextWidth(name)) / 2
    doc.text(name, nameX, y)
    y += 5

    // Header: Contact Info and Social Links
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(143, 143, 143)

    const contactItems = [
      personalDetails.address,
      personalDetails.email,
      personalDetails.phoneNumber,
      ...socials.map((s) => s.link),
    ]

    const contactY = y
    const lineHeight = 5
    let currentLineWidth = 0
    const lines = [[]]

    contactItems.forEach((item, index) => {
      const text = index === contactItems.length - 1 ? item : item + ' • '
      const textWidth = doc.getTextWidth(text)

      if (currentLineWidth + textWidth > contentWidth) {
        lines.push([])
        currentLineWidth = 0
      }

      lines[lines.length - 1].push({ text })
      currentLineWidth += textWidth
    })

    lines.forEach((lineItems, lineIndex) => {
      const lineY = contactY + lineIndex * lineHeight
      const totalLineWidth = lineItems.reduce((acc, item) => acc + doc.getTextWidth(item.text), 0)
      let startX = (pageWidth - totalLineWidth) / 2

      lineItems.forEach(({ text }) => {
        doc.text(text, startX, lineY)

        if (socials.some((s) => s.link === text)) {
          const textWidth = doc.getTextWidth(text)
          doc.setLineWidth(0.2)
          doc.setDrawColor(143, 143, 143)
          doc.line(startX, lineY + 1.2, startX + textWidth, lineY + 1.2)
        }

        startX += doc.getTextWidth(text)
      })
    })

    y += lines.length * lineHeight + 2
    doc.setTextColor(0, 0, 0)

    // Summary
    if (summary) {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const summaryLines = doc.splitTextToSize(summary, contentWidth)
      const lineHeight = 5

      summaryLines.forEach((line, index) => {
        doc.text(line, marginLeft, y + index * lineHeight)
      })

      y += summaryLines.length * lineHeight + 2
      y = checkPageOverflow(doc, y)
    }

    // SKILLS section
    if (skills.length) {
      // Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('SKILLS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)

      skills.forEach((skillItem) => {
        const label = `${skillItem.skillCategory}:`
        const content = skillItem.listOfSkill
        const boldWidth = doc.getTextWidth(label)

        doc.setFont('helvetica', 'bold')
        doc.text(label, marginLeft, y)

        doc.setFont('helvetica', 'normal')
        doc.text(content, marginLeft + boldWidth + 5, y)

        y += 5
        y = checkPageOverflow(doc, y)
      })

      y += 1
    }

    //Education, work
    const { education, works } = cvData.value

    if (education.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('EDUCATION', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      education.forEach((edu) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(edu.degree, marginLeft, y)

        const eduDate = `${formatDateUs(edu.startDate)} - ${formatDateUs(edu.endDate)}`
        const dateWidth = doc.getTextWidth(eduDate)
        doc.text(eduDate, pageWidth - marginRight - dateWidth, y)

        y += 5

        doc.setFont('helvetica', 'normal')
        doc.text(edu.school, marginLeft, y)

        y += 5
        y = checkPageOverflow(doc, y)
      })

      y += 2
    }

    // WORK EXPERIENCE section
    if (works.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('WORK EXPERIENCE', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      works.forEach((work) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(work.position, marginLeft, y)

        const workDate = `${formatDateUs(work.startDate)} - ${
          work.isCurrentWorking ? 'Present' : formatDateUs(work.endDate)
        }`
        const dateWidth = doc.getTextWidth(workDate)
        doc.text(workDate, pageWidth - marginRight - dateWidth, y)

        y += 5

        doc.setFont('helvetica', 'bold')
        doc.text(work.companyName, marginLeft, y)

        const locationWidth = doc.getTextWidth(work.location)
        doc.setFont('helvetica', 'normal')
        doc.text(work.location, pageWidth - marginRight - locationWidth, y)

        y += 5

        const descriptionLines = doc.splitTextToSize(work.description, contentWidth)
        doc.setFont('helvetica', 'normal')
        descriptionLines.forEach((line) => {
          doc.text(line, marginLeft, y)
          y += 5
          y = checkPageOverflow(doc, y)
        })

        y += 3
      })
    }

    // PROJECTS section
    const { projects } = cvData.value
    if (projects.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('PROJECTS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      projects.forEach((project) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        const title = project.name
        const link = project.link
        doc.textWithLink(title, marginLeft, y, { url: link })

        const projectDate = `${formatDateUs(project.startDate)} - ${
          project.isOngoing ? 'Present' : formatDateUs(project.endDate)
        }`
        doc.setFont(undefined, 'bold')
        doc.text(projectDate, pageWidth - marginRight, y, { align: 'right' })
        doc.setFont(undefined, 'normal')

        y += 5

        // Description
        const parsedLines = parseHTMLToLines(project.description)
        const maxWidth = pageWidth - marginLeft - marginRight

        parsedLines.forEach((line) => {
          const wrappedLines = doc.splitTextToSize(line, maxWidth)

          wrappedLines.forEach((wrappedLine) => {
            doc.text(wrappedLine, marginLeft, y)
            y += 5
            y = checkPageOverflow(doc, y)
          })
        })

        y += 3
      })
    }

    // LANGUAGES section
    const { languages } = cvData.value
    if (languages.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('LANGUAGES', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const languageTextParts = languages.map((lang) => {
        return {
          bold: lang.language,
          normal: ` (${lang.proficiency})`,
        }
      })

      let x = marginLeft

      languageTextParts.forEach((part, index) => {
        doc.setFont('helvetica', 'bold')
        doc.text(part.bold, x, y)
        x += doc.getTextWidth(part.bold)

        doc.setFont('helvetica', 'normal')
        doc.text(part.normal, x, y)
        x += doc.getTextWidth(part.normal)

        if (index < languageTextParts.length - 1) {
          const separator = ' • '
          doc.text(separator, x, y)
          x += doc.getTextWidth(separator)
        }
      })

      y += 8
    }

    // CERTIFICATIONS section
    const { certification } = cvData.value
    if (certification.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('CERTIFICATIONS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      certification.forEach((cert) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(cert.certificationName, marginLeft, y)

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        const orgText = ` by ${cert.issuingOrganization}`
        doc.text(orgText, marginLeft + doc.getTextWidth(cert.certificationName + 4), y)

        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0, 0, 0)
        const certDate = formatDateUs(cert.issuedDate)
        doc.text(certDate, pageWidth - marginRight, y, { align: 'right' })

        y += 5

        if (cert.credentialId) {
          doc.setTextColor(100)
          doc.textWithLink(`Credential ID: ${cert.credentialId}`, marginLeft, y, {
            url: cert.certificationLink,
          })
          y += 6
        } else {
          y += 3
        }

        doc.setTextColor(0)
      })
    }

    // ORGANIZATIONAL & VOLUNTEERING EXPERIENCE
    const { organization } = cvData.value
    if (organization.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('ORGANIZATIONAL & VOLUNTEERING EXPERIENCE', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      organization.forEach((org) => {
        // Position (bold)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(org.position, marginLeft, y)

        // Date (right side)
        const dateRange = `${formatDateUs(org.startDate)} - ${formatDateUs(org.endDate)}`
        doc.text(dateRange, pageWidth - marginRight, y, { align: 'right' })
        y += 5

        // Organization Name (bold) + Address (normal)
        doc.setFont('helvetica', 'bold')
        doc.text(org.name, marginLeft, y)

        doc.setFont('helvetica', 'normal')
        doc.text(org.address, pageWidth - marginRight, y, { align: 'right' })
        y += 5

        // Description
        const wrapped = doc.splitTextToSize(org.description, pageWidth - marginLeft - marginRight)
        wrapped.forEach((line) => {
          doc.text(line, marginLeft, y)
          y += 5
          y = checkPageOverflow(doc, y)
        })

        y += 3
      })
    }

    // AWARDS section
    const { award } = cvData.value
    if (award.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('AWARDS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      award.forEach((aw) => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.textWithLink(aw.awardTitle, marginLeft, y, { url: aw.awardTitleLink })

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        const issuerText = ` (${aw.issuer})`
        doc.text(issuerText, marginLeft + doc.getTextWidth(aw.awardTitle + 4), y)

        const awardDate = formatDateUs(aw.issuedDate)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0, 0, 0)
        doc.text(awardDate, pageWidth - marginRight, y, { align: 'right' })

        y += 5

        // Description
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(0)
        const lines = doc.splitTextToSize(aw.description, pageWidth - marginLeft - marginRight)
        lines.forEach((line) => {
          doc.text(line, marginLeft, y)
          y += 5
          y = checkPageOverflow(doc, y)
        })

        y += 5
      })
    }

    //save file
    doc.save(`${personalDetails.fullname}_CV.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #0056b3;
}
.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}
</style>

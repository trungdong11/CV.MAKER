import jsPDF from 'jspdf'
import { formatDateUs } from '@/utils/format'

export const dataCreate = {
  summary:
    'A summary includes short, concise and targeted statements to summarize your skills and experiences. Mostly people will start with why they are here. What is the reason why they do what they do. Followed by “how” they do it and close it with “what” is the thing that they currently doing right now with respect to the ‘why’ and the ‘how’.',
  personal_details: {
    full_name: 'YOUR NAME',
    phone_number: '+65 1234 5678',
    address: 'City, State/Country',
    email: 'email@address.com',
  },
  socials: [
    { icon: 'linkedin', link: 'linkedin.com/in/your_linkedin' },
    { icon: 'github', link: 'github.com/username' },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Name of the Educational Institution',
      start_date: '2013-09-01T00:00:00.000Z',
      end_date: null,
      school_link: 'https://university.edu',
      city: 'Ho Chi Minh City',
      gpa: 4.0,
      description: 'E.g., info about scholarships, student activity, etc.',
    },
  ],
  // languages: [
  //   { language: 'English', proficiency: 'Fluent' },
  //   { language: 'Vietnamese', proficiency: 'Native' },
  // ],
  skills: [
    {
      skill_category: 'Skill Category',
      list_of_skill: 'Skill Name 1, Skill Name 2, Skill Name 3, Skill Name 4, Skill Name 5, etc',
    },
  ],
  works: [
    {
      company_name: 'Company Name',
      is_current_working: true,
      position: 'Position',
      location: 'City, State/Country',
      start_date: '2020-01-01T00:00:00.000Z',
      end_date: null,
      description:
        'State your tasks and accomplishments including name of the project and position of responsibility held.',
    },
  ],
  projects: [
    {
      project_name: 'Project Name',
      project_link: '',
      start_date: '2020-01-01T00:00:00.000Z',
      end_date: null,
      is_ongoing: true,
      description:
        'State your tasks and accomplishments including name of the project and position of responsibility held.',
    },
  ],
  // certification: [
  //   {
  //     certification_name: 'AWS Certified Developer',
  //     issuing_organization: 'Amazon Web Services',
  //     issued_date: '2022-03-15T00:00:00.000Z',
  //     certification_link: 'https://aws.amazon.com/certification',
  //     credential_id: 'AWS-123456',
  //   },
  // ],
  // organization: [
  //   {
  //     name: 'Vietnam Developer Community',
  //     position: 'Technical Lead',
  //     address: 'Ho Chi Minh City, Vietnam',
  //     start_date: '2021-01-01T00:00:00.000Z',
  //     end_date: '2023-12-31T00:00:00.000Z',
  //     description: 'Leading technical workshops and mentoring junior developers',
  //   },
  // ],
  // award: [
  //   {
  //     award_title: 'Best Developer Award',
  //     award_title_link: 'https://example.com/award',
  //     issued_by: 'Tech Community Vietnam',
  //     issued_date: '2022-12-15T00:00:00.000Z',
  //     description: 'Awarded for outstanding contribution to open source projects',
  //   },
  // ],
}

const checkPageOverflow = (doc: jsPDF, currentY: number, additionalHeight = 10): number => {
  const pageHeight = doc.internal.pageSize.height
  const marginBottom = 20
  if (currentY + additionalHeight > pageHeight - marginBottom) {
    doc.addPage()
    return 20
  }
  return currentY
}

export function generateCV(cvData: any) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [250, 350],
    })

    const { personal_details, summary, socials, skills } = cvData
    let y = 20
    const pageWidth = doc.internal.pageSize.width
    const marginLeft = 10
    const marginRight = 10
    const contentWidth = pageWidth - marginLeft - marginRight

    // parse HTML for description
    const parseHTMLToLines = (html: string): string[] => {
      const parser = new DOMParser()
      const parsed = parser.parseFromString(html, 'text/html')
      const lines: string[] = []

      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim()
          if (text) lines.push(text)
        } else if (
          (node as HTMLElement).nodeName === 'P' ||
          (node as HTMLElement).nodeName === 'UL'
        ) {
          walkChildren(node)
        } else {
          walkChildren(node)
        }
      }

      const walkChildren = (node: Node) => {
        node.childNodes.forEach(walk)
      }

      walkChildren(parsed.body)
      return lines
    }

    // Header: Name
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    const name = personal_details?.full_name.toUpperCase()
    const nameX = (pageWidth - doc.getTextWidth(name)) / 2
    doc.text(name, nameX, y)
    y += 5

    // Header: Contact Info and Social Links
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(143, 143, 143)

    const contactItems = [
      personal_details?.address,
      personal_details?.email,
      personal_details?.phone_number,
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
        const label = `${skillItem?.skill_category}:`
        const content = skillItem?.list_of_skill
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
    const { education, works } = cvData

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

        const eduDate = `${formatDateUs(edu.start_date)} - ${formatDateUs(edu.end_date)}`
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

        const workDate = `${formatDateUs(work.start_date)} - ${
          work.is_current_working ? 'Present' : formatDateUs(work.end_date)
        }`
        const dateWidth = doc.getTextWidth(workDate)
        doc.text(workDate, pageWidth - marginRight - dateWidth, y)

        y += 5

        doc.setFont('helvetica', 'bold')
        doc.text(work.company_name, marginLeft, y)

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
    const { projects } = cvData
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
        const title = project.project_name
        const link = project.project_link
        doc.textWithLink(title, marginLeft, y, { url: link })

        const projectDate = `${formatDateUs(project.start_date)} - ${
          project.is_ongoing ? 'Present' : formatDateUs(project.end_date)
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
    const { languages } = cvData
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
    const { certification } = cvData
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
        doc.text(cert.certification_name, marginLeft, y)

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        const orgText = ` by ${cert.issuing_organization}`
        doc.text(orgText, marginLeft + doc.getTextWidth(cert.certification_name + 4), y)

        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0, 0, 0)
        const certDate = formatDateUs(cert.issued_date)
        doc.text(certDate, pageWidth - marginRight, y, { align: 'right' })

        y += 5

        if (cert.credential_id) {
          doc.setTextColor(100)
          doc.textWithLink(`Credential ID: ${cert.credential_id}`, marginLeft, y, {
            url: cert.certification_link,
          })
          y += 6
        } else {
          y += 3
        }

        doc.setTextColor(0)
      })
    }

    // ORGANIZATIONAL & VOLUNTEERING EXPERIENCE
    const { organization } = cvData
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
        const dateRange = `${formatDateUs(org.start_date)} - ${formatDateUs(org.end_date)}`
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
    const { award } = cvData
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
        doc.textWithLink(aw.award_title, marginLeft, y, { url: aw.award_title_link })

        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        const issuerText = ` (${aw.issuer})`
        doc.text(issuerText, marginLeft + doc.getTextWidth(aw.award_title + 4), y)

        const awardDate = formatDateUs(aw.issued_date)
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
    doc.save(`${personal_details.full_name}_CV.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

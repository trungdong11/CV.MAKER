<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Button from '@/components/ui/button/Button.vue'
import TemplateCore from '@/components/template/templateCore/index.vue'
import Evaluation from '@/components/template/review/Evaluation.vue'
// import MatchResume from '@/components/template/review/MatchResume.vue'
import MPreview from '@/components/template/modal/MPreview.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { useEvaluateStore } from '@/stores/evaluate'
import { useRoute } from 'vue-router'
import jsPDF from 'jspdf'
import { formatDateUs } from '@/utils/format'
import { showToast } from '@/utils/toast'

const resumeStore = useResumeStore()
const evaluateStore = useEvaluateStore()

const { getResumeDetail } = resumeStore
const { isLoading } = storeToRefs(evaluateStore)

const route = useRoute()

const idResume = computed(() => route.params?.id as string)
const cvData = computed(() => resumeStore.getResumeInfo)

const isShowPreview = ref(false)
const refInput = ref()
const fileUpload = ref()

const handleCancelEdit = () => {
  resumeStore.cancelEditAward()
  resumeStore.cancelEditPersonal()
  resumeStore.cancelEditDescription()
  resumeStore.cancelEditSkill()
  resumeStore.cancelEditWork()
  resumeStore.cancelEditProject()
  resumeStore.cancelEditEducation()
  resumeStore.cancelEditLanguage()
  resumeStore.cancelEditCertification()
  resumeStore.cancelEditOrganization()
}

const onChangeFile = async (e: Event) => {
  const element = e.currentTarget as HTMLInputElement
  const fileList: FileList | null = element.files
  if (!fileList) return
  const data = fileList[0] as any

  if (data) {
    fileUpload.value = data
    await getImportCV()
  }
}

const getImportCV = async () => {
  handleCancelEdit()
  if (!fileUpload.value) {
    showToast({
      description: 'Please select a file first',
      variant: 'destructive',
    })
    return
  }

  const formData = new FormData()
  formData.append('file', fileUpload.value)

  await evaluateStore.handleImportFile(formData)
}

const fetchResumeDetail = async () => {
  await getResumeDetail(idResume.value)
}

const showPreview = () => {
  handleCancelEdit()
  resumeStore.setShowPreview()
  isShowPreview.value = true
}

const unShowPreview = () => {
  resumeStore.setUnShowPreview()
  isShowPreview.value = false
}

// const checkPageOverflow = (doc: jsPDF, currentY: number, additionalHeight = 10): number => {
//   const pageHeight = doc.internal.pageSize.height
//   const marginBottom = 20
//   if (currentY + additionalHeight > pageHeight - marginBottom) {
//     doc.addPage()
//     return 20
//   }
//   return currentY
// }

// const handleDownload = () => {
//   handleCancelEdit()
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: [250, 350],
//     })

//     const { personal_details, summary, socials, skills } = cvData.value
//     let y = 20
//     const pageWidth = doc.internal.pageSize.width
//     const marginLeft = 10
//     const marginRight = 10
//     const contentWidth = pageWidth - marginLeft - marginRight

//     // parse HTML for description
//     const parseHTMLToLines = (html: string): string[] => {
//       const parser = new DOMParser()
//       const parsed = parser.parseFromString(html, 'text/html')
//       const lines: string[] = []

//       const walk = (node: Node) => {
//         if (node.nodeType === Node.TEXT_NODE) {
//           const text = node.textContent?.trim()
//           if (text) lines.push(text)
//         } else if (
//           (node as HTMLElement).nodeName === 'P' ||
//           (node as HTMLElement).nodeName === 'UL'
//         ) {
//           walkChildren(node)
//         } else {
//           walkChildren(node)
//         }
//       }

//       const walkChildren = (node: Node) => {
//         node.childNodes.forEach(walk)
//       }

//       walkChildren(parsed.body)
//       return lines
//     }

//     // Header: Name
//     doc.setFontSize(20)
//     doc.setFont('helvetica', 'bold')
//     const name = personal_details?.full_name.toUpperCase()
//     const nameX = (pageWidth - doc.getTextWidth(name)) / 2
//     doc.text(name, nameX, y)
//     y += 5

//     // Header: Contact Info and Social Links
//     doc.setFontSize(10)
//     doc.setFont('helvetica', 'normal')
//     doc.setTextColor(143, 143, 143)

//     const contactItems = [
//       personal_details?.address,
//       personal_details?.email,
//       personal_details?.phone_number,
//       ...socials.map((s) => s.link),
//     ]

//     const contactY = y
//     const lineHeight = 5
//     let currentLineWidth = 0
//     const lines = [[]]

//     contactItems.forEach((item, index) => {
//       const text = index === contactItems.length - 1 ? item : item + ' • '
//       const textWidth = doc.getTextWidth(text)

//       if (currentLineWidth + textWidth > contentWidth) {
//         lines.push([])
//         currentLineWidth = 0
//       }

//       lines[lines.length - 1].push({ text })
//       currentLineWidth += textWidth
//     })

//     lines.forEach((lineItems, lineIndex) => {
//       const lineY = contactY + lineIndex * lineHeight
//       const totalLineWidth = lineItems.reduce((acc, item) => acc + doc.getTextWidth(item.text), 0)
//       let startX = (pageWidth - totalLineWidth) / 2

//       lineItems.forEach(({ text }) => {
//         doc.text(text, startX, lineY)

//         if (socials.some((s) => s.link === text)) {
//           const textWidth = doc.getTextWidth(text)
//           doc.setLineWidth(0.2)
//           doc.setDrawColor(143, 143, 143)
//           doc.line(startX, lineY + 1.2, startX + textWidth, lineY + 1.2)
//         }

//         startX += doc.getTextWidth(text)
//       })
//     })

//     y += lines.length * lineHeight + 2
//     doc.setTextColor(0, 0, 0)

//     // Summary
//     if (summary) {
//       doc.setFontSize(10)
//       doc.setFont('helvetica', 'normal')
//       const summaryLines = doc.splitTextToSize(summary, contentWidth)
//       const lineHeight = 5

//       summaryLines.forEach((line, index) => {
//         doc.text(line, marginLeft, y + index * lineHeight)
//       })

//       y += summaryLines.length * lineHeight + 2
//       y = checkPageOverflow(doc, y)
//     }

//     // SKILLS section
//     if (skills.length) {
//       // Title
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('SKILLS', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       doc.setFont('helvetica', 'normal')
//       doc.setFontSize(10)

//       skills.forEach((skillItem) => {
//         const label = `${skillItem?.skill_category}:`
//         const content = skillItem?.list_of_skill
//         const boldWidth = doc.getTextWidth(label)

//         doc.setFont('helvetica', 'bold')
//         doc.text(label, marginLeft, y)

//         doc.setFont('helvetica', 'normal')
//         doc.text(content, marginLeft + boldWidth + 5, y)

//         y += 5
//         y = checkPageOverflow(doc, y)
//       })

//       y += 1
//     }

//     //Education, work
//     const { education, works } = cvData.value

//     if (education.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('EDUCATION', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       education.forEach((edu) => {
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         doc.text(edu?.degree, marginLeft, y)

//         const eduDate = `${formatDateUs(edu?.start_date)} - ${formatDateUs(edu?.end_date)}`
//         const dateWidth = doc.getTextWidth(eduDate)
//         doc.text(eduDate, pageWidth - marginRight - dateWidth, y)

//         y += 5

//         doc.setFont('helvetica', 'normal')
//         doc.text(edu?.school, marginLeft, y)

//         y += 5
//         y = checkPageOverflow(doc, y)
//       })

//       y += 2
//     }

//     // WORK EXPERIENCE section
//     if (works.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('WORK EXPERIENCE', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       works.forEach((work) => {
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         doc.text(work?.position, marginLeft, y)

//         const workDate = `${formatDateUs(work?.start_date)} - ${
//           work?.is_current_working ? 'Present' : formatDateUs(work?.end_date)
//         }`
//         const dateWidth = doc.getTextWidth(workDate)
//         doc.text(workDate, pageWidth - marginRight - dateWidth, y)

//         y += 5

//         doc.setFont('helvetica', 'bold')
//         doc.text(work.company_name, marginLeft, y)

//         const locationWidth = doc.getTextWidth(work?.location)
//         doc.setFont('helvetica', 'normal')
//         doc.text(work?.location, pageWidth - marginRight - locationWidth, y)

//         y += 5

//         const descriptionLines = doc.splitTextToSize(work?.description, contentWidth)
//         doc.setFont('helvetica', 'normal')
//         descriptionLines.forEach((line) => {
//           doc.text(line, marginLeft, y)
//           y += 5
//           y = checkPageOverflow(doc, y)
//         })

//         y += 3
//       })
//     }

//     // PROJECTS section
//     const { projects } = cvData.value
//     if (projects.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('PROJECTS', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       projects.forEach((project) => {
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         const title = project?.project_name
//         const link = project?.project_link
//         doc.textWithLink(title, marginLeft, y, { url: link })

//         const projectDate = `${formatDateUs(project?.start_date)} - ${
//           project.is_ongoing ? 'Present' : formatDateUs(project?.end_date)
//         }`
//         doc.setFont(undefined, 'bold')
//         doc.text(projectDate, pageWidth - marginRight, y, { align: 'right' })
//         doc.setFont(undefined, 'normal')

//         y += 5

//         // Description
//         const parsedLines = parseHTMLToLines(project?.description)
//         const maxWidth = pageWidth - marginLeft - marginRight

//         parsedLines.forEach((line) => {
//           const wrappedLines = doc.splitTextToSize(line, maxWidth)

//           wrappedLines.forEach((wrappedLine) => {
//             doc.text(wrappedLine, marginLeft, y)
//             y += 5
//             y = checkPageOverflow(doc, y)
//           })
//         })

//         y += 3
//       })
//     }

//     // LANGUAGES section
//     const { languages } = cvData.value
//     if (languages.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('LANGUAGES', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       const languageTextParts = languages.map((lang) => {
//         return {
//           bold: lang?.language,
//           normal: ` (${lang?.proficiency})`,
//         }
//       })

//       let x = marginLeft

//       languageTextParts.forEach((part, index) => {
//         doc.setFont('helvetica', 'bold')
//         doc.text(part.bold, x, y)
//         x += doc.getTextWidth(part.bold)

//         doc.setFont('helvetica', 'normal')
//         doc.text(part.normal, x, y)
//         x += doc.getTextWidth(part.normal)

//         if (index < languageTextParts.length - 1) {
//           const separator = ' • '
//           doc.text(separator, x, y)
//           x += doc.getTextWidth(separator)
//         }
//       })

//       y += 8
//     }

//     // CERTIFICATIONS section
//     const { certification } = cvData.value
//     if (certification.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('CERTIFICATIONS', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       certification.forEach((cert) => {
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         doc.text(cert?.certification_name, marginLeft, y)

//         doc.setFont('helvetica', 'normal')
//         doc.setTextColor(100)
//         const orgText = ` by ${cert?.issuing_organization}`
//         doc.text(orgText, marginLeft + doc.getTextWidth(cert?.certification_name + 4), y)

//         doc.setFont('helvetica', 'bold')
//         doc.setTextColor(0, 0, 0)
//         const certDate = formatDateUs(cert?.issued_date)
//         doc.text(certDate, pageWidth - marginRight, y, { align: 'right' })

//         y += 5

//         if (cert?.credential_id) {
//           doc.setTextColor(100)
//           doc.textWithLink(`Credential ID: ${cert?.credential_id}`, marginLeft, y, {
//             url: cert?.certification_link,
//           })
//           y += 6
//         } else {
//           y += 3
//         }

//         doc.setTextColor(0)
//       })
//     }

//     // ORGANIZATIONAL & VOLUNTEERING EXPERIENCE
//     const { organization } = cvData.value
//     if (organization.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('ORGANIZATIONAL & VOLUNTEERING EXPERIENCE', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       organization.forEach((org) => {
//         // Position (bold)
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         doc.text(org.position, marginLeft, y)

//         // Date (right side)
//         const dateRange = `${formatDateUs(org?.start_date)} - ${formatDateUs(org?.end_date)}`
//         doc.text(dateRange, pageWidth - marginRight, y, { align: 'right' })
//         y += 5

//         // Organization Name (bold) + Address (normal)
//         doc.setFont('helvetica', 'bold')
//         doc.text(org?.name, marginLeft, y)

//         doc.setFont('helvetica', 'normal')
//         doc.text(org?.name, pageWidth - marginRight, y, { align: 'right' })
//         y += 5

//         // Description
//         // const wrapped = doc.splitTextToSize(org?.description, pageWidth - marginLeft - marginRight)
//         // wrapped.forEach((line) => {
//         //   doc.text(line, marginLeft, y)
//         //   y += 5
//         //   y = checkPageOverflow(doc, y)
//         // })
//         const parsedLines = parseHTMLToLines(org?.description)
//         const maxWidth = pageWidth - marginLeft - marginRight

//         parsedLines.forEach((line) => {
//           const wrappedLines = doc.splitTextToSize(line, maxWidth)

//           wrappedLines.forEach((wrappedLine) => {
//             doc.text(wrappedLine, marginLeft, y)
//             y += 5
//             y = checkPageOverflow(doc, y)
//           })
//         })

//         y += 3
//       })
//     }

//     // AWARDS section
//     const { award } = cvData.value
//     if (award.length) {
//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(10)
//       doc.text('AWARDS', marginLeft, y)
//       y += 2

//       doc.setDrawColor(15, 23, 42)
//       doc.setLineWidth(0.3)
//       doc.line(marginLeft, y, pageWidth - marginRight, y)
//       y += 5

//       award.forEach((aw) => {
//         doc.setFont('helvetica', 'bold')
//         doc.setFontSize(10)
//         doc.textWithLink(aw?.award_title, marginLeft, y, { url: aw?.award_title_link })

//         doc.setFont('helvetica', 'normal')
//         doc.setTextColor(100)
//         const issuerText = ` (${aw?.issued_by})`
//         doc.text(issuerText, marginLeft + doc.getTextWidth(aw?.award_title + 4), y)

//         const awardDate = formatDateUs(aw?.issued_date)
//         doc.setFont('helvetica', 'bold')
//         doc.setTextColor(0, 0, 0)
//         doc.text(awardDate, pageWidth - marginRight, y, { align: 'right' })

//         y += 5

//         // Description
//         doc.setFont('helvetica', 'normal')
//         doc.setTextColor(0)
//         const lines = doc.splitTextToSize(aw?.description, pageWidth - marginLeft - marginRight)
//         lines.forEach((line) => {
//           doc.text(line, marginLeft, y)
//           y += 5
//           y = checkPageOverflow(doc, y)
//         })

//         y += 5
//       })
//     }

//     //save file
//     doc.save(`${personal_details?.full_name}_CV.pdf`)
//   } catch (error) {
//     console.error('Error generating PDF:', error)
//     alert('Failed to generate PDF. Please try again.')
//   }
// }

const checkPageOverflow = (doc: jsPDF, currentY: number, additionalHeight = 10): number => {
  const pageHeight = doc.internal.pageSize.height
  const marginBottom = 20
  if (currentY + additionalHeight > pageHeight - marginBottom) {
    doc.addPage()
    return 20
  }
  return currentY
}

const handleDownload = () => {
  handleCancelEdit()
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [250, 350],
    })

    const {
      personal_details,
      summary,
      socials,
      skills,
      education,
      works,
      projects,
      languages,
      certification,
      organization,
      award,
    } = cvData.value || {}
    const marginContent = 14

    let y = 20
    const pageWidth = doc.internal.pageSize.width
    const marginLeft = 10
    const marginRight = 10
    const contentWidth = pageWidth - marginLeft - marginRight

    // parse HTML for description
    const parseHTMLToLines = (html: string | undefined): string[] => {
      if (!html) return []
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
    const name = personal_details?.full_name?.toUpperCase() || 'UNKNOWN NAME'
    const nameX = (pageWidth - doc.getTextWidth(name)) / 2
    doc.text(name, nameX, y)
    y += 8 // Maintain increased spacing after fullName

    // Header: Contact Info and Social Links
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(143, 143, 143)

    const contactItems = [
      personal_details?.address,
      personal_details?.email,
      personal_details?.phone_number,
      ...(socials?.map((s) => s?.link) || []),
    ].filter((item): item is string => !!item && item !== '')

    if (contactItems.length) {
      const contactY = y
      const lineHeight = 5
      let currentLineWidth = 0
      const lines = [[]]

      contactItems.forEach((item, index) => {
        const text = index === contactItems.length - 1 ? item : item + '  •  '
        const textWidth = doc.getTextWidth(text)

        if (currentLineWidth + textWidth > contentWidth) {
          lines[lines.length - 1][lines[lines.length - 1].length - 1].text = lines[
            lines.length - 1
          ][lines[lines.length - 1].length - 1].text.replace('  •  ', '') // Remove bullet from last item of previous line
          lines.push([])
          currentLineWidth = 0
        }

        lines[lines.length - 1].push({ text, isSocialLink: socials?.some((s) => s?.link === item) })
        currentLineWidth += textWidth
      })

      lines.forEach((lineItems, lineIndex) => {
        const lineY = contactY + lineIndex * lineHeight
        const totalLineWidth = lineItems.reduce((acc, item) => acc + doc.getTextWidth(item.text), 0)
        let startX = (pageWidth - totalLineWidth) / 2

        lineItems.forEach(({ text, isSocialLink }) => {
          const cleanText = text.endsWith('  •  ') ? text.slice(0, -3) : text
          if (isSocialLink) {
            doc.textWithLink(cleanText, startX, lineY, { url: cleanText })
            const textWidth = doc.getTextWidth(cleanText)
            doc.setLineWidth(0.15)
            doc.setDrawColor(143, 143, 143)
            doc.line(startX, lineY + 0.8, startX + textWidth, lineY + 0.8)
          } else {
            doc.text(text, startX, lineY)
          }
          startX += doc.getTextWidth(text) // Use full text (with bullet) for positioning
        })
      })

      y += lines.length * lineHeight + 2
    }
    doc.setTextColor(0, 0, 0)

    // Summary
    if (summary?.trim()) {
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
    if (skills?.length) {
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
        if (!skillItem?.skill_category || !skillItem?.list_of_skill) return
        const label = `${skillItem.skill_category}: `
        const content = skillItem.list_of_skill
        const boldWidth = doc.getTextWidth(label)

        doc.setFont('helvetica', 'bold')
        doc.text(label, marginContent, y)

        doc.setFont('helvetica', 'normal')
        doc.text(content, marginContent + boldWidth + 3, y)

        y += 5
        y = checkPageOverflow(doc, y)
      })

      y += 1
    }

    // Education
    if (education?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('EDUCATION', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      education.forEach((edu) => {
        if (!edu?.degree || !edu?.school) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(edu.degree, marginContent, y)

        const eduDate =
          edu.start_date && edu.end_date
            ? `${formatDateUs(edu.start_date)} - ${formatDateUs(edu.end_date)}`
            : ''
        if (eduDate) {
          const dateWidth = doc.getTextWidth(eduDate)
          doc.text(eduDate, pageWidth - marginContent - dateWidth, y)
        }

        y += 5

        doc.setFont('helvetica', 'normal')
        doc.text(edu.school, marginContent, y)

        y += 5
        y = checkPageOverflow(doc, y)
      })

      y += 2
    }

    // WORK EXPERIENCE section
    if (works?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('WORK EXPERIENCE', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const workContentWidth = pageWidth - marginContent - marginContent

      works.forEach((work) => {
        if (!work?.position || !work?.company_name) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(work.position, marginContent, y)

        const workDate = work.start_date
          ? `${formatDateUs(work.start_date)} - ${work.is_current_working ? 'Present' : formatDateUs(work.end_date) || ''}`
          : ''
        if (workDate) {
          const dateWidth = doc.getTextWidth(workDate)
          doc.text(workDate, pageWidth - marginContent - dateWidth, y)
        }

        y += 5

        doc.setFont('helvetica', 'bold')
        doc.text(work.company_name, marginContent, y)

        if (work.location) {
          const locationWidth = doc.getTextWidth(work.location)
          doc.setFont('helvetica', 'normal')
          doc.text(work.location, pageWidth - marginContent - locationWidth, y)
        }

        y += 5

        if (work.description) {
          const parsedLines = parseHTMLToLines(work.description)
          const maxWidth = workContentWidth

          parsedLines.forEach((line) => {
            const wrappedLines = doc.splitTextToSize(line, maxWidth)

            wrappedLines.forEach((wrappedLine) => {
              doc.text(wrappedLine, marginContent, y)
              y += 5
              y = checkPageOverflow(doc, y)
            })
          })
        }

        y += 3
      })
    }

    // PROJECTS section
    if (projects?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('PROJECTS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const projectContentWidth = pageWidth - marginContent - marginContent

      projects.forEach((project) => {
        if (!project?.project_name) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        const title = project.project_name
        const link = project.project_link || ''
        if (link) {
          doc.textWithLink(title, marginContent, y, { url: link })
        } else {
          doc.text(title, marginContent, y)
        }

        const projectDate = project.start_date
          ? `${formatDateUs(project.start_date)} - ${project.is_ongoing ? 'Present' : formatDateUs(project.end_date) || ''}`
          : ''
        if (projectDate) {
          doc.setFont(undefined, 'bold')
          doc.text(projectDate, pageWidth - marginContent, y, { align: 'right' })
          doc.setFont(undefined, 'normal')
        }

        y += 5

        if (project.description) {
          const parsedLines = parseHTMLToLines(project.description)
          const maxWidth = projectContentWidth

          parsedLines.forEach((line) => {
            const wrappedLines = doc.splitTextToSize(line, maxWidth)

            wrappedLines.forEach((wrappedLine) => {
              doc.text(wrappedLine, marginContent, y)
              y += 5
              y = checkPageOverflow(doc, y)
            })
          })
        }

        y += 3
      })
    }

    // LANGUAGES section
    if (languages?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('LANGUAGES', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const languageTextParts = languages
        .filter((lang) => lang?.language && lang?.proficiency)
        .map((lang) => ({
          bold: lang.language,
          normal: ` (${lang.proficiency})`,
        }))

      if (languageTextParts.length) {
        let x = marginContent

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
    }

    // CERTIFICATIONS section
    if (certification?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('CERTIFICATIONS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      certification.forEach((cert) => {
        if (!cert?.certification_name) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(cert.certification_name, marginContent, y)

        if (cert.issuing_organization) {
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(100)
          const orgText = ` by ${cert.issuing_organization}`
          doc.text(orgText, marginContent + doc.getTextWidth(cert.certification_name + '   '), y)
        }

        if (cert.issued_date) {
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          const certDate = formatDateUs(cert.issued_date)
          doc.text(certDate, pageWidth - marginContent, y, { align: 'right' })
        }

        y += 5

        if (cert.credential_id && cert.certification_link) {
          doc.setTextColor(100)
          doc.textWithLink(`Credential ID: ${cert.credential_id}`, marginContent, y, {
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
    if (organization?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('ORGANIZATIONAL & VOLUNTEERING EXPERIENCE', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const orgContentWidth = pageWidth - marginContent - marginContent

      organization.forEach((org) => {
        if (!org?.position || !org?.name) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text(org.position, marginContent, y)

        const dateRange =
          org.start_date && org.end_date
            ? `${formatDateUs(org.start_date)} - ${formatDateUs(org.end_date)}`
            : ''
        if (dateRange) {
          doc.text(dateRange, pageWidth - marginContent, y, { align: 'right' })
        }
        y += 5

        doc.setFont('helvetica', 'bold')
        doc.text(org.name, marginContent, y)

        doc.setFont('helvetica', 'normal')
        doc.text(org.name, pageWidth - marginContent, y, { align: 'right' })
        y += 5

        if (org.description) {
          const parsedLines = parseHTMLToLines(org.description)
          const maxWidth = orgContentWidth

          parsedLines.forEach((line) => {
            const wrappedLines = doc.splitTextToSize(line, maxWidth)

            wrappedLines.forEach((wrappedLine) => {
              doc.text(wrappedLine, marginContent, y)
              y += 5
              y = checkPageOverflow(doc, y)
            })
          })
        }

        y += 3
      })
    }

    // AWARDS section
    if (award?.length) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('AWARDS', marginLeft, y)
      y += 2

      doc.setDrawColor(15, 23, 42)
      doc.setLineWidth(0.3)
      doc.line(marginLeft, y, pageWidth - marginRight, y)
      y += 5

      const awardContentWidth = pageWidth - marginContent - marginContent

      award.forEach((aw) => {
        if (!aw?.award_title) return
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        if (aw.award_title_link) {
          doc.textWithLink(aw.award_title, marginContent, y, { url: aw.award_title_link })
        } else {
          doc.text(aw.award_title, marginContent, y)
        }

        if (aw.issued_by) {
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(100)
          const issuerText = ` (${aw.issued_by})`
          doc.text(issuerText, marginContent + doc.getTextWidth(aw.award_title + ' '), y)
        }

        if (aw.issued_date) {
          const awardDate = formatDateUs(aw.issued_date)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(0, 0, 0)
          doc.text(awardDate, pageWidth - marginContent, y, { align: 'right' })
        }

        y += 5

        if (aw.description) {
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(0)
          const lines = doc.splitTextToSize(aw.description, awardContentWidth)
          lines.forEach((line) => {
            doc.text(line, marginContent, y)
            y += 5
            y = checkPageOverflow(doc, y)
          })
        }

        y += 5
      })
    }

    // Save file
    doc.save(`${personal_details?.full_name || 'CV'}_CV.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

const handleButtonClick = () => {
  refInput.value?.click()
}

onMounted(() => {
  fetchResumeDetail()
})
</script>

<template>
  <div class="p-8 px-0 flex flex-col gap-8 h-full overflow-y-hidden">
    <div class="px-8 flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <RouterLink
                class="text-primary"
                to="/templates"
                >Templates</RouterLink
              >
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-primary">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="flex items-center gap-3">
        <div
          class="flex gap-1 items-center justify-center cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-200"
        >
          <span class="i-solar-code-circle-broken w-4 h-4 font-medium"></span>
          <p class="text-base font-medium">Tips & Tricks</p>
        </div>
        <Button
          :disabled="isLoading"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
          @click="handleButtonClick"
        >
          <span class="i-solar-bolt-outline text-primary w-4 h-4"></span>
          <span class="text-primary">Import</span>
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize text-primary ml-2"
          ></span>
          <input
            ref="refInput"
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx"
            @change="onChangeFile"
          />
        </Button>
        <Button
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
          @click="showPreview()"
        >
          <span class="text-primary i-solar-eye-linear w-4 h-4"></span>
          <span class="text-primary">Preview</span>
        </Button>
        <Button
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
          @click="handleDownload()"
        >
          <span class="text-primary i-solar-download-minimalistic-broken w-4 h-4"></span>
          <span class="text-primary">Download</span>
        </Button>
      </div>
    </div>

    <div
      v-if="resumeStore?.dataResume?.id"
      class="px-8 flex gap-6 overflow-y-hidden p-1"
    >
      <TemplateCore />
      <div class="flex flex-col gap-6 min-w-[300px]">
        <Evaluation />
        <!-- <MatchResume /> -->
      </div>
    </div>

    <MPreview
      v-if="isShowPreview"
      @close="unShowPreview()"
    />
  </div>
</template>

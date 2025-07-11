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
import { useRoute } from 'vue-router'
import jsPDF from 'jspdf'
import { formatDateUs } from '@/utils/format'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import MImport from '@/components/template/modal/MImport.vue'

const resumeStore = useResumeStore()

const { getResumeDetail } = resumeStore

const route = useRoute()

const idResume = computed(() => route.params?.id as string)
const cvData = computed(() => resumeStore.getResumeInfo)

const isShowPreview = ref(false)
const isShowImport = ref(false)

const fetchResumeDetail = async () => {
  await getResumeDetail(idResume.value)
}

const showPreview = () => {
  resumeStore.handleCancelEdit()
  resumeStore.setShowPreview()
  isShowPreview.value = true
}

const unShowPreview = () => {
  resumeStore.setUnShowPreview()
  isShowPreview.value = false
}

const showImport = () => {
  isShowImport.value = true
}

const unShowImport = () => {
  isShowImport.value = false
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

const handleDownload = () => {
  resumeStore.handleCancelEdit()
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [250, 350],
    })

    // Hàm xóa dấu tiếng Việt sử dụng chuẩn hóa Unicode
    const removeDiacritics = (str: string) => {
      if (!str) return str
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
    }

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
    const parseHTMLToLines = (
      html: string | undefined,
    ): {
      text: string
      isBold: boolean
      isItalic: boolean
      isListItem: boolean
      isLink: boolean
      isNewLine: boolean
    }[] => {
      if (!html) return []

      const parser = new DOMParser()
      const parsed = parser.parseFromString(html, 'text/html')
      const lines: {
        text: string
        isBold: boolean
        isItalic: boolean
        isListItem: boolean
        isLink: boolean
        isNewLine: boolean
      }[] = []

      const walk = (
        node: Node,
        context = { bold: false, italic: false, list: false, link: false },
      ) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const rawText = node.textContent?.trim()
          if (rawText) {
            lines.push({
              text: removeDiacritics(rawText),
              isBold: context.bold,
              isItalic: context.italic,
              isListItem: context.list,
              isLink: context.link,
              isNewLine: false,
            })
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement
          const tag = el.tagName.toUpperCase()
          const newContext = {
            bold: context.bold || ['B', 'STRONG'].includes(tag),
            italic: context.italic || ['I', 'EM'].includes(tag),
            list: context.list || ['LI'].includes(tag),
            link: context.link || tag === 'A',
          }

          if (tag === 'BR') {
            lines.push({
              text: '',
              isBold: false,
              isItalic: false,
              isListItem: false,
              isLink: false,
              isNewLine: true,
            })
            return
          }

          if (tag === 'P' || tag === 'LI' || tag === 'DIV') {
            // thêm dòng mới trước nội dung đoạn
            // if (lines.length > 0) {
            //   lines.push({
            //     text: '',
            //     isBold: false,
            //     isItalic: false,
            //     isListItem: false,
            //     isLink: false,
            //     isNewLine: true,
            //   })
            // }
          }

          node.childNodes.forEach((child) => walk(child, newContext))
        }
      }

      walk(parsed.body)

      return lines
    }

    const renderHTMLDescription = (
      doc: jsPDF,
      html: string,
      startY: number,
      marginLeft: number,
      maxWidth: number,
    ): number => {
      const lines = parseHTMLToLines(html)
      const lineHeight = 5
      let y = startY

      lines.forEach((line) => {
        if (line.isNewLine) {
          y += lineHeight
          y = checkPageOverflow(doc, y)
          return
        }

        const wrappedLines = doc.splitTextToSize(line.text, maxWidth)

        wrappedLines.forEach((wrappedLine) => {
          doc.setFont('helvetica', line.isBold ? 'bold' : 'normal')
          doc.text(wrappedLine, marginLeft, y)
          y += lineHeight
          y = checkPageOverflow(doc, y)
        })
      })

      return y
    }

    // Header: Name
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    const name = personal_details?.full_name?.toUpperCase() || 'UNKNOWN NAME'
    const cleanName = removeDiacritics(name) // Xóa dấu
    const nameX = (pageWidth - doc.getTextWidth(cleanName)) / 2
    doc.text(cleanName, nameX, y)
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
      const summaryLines = parseHTMLToLines(summary)
      const lineHeight = 5
      const contentWidth = pageWidth - 2 * marginLeft

      let currentY = y

      summaryLines.forEach((line) => {
        if (line.isNewLine) {
          currentY += lineHeight
          currentY = checkPageOverflow(doc, currentY)
          return
        }

        const wrappedLines = doc.splitTextToSize(line.text, contentWidth)

        wrappedLines.forEach((wrappedLine) => {
          doc.setFont('helvetica', line.isBold ? 'bold' : 'normal')
          doc.text(wrappedLine, marginLeft, currentY)
          currentY += lineHeight
          currentY = checkPageOverflow(doc, currentY)
        })
      })

      y = currentY + 2
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
        const label = `${skillItem.skill_category}: `
        const content = skillItem.list_of_skill

        // Max width của trang
        const maxWidth = pageWidth - marginContent - marginRight

        // Đo độ rộng của label
        doc.setFont('helvetica', 'bold')
        const labelWidth = doc.getTextWidth(label)

        // Phần còn lại cho content ở dòng đầu tiên
        const firstLineWidth = maxWidth - labelWidth

        // Cắt content thành phần đầu và phần còn lại
        doc.setFont('helvetica', 'normal')
        const contentWords = content.split(' ')

        let firstLine = ''
        while (contentWords.length) {
          const testLine = firstLine ? firstLine + ' ' + contentWords[0] : ' ' + contentWords[0]
          if (doc.getTextWidth(testLine) <= firstLineWidth) {
            firstLine = testLine
            contentWords.shift()
          } else {
            break
          }
        }

        // const remainingLines = doc.splitTextToSize(contentWords.join(''), maxWidth)

        // Vẽ dòng đầu tiên (label + firstLine)
        doc.setFont('helvetica', 'bold')
        doc.text(label, marginContent, y)

        doc.setFont('helvetica', 'normal')
        doc.text(firstLine, marginContent + labelWidth, y)

        y += 5
        y = checkPageOverflow(doc, y)

        // // Vẽ các dòng còn lại (nếu có)
        // remainingLines.forEach((line) => {
        //   doc.text(line, marginContent, y)
        //   y += 5
        //   y = checkPageOverflow(doc, y)
        // })
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

      const workContentWidth = pageWidth - marginContent - marginContent

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

        if (edu.description) {
          y = renderHTMLDescription(doc, edu.description, y, marginContent, workContentWidth)
          y += 2
        }
      })
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
          y = renderHTMLDescription(doc, work.description, y, marginContent, workContentWidth)
          y += 3
        }
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
          y = renderHTMLDescription(doc, project.description, y, marginContent, projectContentWidth)
          y += 3
        }
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
          doc.setTextColor(0, 0, 0)
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
          y = renderHTMLDescription(doc, org.description, y, marginContent, orgContentWidth)
          y += 3
        }
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
          y = renderHTMLDescription(doc, aw.description, y, marginContent, awardContentWidth)
          y += 5
        }
      })
    }

    // Save file
    doc.save(`${personal_details?.full_name || 'CV'}_CV.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}

onMounted(() => {
  fetchResumeDetail()

  if (localStorage.getItem('cvmaker-tour')) {
    return
  }
  const driverObj = driver({
    onDestroyStarted: async () => {
      if (!driverObj.hasNextStep()) {
        localStorage.setItem('cvmaker-tour', 'true')
        driverObj.destroy()
      }
    },
    onCloseClick: () => {
      localStorage.setItem('cvmaker-tour', 'true')
      driverObj.destroy()
    },
    showProgress: true,
    steps: [
      {
        element: '#tour-item[data-tour="1"]',
        popover: {
          title: 'Import your resume',
          description: 'You can import your resume by clicking this button.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="2"]',
        popover: {
          title: 'Create your CV',
          description: 'You can add your information in some sections below.',
          side: 'top',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="3"]',
        popover: {
          title: 'Pick sections you want to add',
          description: 'You can pick more sections you want to add to your CV.',
          side: 'top',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="4"]',
        popover: {
          title: 'Evaluate & improve your CV',
          description:
            'The system will evaluate your CV and give you some suggestions to improve it.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="5"]',
        popover: {
          title: 'Important improvements',
          description: 'The system will give you some important improvements to your CV.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="6"]',
        popover: {
          title: 'Recommended improvements',
          description: 'The system will give you some recommended improvements to your CV.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="7"]',
        popover: {
          title: 'Nice to have improvements',
          description: 'The system will give you some nice to have improvements to your CV.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="8"]',
        popover: {
          title: 'Preview your CV',
          description: 'You can preview your CV before downloading it.',
          side: 'left',
          align: 'start',
        },
      },
      {
        element: '#tour-item[data-tour="9"]',
        popover: {
          title: 'Download your CV',
          description: 'You can download your CV by clicking this button.',
          side: 'left',
          align: 'start',
        },
      },
    ],
  })

  driverObj.drive()
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
          id="tour-item"
          data-tour="1"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
          @click="showImport()"
        >
          <span class="text-primary">Import</span>
        </Button>
        <Button
          id="tour-item"
          data-tour="8"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
          @click="showPreview()"
        >
          <span class="text-primary i-solar-eye-linear w-4 h-4"></span>
          <span class="text-primary">Preview</span>
        </Button>
        <Button
          id="tour-item"
          data-tour="9"
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
      <TemplateCore :key="resumeStore?.cvId" />
      <div class="flex flex-col gap-6 w-[400px]">
        <Evaluation
          id="tour-item"
          data-tour="4"
        />
        <!-- <MatchResume /> -->
      </div>
    </div>

    <MPreview
      v-if="isShowPreview"
      @close="unShowPreview()"
    />

    <MImport
      v-if="isShowImport"
      @close="unShowImport()"
    />
  </div>
</template>
<style scoped lang="scss">
.driver-popover {
  background-color: #fde047 !important;
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
  color: #000;
}

.driver-popover.driverjs-theme button {
  flex: 1;
  text-align: center;
  background-color: #000;
  color: #ffffff;
  border: 2px solid #000;
  text-shadow: none;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 6px;
}

.driver-popover.driverjs-theme button:hover {
  background-color: #000;
  color: #ffffff;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

.driver-popover.driverjs-theme .driver-popover-close-btn {
  color: #9b9b9b;
}

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: #fde047;
}
</style>

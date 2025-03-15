export default function useDownloadPdf() {
  function downloadPdf(pdfUrl: string) {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.target = '_blank'
    link.download = 'my-pdf-file.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    downloadPdf,
  }
}

import { itActionVerbs } from '@/const'

export const formatDateUs = (date: string) => {
  try {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  } catch (error) {
    console.error('Invalid date format:', date, error)
    return 'Unknown'
  }
}

export const cleanQuillContent = (html: string) => {
  const cleaned = html.trim()
  if (cleaned === '<p><br></p>' || cleaned === '<p><br /></p>' || cleaned === '') {
    return ''
  }
  return cleaned
}

export const countWords = (text: string): number => {
  if (!text) return 0

  const words = text.trim().split(/\s+/)

  return words[0] === '' ? 0 : words.length
}

export const checkActionWork = (text: string) => {
  return itActionVerbs.some((verb) => new RegExp(`\\b${verb}\\b`, 'i').test(text))
}

export const containsNumber = (text: string) => {
  return /\d/.test(text)
}

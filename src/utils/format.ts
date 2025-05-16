export const formatDateUs = (date: string) => {
  try {
    if (!date) return 'Present'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    })
  } catch (error) {
    console.error('Invalid date format:', date, error)
    return 'Unknown'
  }
}

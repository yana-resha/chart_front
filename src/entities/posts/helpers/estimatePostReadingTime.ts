export const estimatePostReadingTime = (markdown: string) => {
  const w = markdown.split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.round(w / 220))} мин чтения`
}

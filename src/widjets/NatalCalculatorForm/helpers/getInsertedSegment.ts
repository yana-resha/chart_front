export const getInsertedSegment = (prev: string, next: string) => {
  if (prev === next) return ''
  let start = 0
  const minLen = Math.min(prev.length, next.length)
  while (start < minLen && prev[start] === next[start]) start++
  let endPrev = prev.length - 1
  let endNext = next.length - 1
  while (endPrev >= start && endNext >= start && prev[endPrev] === next[endNext]) {
    endPrev--
    endNext--
  }

  return next.slice(start, endNext + 1) // может быть пустым при удалении
}

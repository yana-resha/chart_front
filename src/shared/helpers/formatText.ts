export const formatText = (rawText: string): string[] => {
  if (!rawText) return []

  // Убираем обрамляющие кавычки, если они есть
  const unquoted = rawText.replace(/^['"]|['"]$/g, '')

  // Заменяем двойное экранирование \\n на обычное \n, а затем на настоящий перенос
  const cleaned = unquoted
    .replace(/\\\\n/g, '\n') // двойной backslash
    .replace(/\\n/g, '\n') // одиночный
    .replace(/\n{3,}/g, '\n\n') // тройные \n на двойные

  // Сплитим по двойному переносу строки
  return cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

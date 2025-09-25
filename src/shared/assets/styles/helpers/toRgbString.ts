export const toRgbString = (input: string): string => {
  // ищем все числа (целые или с плавающей точкой)
  const nums = input.match(/\d+(\.\d+)?/g)
  if (!nums) return '255, 255, 255' // fallback

  // отрезаем первые три (R,G,B)
  return nums.slice(0, 3).join(', ')
}

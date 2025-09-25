export const addAlpha = (color: string, alpha: number) => {
  if (!color) return ''
  if (color.startsWith('rgba')) {
    return color.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${alpha})`)
  }
  if (color.startsWith('rgb')) {
    return color.replace(/rgb\(([^)]+)\)/, `rgba($1, ${alpha})`)
  }
  if (color.startsWith('#')) {
    let r = 0,
      g = 0,
      b = 0
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16)
      g = parseInt(color[2] + color[2], 16)
      b = parseInt(color[3] + color[3], 16)
    } else if (color.length === 7) {
      r = parseInt(color.slice(1, 3), 16)
      g = parseInt(color.slice(3, 5), 16)
      b = parseInt(color.slice(5, 7), 16)
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return color
}

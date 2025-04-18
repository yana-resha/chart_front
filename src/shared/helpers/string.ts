export const escapeSpacesInTheEnd = (value: string): string => {
  if (value.endsWith(' ')) {
    return value.trim() + '%20'
  }

  return value
}

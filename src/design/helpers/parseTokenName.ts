export const parseTokenName = (name: string) => {
  const parts = name.split('/').map((part) => part.toLowerCase())

  if (parts[parts.length - 1] === 'default') {
    parts.pop()
  }

  return parts.join('-').toLowerCase()
}

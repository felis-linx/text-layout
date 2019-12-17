export default ({ text = '', columns = 1 }) => {
  const words = text.trim().split(/ /gm)
  const perColumn = Math.ceil(words.length / columns)

  const chunks = new Array(columns)
    .fill('')
    .map((_, index) => words.slice(0 + index * perColumn, Math.min((index + 1) * perColumn, words.length)).join(' '))

  return chunks
}

function formatLine(line, lineKey) {
  const parts = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match
  let partIndex = 0

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`${lineKey}-text-${partIndex++}`}>
          {line.slice(lastIndex, match.index)}
        </span>
      )
    }
    parts.push(
      <strong key={`${lineKey}-bold-${partIndex++}`} className="font-semibold">
        {match[1]}
      </strong>
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={`${lineKey}-text-${partIndex++}`}>{line.slice(lastIndex)}</span>
    )
  }

  return parts.length > 0 ? parts : line
}

export function ChatMessageContent({ content }) {
  const lines = content.split("\n")

  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {formatLine(line, lineIndex)}
        </span>
      ))}
    </>
  )
}

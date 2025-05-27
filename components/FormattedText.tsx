import React from 'react'

interface FormattedTextProps {
  content: string
  isPreview?: boolean
  maxLength?: number
  className?: string
}

// 处理文本中的简单格式化
function processTextFormatting(text: string): React.JSX.Element {
  // 处理 **粗体** 格式
  const boldRegex = /\*\*(.*?)\*\*/g
  // 处理 *斜体* 格式
  const italicRegex = /\*(.*?)\*/g
  // 处理 `代码` 格式
  const codeRegex = /`(.*?)`/g
  // 处理链接格式 [文本](链接)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  // 创建一个函数来处理所有格式
  const processFormats = (inputText: string) => {
    const parts: React.ReactNode[] = []
    
    // 简单的处理方式：按顺序处理每种格式
    const segments = inputText.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g)
    
    segments.forEach((segment, index) => {
      if (segment.match(boldRegex)) {
        const content = segment.replace(/\*\*/g, '')
        parts.push(
          <strong key={`bold-${index}`} className="font-semibold text-gray-900 dark:text-gray-100">
            {content}
          </strong>
        )
      } else if (segment.match(italicRegex) && !segment.match(boldRegex)) {
        const content = segment.replace(/\*/g, '')
        parts.push(
          <em key={`italic-${index}`} className="italic text-gray-800 dark:text-gray-200">
            {content}
          </em>
        )
      } else if (segment.match(codeRegex)) {
        const content = segment.replace(/`/g, '')
        parts.push(
          <code 
            key={`code-${index}`} 
            className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {content}
          </code>
        )
      } else if (segment.match(linkRegex)) {
        const match = segment.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (match) {
          const [, linkText, linkUrl] = match
          parts.push(
            <a 
              key={`link-${index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline transition-colors"
            >
              {linkText}
            </a>
          )
        }
      } else if (segment) {
        parts.push(segment)
      }
    })
    
    return parts
  }

  return <>{processFormats(text)}</>
}

// 智能截断文本
function smartTruncate(content: string, maxLength: number): { text: string; isTruncated: boolean } {
  if (content.length <= maxLength) {
    return { text: content, isTruncated: false }
  }

  // 尝试在句号、感叹号、问号处截断
  const sentences = content.match(/[^。！？]*[。！？]/g) || []
  let currentLength = 0
  const truncatedSentences: string[] = []

  for (const sentence of sentences) {
    if (currentLength + sentence.length <= maxLength) {
      truncatedSentences.push(sentence)
      currentLength += sentence.length
    } else {
      break
    }
  }

  if (truncatedSentences.length > 0) {
    return { text: truncatedSentences.join(''), isTruncated: true }
  }

  // 如果没有合适的句子截断点，尝试在空格处截断
  const words = content.split(' ')
  const truncatedWords: string[] = []
  currentLength = 0

  for (const word of words) {
    if (currentLength + word.length + 1 <= maxLength) {
      truncatedWords.push(word)
      currentLength += word.length + 1
    } else {
      break
    }
  }

  if (truncatedWords.length > 0) {
    return { text: truncatedWords.join(' '), isTruncated: true }
  }

  // 最后按字符截断
  return { text: content.slice(0, maxLength), isTruncated: true }
}

export default function FormattedText({
  content,
  isPreview = false,
  maxLength = 120,
  className = '',
}: FormattedTextProps) {
  // 按换行符分割内容
  const paragraphs = content.split('\n').filter((p) => p.trim() !== '')

  if (isPreview) {
    // 预览模式：智能截断
    const { text: truncatedContent, isTruncated } = smartTruncate(content, maxLength)
    const previewParagraphs = truncatedContent.split('\n').filter((p) => p.trim() !== '')

    return (
      <div className={`space-y-2 ${className}`}>
        {previewParagraphs.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {processTextFormatting(paragraph.trim())}
          </p>
        ))}
        {isTruncated && <span className="text-gray-400 dark:text-gray-500">...</span>}
      </div>
    )
  }

  // 完整模式：显示所有段落
  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="leading-relaxed">
          {processTextFormatting(paragraph.trim())}
        </p>
      ))}
    </div>
  )
}

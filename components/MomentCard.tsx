import Image from 'next/image'
import Link from '@/components/Link'

interface Moment {
  id: string
  date: string
  content: string
  imageUrl?: string
}

interface MomentProps {
  moment: Moment
}

export default function MomentCard({ moment }: MomentProps) {
  const { id, date, content, imageUrl } = moment

  // 格式化日期时间，精确到秒
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  // 截断内容，如果超过120个字符
  const isLongContent = content.length > 120
  const displayContent = isLongContent ? content.slice(0, 120) + '...' : content

  return (
    <div className="group">
      {/* 时间戳 */}
      <div className="mb-4 flex items-center">
        <div className="flex items-center text-sm">
          <svg
            className="text-primary-500 dark:text-primary-400 mr-2 h-4 w-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div className="border-l border-gray-200 pl-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <time dateTime={date} className="font-medium">
              {formattedDate}
            </time>
          </div>
        </div>
      </div>

      {/* 内容区域 - 使用flex布局优化图片和文字的排列 */}
      <div className={`flex gap-4 ${imageUrl ? 'items-start' : ''}`}>
        {/* 文字内容 */}
        <div className={`flex-1 ${imageUrl ? 'min-w-0' : ''}`}>
          <div className="prose mb-4 max-w-none text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">{displayContent}</p>
          </div>
          
          {/* 查看详情链接 */}
          <div className="flex items-center justify-start">
            <Link
              href={`/moments/${id}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors inline-flex items-center group/link"
            >
              查看详情 
              <svg 
                className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* 图片 - 优化尺寸和位置 */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative h-32 w-48 overflow-hidden rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md sm:h-36 sm:w-56">
              <Image
                src={imageUrl}
                alt="Moment visual"
                fill
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

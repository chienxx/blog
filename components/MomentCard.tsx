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
      <div className="mb-3 flex items-center">
        <div className="flex items-center text-sm">
          <svg
            className="text-primary-500 dark:text-primary-400 mr-2 h-4 w-4"
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

          <div className="ml-3 border-l border-gray-200 pl-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <time dateTime={date} className="font-medium">
              {formattedDate}
            </time>
          </div>
        </div>
      </div>

      <div className="prose mb-4 max-w-none text-gray-700 dark:text-gray-300">
        <p>{displayContent}</p>
      </div>

      {imageUrl && (
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt="Moment visual"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-center justify-end">
        <Link
          href={`/moments/${id}`}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
        >
          查看详情 &rarr;
        </Link>
      </div>
    </div>
  )
}

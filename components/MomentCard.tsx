import Image from 'next/image'
import Link from '@/components/Link'
import { Moment } from '@/data/momentsData'

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
    hour12: false
  })
  
  // 截断内容，如果超过120个字符
  const isLongContent = content.length > 120
  const displayContent = isLongContent ? content.slice(0, 120) + '...' : content

  return (
    <div className="group">
      <div className="flex items-center mb-3">
        <div className="flex items-center text-sm">
          <svg className="w-4 h-4 text-primary-500 dark:text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          
          <div className="ml-3 text-sm text-gray-500 dark:text-gray-400 pl-3 border-l border-gray-200 dark:border-gray-700">
          <time dateTime={date} className="font-medium">{formattedDate}</time>
        </div>
        </div>
      </div>
      
      <div className="prose max-w-none text-gray-700 dark:text-gray-300 mb-4">
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
      
      <div className="flex justify-end items-center">
        <Link
          href={`/moments/${id}`}
          className="text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          查看详情 &rarr;
        </Link>
      </div>
    </div>
  )
}
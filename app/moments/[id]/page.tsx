import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { momentsData } from '@/data/momentsData'
import Image from 'next/image'
import Link from '@/components/Link'
import { Metadata } from 'next'
import FormattedText from '@/components/FormattedText'

interface MomentPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: MomentPageProps): Promise<Metadata> {
  const { id } = await params
  const moment = momentsData.find((m) => m.id === id)
  if (!moment) {
    return genPageMetadata({ title: '动态未找到' })
  }

  return genPageMetadata({ title: `动态 - ${moment.content.slice(0, 20)}...` })
}

export default async function MomentPage({ params }: MomentPageProps) {
  const { id } = await params
  const moment = momentsData.find((m) => m.id === id)

  if (!moment) {
    notFound()
  }

  // 格式化日期时间，精确到秒
  const dateObj = new Date(moment.date)

  // 使用英文格式的日期显示（月份 日期, 年份）
  const formattedDate = dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/moments"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center transition-colors group"
        >
          <svg 
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回动态列表
        </Link>
      </div>

      <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="p-8">
          <div className="mb-6 flex items-center">
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
            <div className="border-l border-gray-200 pl-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <time dateTime={moment.date} className="font-medium">{formattedDate}</time>
            </div>
          </div>

          <div className="mb-8">
            <div className="prose prose-lg dark:prose-dark max-w-none">
              <FormattedText 
                content={moment.content} 
                isPreview={false}
                className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {moment.imageUrl && (
            <div className="mt-8">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image 
                  src={moment.imageUrl} 
                  alt="Moment visual" 
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105" 
                  priority
                  style={{
                    maxHeight: '70vh',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

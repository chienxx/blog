import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { momentsData } from '@/data/momentsData'
import Image from 'next/image'
import Link from '@/components/Link'
import { Metadata } from 'next'

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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/moments"
          className="text-primary-500 hover:text-primary-600 flex items-center transition-colors"
        >
          &larr; 返回动态列表
        </Link>
      </div>

      <article className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900">
        <div className="p-8">
          <div className="mb-6">
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={moment.date}>{formattedDate}</time>
            </div>

            <div className="prose dark:prose-dark max-w-none">
              <p className="text-lg leading-relaxed">{moment.content}</p>
            </div>
          </div>

          {moment.imageUrl && (
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg">
              <Image src={moment.imageUrl} alt="Moment visual" fill className="object-cover" />
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

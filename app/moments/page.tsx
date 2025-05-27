import { genPageMetadata } from 'app/seo'
import MomentCard from '../../components/MomentCard'
import { Metadata } from 'next'
import { momentsData } from '@/data/momentsData'
import Link from '@/components/Link'

export const metadata: Metadata = genPageMetadata({ title: 'Moments' })

// 每页显示的动态数量
const MOMENTS_PER_PAGE = 5

// 分页组件 - 与blog页面样式保持一致
function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/moments` : `/moments/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/moments/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function MomentsPage() {
  // 对动态按日期排序，最新的排在前面
  const sortedMoments = [...momentsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 计算总页数
  const totalPages = Math.ceil(sortedMoments.length / MOMENTS_PER_PAGE)

  // 第一页的内容
  const currentMoments = sortedMoments.slice(0, MOMENTS_PER_PAGE)
  const currentPage = 1

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 页面标题 */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-r bg-clip-text text-3xl leading-9 font-extrabold tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Moments
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          记录生活的点滴，分享我的日常所思所想
        </p>
      </div>

      {/* 动态列表 */}
      <div className="py-8">
        <div className="space-y-8">
          {currentMoments.map((moment, index) => (
            <article
              key={moment.id}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              <MomentCard moment={moment} />
            </article>
          ))}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </div>
  )
}

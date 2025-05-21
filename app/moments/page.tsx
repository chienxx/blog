import { genPageMetadata } from 'app/seo'
import MomentCard from '../../components/MomentCard'
import { Metadata } from 'next'
import { momentsData } from '@/data/momentsData'
import Link from '@/components/Link'

export const metadata: Metadata = genPageMetadata({ title: 'Moments' })

// 每页显示的动态数量
const MOMENTS_PER_PAGE = 5

// 分页组件
function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const basePath = 'moments'
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
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Moments
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          记录生活的点滴，分享我的日常所思所想
        </p>
      </div>

      <div className="py-12">
        <div className="space-y-10">
          {currentMoments.map((moment, index) => (
            <div
              key={moment.id}
              className={`rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 ${
                index % 2 === 0 ? 'transform hover:-translate-y-1' : 'transform hover:translate-y-1'
              }`}
            >
              <MomentCard moment={moment} />
            </div>
          ))}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
      </div>
    </div>
  )
}

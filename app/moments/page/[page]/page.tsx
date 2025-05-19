import { genPageMetadata } from 'app/seo'
import MomentCard from '../../../../components/MomentCard'
import { Metadata } from 'next'
import momentsData from '@/data/momentsData'
import Link from '@/components/Link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = genPageMetadata({ title: 'Moments' })

// 每页显示的动态数量
const MOMENTS_PER_PAGE = 5

// 生成静态路径参数
export const generateStaticParams = async () => {
  const totalPages = Math.ceil(momentsData.length / MOMENTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
  
  // 移除第一页，因为它已经由 /moments 路由处理
  return paths.filter(path => path.page !== '1')
}

// 分页组件
function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const basePath = 'moments'
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
      <nav className="flex justify-between items-center">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50 text-gray-400 dark:text-gray-600" disabled={!prevPage}>
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </span>
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/moments` : `/moments/page/${currentPage - 1}`}
            rel="prev"
            className="transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50 text-gray-400 dark:text-gray-600" disabled={!nextPage}>
            <span className="inline-flex items-center">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        )}
        {nextPage && (
          <Link 
            href={`/moments/page/${currentPage + 1}`} 
            rel="next"
            className="text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  )
}

interface PageParams {
  params: Promise<{
    page: string
  }>
}

export default async function MomentsPage({ params }: PageParams) {
  // 获取当前页码
  const { page } = await params
  const pageNumber = parseInt(page)
  
  // 对动态按日期排序，最新的排在前面
  const sortedMoments = [...momentsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  // 计算总页数
  const totalPages = Math.ceil(sortedMoments.length / MOMENTS_PER_PAGE)
  
  // 验证页码有效性
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  
  // 获取当前页的动态
  const currentMoments = sortedMoments.slice(
    MOMENTS_PER_PAGE * (pageNumber - 1),
    MOMENTS_PER_PAGE * pageNumber
  )

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-10 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600">
          Moments
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          记录生活的点滴，分享我的日常所思所想...
        </p>
      </div>

      <div className="py-12">
        <div className="space-y-12">
          {currentMoments.map((moment) => (
            <div 
              key={moment.id} 
              className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <MomentCard moment={moment} />
            </div>
          ))}
        </div>
        
        {/* 分页控件 */}
        {totalPages > 1 && (
          <Pagination currentPage={pageNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  )
} 
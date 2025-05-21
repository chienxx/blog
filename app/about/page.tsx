import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
import { changelog, tagTypeMap, ChangeType } from '@/data/changelogData'

export const metadata: Metadata = {
  title: 'About',
  description: '博客的更新记录和功能变更',
}

// 渲染标签组件
const Tag = ({ type }: { type: ChangeType }) => {
  const tagConfig = tagTypeMap[type] || tagTypeMap['发布']

  return (
    <span
      className={`mr-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagConfig.bgClass} transition-all duration-200 hover:scale-105`}
    >
      <span className="mr-1">{tagConfig.icon}</span> {type}
    </span>
  )
}

export default function ChangelogPage() {
  // 计算统计数据
  const totalVersions = changelog.length
  const totalNewFeatures = changelog.reduce(
    (acc, release) => acc + release.changes.filter((c) => c.type === '新增').length,
    0
  )
  const totalUpdates = changelog.reduce((acc, release) => acc + release.changes.length, 0)

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          About
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">记录博客的改进和新功能</p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="relative">
                {/* 时间轴线 */}
                <div className="absolute top-0 left-8 h-full w-0.5 bg-gray-300 dark:bg-gray-600"></div>

                {/* 改进的版本展示 */}
                <div className="space-y-12">
                  {changelog.map((release, index) => (
                    <div key={index} className="group relative">
                      {/* 时间节点 */}
                      <div className="group-hover:border-primary-500 absolute top-5 left-8 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white transition-all duration-300 group-hover:scale-110 dark:border-gray-700 dark:bg-gray-900">
                        <span className="group-hover:text-primary-500 text-xs font-bold text-gray-400 transition-colors duration-300 dark:text-gray-600">
                          {index + 1}
                        </span>
                      </div>

                      <div className="ml-20 transform transition-all duration-300 group-hover:translate-x-1">
                        {/* 版本标题 */}
                        <div className="flex items-baseline">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {release.version}
                          </h2>
                          <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                            {release.date}
                          </span>
                        </div>

                        {/* 版本更新列表 */}
                        <ul className="mt-4 space-y-4">
                          {release.changes.map((change, changeIndex) => (
                            <li
                              key={changeIndex}
                              className="flex items-start rounded-lg p-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                              <Tag type={change.type as ChangeType} />
                              <span className="text-gray-700 dark:text-gray-300">
                                {change.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="sticky top-8 space-y-8">
                {/* 版本说明卡片 */}
                <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800/50">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    版本说明
                  </h3>
                  <div className="space-y-4">
                    {/* 标签说明 */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">标签说明</h4>
                      <div className="mt-2 space-y-2">
                        {Object.entries(tagTypeMap).map(([type, config]) => (
                          <div
                            key={type}
                            className="flex items-center rounded p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                          >
                            <span
                              className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgClass}`}
                            >
                              <span className="mr-1">{config.icon}</span> {type}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {config.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 统计数据 */}
                    <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                      <h4 className="flex items-center font-medium text-gray-900 dark:text-gray-100">
                        统计
                      </h4>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-md bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {totalVersions}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">版本</div>
                        </div>
                        <div className="rounded-md bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {totalNewFeatures}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">新功能</div>
                        </div>
                        <div className="rounded-md bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {totalUpdates}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">总更新</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 联系信息卡片 */}
                <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800/50">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    联系方式
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    有任何问题或建议？请随时与我联系
                  </p>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${siteMetadata.email}`}
                      className="text-blue-500 transition hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {siteMetadata.email}
                    </a>
                  </div>
                </div>

                {/* Buy Me a Coffee 支持模块 */}
                <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800/50">
                  <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    支持我的创作
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    如果你喜欢我的内容，可以请我喝杯咖啡支持我继续创作
                  </p>
                  <div className="transform transition-transform duration-300 hover:scale-105">
                    <a
                      href="https://www.buymeacoffee.com/yourname"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-opacity hover:opacity-90"
                    >
                      <Image
                        src="/static/images/bmc-button.png"
                        alt="Buy Me A Coffee"
                        width={180}
                        height={50}
                        priority
                        className="rounded-md shadow-sm"
                        unoptimized
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: '博客的更新记录和功能变更',
}

// 更新日志数据
const changelog = [
  {
    date: '2024-06-15',
    version: 'v1.2.0',
    changes: [
      { type: '优化', description: '改进了整体页面加载速度' },
      { type: '新增', description: '添加了暗色模式切换动画' },
      { type: '修复', description: '解决了移动端显示问题' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0', 
    changes: [
      { type: '新增', description: '集成了评论功能' },
      { type: '优化', description: '重新设计了文章卡片UI' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [
      { type: '发布', description: '博客初始版本发布' },
    ],
  },
  {
    date: '2024-06-15',
    version: 'v1.2.0',
    changes: [
      { type: '优化', description: '改进了整体页面加载速度' },
      { type: '新增', description: '添加了暗色模式切换动画' },
      { type: '修复', description: '解决了移动端显示问题' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0', 
    changes: [
      { type: '新增', description: '集成了评论功能' },
      { type: '优化', description: '重新设计了文章卡片UI' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [
      { type: '发布', description: '博客初始版本发布' },
    ],
  },  {
    date: '2024-06-15',
    version: 'v1.2.0',
    changes: [
      { type: '优化', description: '改进了整体页面加载速度' },
      { type: '新增', description: '添加了暗色模式切换动画' },
      { type: '修复', description: '解决了移动端显示问题' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0', 
    changes: [
      { type: '新增', description: '集成了评论功能' },
      { type: '优化', description: '重新设计了文章卡片UI' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [
      { type: '发布', description: '博客初始版本发布' },
    ],
  },
]

// 标签类型映射
const tagTypeMap = {
  '新增': {
    bgClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    description: '新功能或新内容'
  },
  '优化': {
    bgClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: '性能或用户体验改进'
  },
  '修复': {
    bgClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    description: '问题或错误修复'
  },
  '发布': {
    bgClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    description: '主要版本发布'
  }
}

// 渲染标签组件
const Tag = ({ type }: { type: string }) => {
  const tagConfig = tagTypeMap[type] || tagTypeMap['发布']
  
  return (
    <span className={`mr-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagConfig.bgClass}`}>
      {type}
    </span>
  )
}

export default function ChangelogPage() {
  // 计算统计数据
  const totalVersions = changelog.length
  const totalNewFeatures = changelog.reduce((acc, release) => 
    acc + release.changes.filter(c => c.type === '新增').length, 0)
  const totalUpdates = changelog.reduce((acc, release) => 
    acc + release.changes.length, 0)
    
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          About
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          记录博客的改进和新功能
        </p>
      </div>
      <div className="container py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="relative">
                {/* 时间轴线 */}
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                
                {/* 改用分页展示或直接全部显示，不使用滚动条 */}
                <div className="space-y-12">
                  {changelog.map((release, index) => (
                    <div key={index} className="relative">
                      {/* 时间节点 */}
                      <div className="absolute left-8 top-5 -ml-4 h-8 w-8 rounded-full border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"></div>
                      
                      <div className="ml-20">
                        {/* 版本标题 */}
                        <div className="flex items-baseline">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{release.version}</h2>
                          <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">{release.date}</span>
                        </div>
                        
                        {/* 版本更新列表 */}
                        <ul className="mt-4 space-y-4">
                          {release.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="flex items-start">
                              <Tag type={change.type} />
                              <span className="text-gray-700 dark:text-gray-300">{change.description}</span>
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
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">版本说明</h3>
                  <div className="space-y-4">
                    {/* 标签说明 */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">标签说明</h4>
                      <div className="mt-2 space-y-2">
                        {Object.entries(tagTypeMap).map(([type, config]) => (
                          <div key={type} className="flex items-center">
                            <span className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgClass}`}>
                              {type}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{config.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 统计数据 */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">统计</h4>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-center">
                        <div className="rounded-md bg-white p-3 dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalVersions}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">版本</div>
                        </div>
                        <div className="rounded-md bg-white p-3 dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalNewFeatures}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">新功能</div>
                        </div>
                        <div className="rounded-md bg-white p-3 dark:bg-gray-700">
                          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalUpdates}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">总更新</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 联系信息卡片 */}
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">联系方式</h3>
                  {/* <p className="text-gray-600 dark:text-gray-400 mb-4">
                    有任何问题或建议？请随时与我们联系
                  </p> */}
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a
                      href={`mailto:${siteMetadata.email}`}
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
                    >
                      {siteMetadata.email}
                    </a>
                  </div>
                </div>
                
                {/* Buy Me a Coffee 支持模块 */}
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">支持我的创作</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    如果你喜欢我的内容，可以请我喝杯咖啡支持我继续创作
                  </p>
                  <a
                    href="https://www.buymeacoffee.com/yourname" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/static/images/bmc-button.png"
                      alt="Buy Me A Coffee"
                      width={180}
                      height={50}
                      priority
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
  )
}

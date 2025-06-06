// 更新日志数据
export const changelog = [
  {
    date: '2025-03-25',
    version: 'v1.3.0',
    changes: [
      { type: '新增', description: '记录博客更新日志' },
      { type: '修复', description: '升级nextjs版本，修复安全漏洞' },
    ],
  },
  {
    date: '2024-06-15',
    version: 'v1.2.0',
    changes: [
      { type: '优化', description: '改进了动态页面样式布局，支持灵活和丰富的文字内容显示' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0',
    changes: [
      { type: '新增', description: '增加动态导航栏' },
      { type: '优化', description: '美化工具页面卡片样式' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [{ type: '发布', description: '博客初始版本发布' }],
  },
]

// 标签类型映射
export const tagTypeMap = {
  新增: {
    bgClass: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
    icon: '✦',
    description: '新功能或新内容',
  },
  优化: {
    bgClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    icon: '↻',
    description: '性能或用户体验改进',
  },
  修复: {
    bgClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
    icon: '✓',
    description: '问题或错误修复',
  },
  发布: {
    bgClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
    icon: '★',
    description: '主要版本发布',
  },
}

// 导出类型定义
export type ChangeType = '新增' | '优化' | '修复' | '发布'

export type ChangeItem = {
  type: ChangeType
  description: string
}

export type ChangelogItem = {
  date: string
  version: string
  changes: ChangeItem[]
}

export type TagConfig = {
  bgClass: string
  icon: string
  description: string
}

export type TagTypeMapType = {
  [key in ChangeType]: TagConfig
}

// 更新日志数据
export const changelog = [
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
      { type: '优化', description: '改进了整体页面加载速度1' },
      { type: '新增', description: '添加了暗色模式切换动画1' },
      { type: '修复', description: '解决了移动端显示问题1' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0', 
    changes: [
      { type: '新增', description: '集成了评论功能1' },
      { type: '优化', description: '重新设计了文章卡片UI1' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [
      { type: '发布', description: '博客初始版本发布1' },
    ],
  },  {
    date: '2024-06-15',
    version: 'v1.2.0',
    changes: [
      { type: '优化', description: '改进了整体页面加载速度2' },
      { type: '新增', description: '添加了暗色模式切换动画2' },
      { type: '修复', description: '解决了移动端显示问题2' },
    ],
  },
  {
    date: '2024-05-28',
    version: 'v1.1.0', 
    changes: [
      { type: '新增', description: '集成了评论功能2' },
      { type: '优化', description: '重新设计了文章卡片UI2' },
    ],
  },
  {
    date: '2024-04-10',
    version: 'v1.0.0',
    changes: [
      { type: '发布', description: '博客初始版本发布2' },
    ],
  },
];

// 标签类型映射
export const tagTypeMap = {
  '新增': {
    bgClass: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
    icon: '✦',
    description: '新功能或新内容'
  },
  '优化': {
    bgClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    icon: '↻',
    description: '性能或用户体验改进'
  },
  '修复': {
    bgClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
    icon: '✓',
    description: '问题或错误修复'
  },
  '发布': {
    bgClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
    icon: '★',
    description: '主要版本发布'
  }
};

// 导出类型定义
export type ChangeType = '新增' | '优化' | '修复' | '发布';

export type ChangeItem = {
  type: ChangeType;
  description: string;
};

export type ChangelogItem = {
  date: string;
  version: string;
  changes: ChangeItem[];
};

export type TagConfig = {
  bgClass: string;
  icon: string;
  description: string;
};

export type TagTypeMapType = {
  [key in ChangeType]: TagConfig;
}; 
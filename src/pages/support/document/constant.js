import { getManualByProducts, getDemoList, getArticleList } from '@/services/api';

export const DocumentBlockList = [
  {
    key: 'manuals',
    api: getManualByProducts,
    columns: ['title', 'suffix', 'documentSize', 'download'],
    showPagination: false,
  },
  {
    key: 'demo',
    api: getDemoList,
    columns: ['title', 'suffix', 'documentSize', 'download'],
    showPagination: false,
  },
  {
    key: 'article',
    api: getArticleList,
    columns: ['title', 'publishTime', 'url'],
    showPagination: true,
  },
];

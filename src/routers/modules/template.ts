import type { RouteRecordRaw } from 'vue-router'

export const templateRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'templates',
    component: () => import('@/pages/template/index.vue'),
  },
  {
    path: 'create',
    name: 'templates-create',
    component: () => import('@/pages/template/templateCreate.vue'),
  },
]

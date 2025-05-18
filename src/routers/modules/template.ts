import type { RouteRecordRaw } from 'vue-router'

export const templateRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'templates',
    component: () => import('@/pages/template/index.vue'),
  },
]

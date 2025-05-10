import type { RouteRecordRaw } from 'vue-router'

export const evaluateRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'evaluate',
    component: () => import('@/pages/evaluate/index.vue'),
  },
]

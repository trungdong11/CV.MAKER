import type { RouteRecordRaw } from 'vue-router'

export const resumeRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'resumes',
    component: () => import('@/pages/resumes/index.vue'),
  },
]

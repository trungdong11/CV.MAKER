import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/main.css'
import './assets/css/tailwind.css'
import router from './routers/router'
import { Icon } from '@iconify/vue'
import 'driver.js/dist/driver.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import veProgress from 'vue-ellipse-progress'

/* layouts */
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import NoSideBarLayout from '@/layouts/NoSideBarLayout.vue'
import { initAuthStore } from './stores'

/* plugins */
import { plugin as VueTippy } from 'vue-tippy'
import { MotionPlugin } from '@vueuse/motion'
import VImage from '@/plugins/directives/image'
import Viewer from '@/plugins/directives/viewer'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'vue-awesome-paginate/dist/style.css'
import { setupI18n } from './plugins/i18n'
import Vue3Toastify from './plugins/toast'
import vue3GoogleLogin from 'vue3-google-login'
import sanitizeHTML from 'sanitize-html'

const app = createApp(App)

const initApp = async () => {
  await setupI18n(app)
  app.component('Icon', Icon)
  app.use(Vue3Toastify.Vue3Toastify, Vue3Toastify.options)
  app.use(MotionPlugin)
  app.use(VImage)
  app.use(Viewer)
  app.use(Antd)
  app.use(veProgress)
  app.use(VueTippy, {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, // => Global default options * see all props
  })
  app.component('DefaultLayout', DefaultLayout)
  app.component('GuestLayout', GuestLayout)
  app.component('NoSideBarLayout', NoSideBarLayout)
  app.use(createPinia())
  app.use(vue3GoogleLogin, {
    clientId:
      import.meta.env.VITE_GOOGLE_CLIENTID ||
      '312492351105-gp49uf5d4grsffm60jmaltbg6iii67d4.apps.googleusercontent.com',
  })
  app.config.globalProperties.$sanitize = sanitizeHTML

  await initAuthStore()
  // if (useAuthStore().getUser?.id) {
  //   await useGroupSocketStore().setupGroupSocketStore()
  // }
  // await initWebSocketStore()
  // await initMasterStore();
  app.use(router)
  router.isReady().then(() => {
    app.mount('#app')
  })
}

initApp()

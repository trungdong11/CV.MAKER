<script setup lang="ts">
import { Button } from '@/components/ui/button'
import InputValidation from '@/components/base/InputValidation.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { googleTokenLogin } from 'vue3-google-login'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain uppercase letter'),
  }),
})

const authStore = useAuthStore()
const isLoading = ref(false)
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  await authStore.login(values.email, values.password)
  isLoading.value = false
})

const loginGoogle = () => {
  googleTokenLogin().then((response) => {
    authStore.loginGG(response.access_token)
  })
}
</script>
<template>
  <div class="bg-white rounded-xl p-5 flex h-full">
    <div class="flex-1 flex justify-center items-center">
      <div class="max-md:w-full max-sm:p-0 max-w-full p-5 rounded-xl shadow-lg">
        <form
          class="rounded-xl max-md:w-full max-sm:p-0 w-96 mb-4"
          @submit="onSubmit"
        >
          <div class="flex items-center gap-0.5 mb-4">
            <h1 class="text-[344054] text-lg font-semibold mt-3">Welcome to CV.Maker</h1>
          </div>
          <div>
            <h2 class="mt-1 text-[#667085]">Today is a new day. It's your day. You shape it.</h2>
            <h2 class="mt-1 text-[#667085]">Sign in to start managing your projects</h2>
          </div>
          <div class="mt-6">
            <div class="form-data flex flex-col gap-2">
              <label for="email">Email</label>
              <div class="">
                <InputValidation
                  id="email"
                  placeholder="Enter email..."
                  type="email"
                  name="email"
                  class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="form-data mt-3 flex flex-col gap-2">
              <label for="password">Password</label>
              <div class="">
                <InputValidation
                  id="password"
                  placeholder="Enter password..."
                  type="password"
                  name="password"
                  class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
          </div>
          <div class="text-end mb-2">
            <RouterLink
              class="text-[#0921D9] text-xs font-normal"
              to="/password/forgot"
            >
              Forgot Password?
            </RouterLink>
          </div>
          <Button
            :disabled="isLoading"
            class="mt-6 w-full h-10 bg-primary flex gap-2 items-center text-white"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize text-white"
            ></span>
            <span class="text-white">Sign in</span>
          </Button>
          <div class="flex items-center gap-2 w-full mt-8">
            <span class="h-px bg-slate-200 w-full"></span>
            <p class="text-base">Or</p>
            <span class="h-px bg-slate-200 w-full"></span>
          </div>
        </form>
        <Button
          class="h-10 mt-8 w-full flex items-center gap-4 bg-slate-100"
          variant="secondary"
          @click="loginGoogle()"
        >
          <img
            class="w-5"
            src="@/assets/img/google-logo.png"
            alt=""
          />
          Sign in with Google
        </Button>

        <div class="flex justify-center mt-6">
          <p>Don't you have an account?</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-normal"
            to="/register"
          >
            Sign up
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="flex-1 max-md:hidden">
      <img
        class="top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/bg-image-1.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped>
.btn-gg {
  &:deep() {
    .nsm7Bb-HzV7m-LgbsSe {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 60px;
      margin-top: 32px;
    }
  }
}
</style>

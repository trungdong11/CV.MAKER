<script setup lang="ts">
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'

import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { registerApi } from '@/services/auth'
import { apiError } from '@/utils/exceptionHandler'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { showToast } from '@/utils/toast'
import { useConfirmDialog } from '@/stores/modal'
import { useAuthStore } from '@/stores/auth'
import { googleTokenLogin } from 'vue3-google-login'

const confirmDialog = useConfirmDialog()

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().required('Name is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain uppercase letter'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  }),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [name, nameAttrs] = defineField('name')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')
const isLoading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const loginGoogle = () => {
  googleTokenLogin().then((response) => {
    authStore.loginGG(response.access_token)
  })
}

const openConfirm = async () => {
  const result = await confirmDialog.open({
    title: 'Success',
    question: 'Registration successful check email to confirm account',
    onlyConfirm: true,
    success: true,
  })

  if (result.isConfirmed) {
    router.push('/login')
  }
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    await registerApi({
      email: values.email,
      name: values.name,
      password: values.password,
      confirm_password: values.confirmPassword,
    })
    openConfirm()
  } catch (error) {
    showToast({
      title: 'Register failed',
      description: apiError(error).message,
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <Toaster />
  <div class="bg-white rounded-xl p-5 flex h-full">
    <div class="flex-1 flex justify-center items-center">
      <div
        class="max-md:w-full max-sm:p-0 max-w-full p-5 rounded-xl shadow-lg"
        @submit.prevent="onSubmit"
      >
        <form
          class="rounded-xl max-md:w-full max-sm:p-0 w-96 mb-4"
          @submit.prevent="onSubmit"
        >
          <div class="flex items-center gap-0.5 mb-4">
            <h1 class="text-[344054] text-lg font-semibold">Register account</h1>
          </div>
          <div class="my-6 flex flex-col gap-2">
            <div class="form-data flex flex-col gap-2">
              <label for="name">Name</label>
              <div>
                <Input
                  v-model="name"
                  placeholder="Enter name..."
                  v-bind="nameAttrs"
                  :invalid="errors.name"
                  type="text"
                  class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
                <ErrorMessage :error="errors.name" />
              </div>
            </div>
            <div class="form-data flex flex-col gap-2">
              <label for="email">Email</label>
              <div>
                <Input
                  v-model="email"
                  placeholder="Enter email..."
                  v-bind="emailAttrs"
                  :invalid="errors.email"
                  type="email"
                  class="h-10 bg-slate-50 border-slate-200 outline-none"
                />
                <ErrorMessage :error="errors.email" />
              </div>
            </div>
            <div class="form-data flex flex-col gap-2">
              <label for="password">Password</label>
              <div>
                <Input
                  v-model="password"
                  placeholder="Enter password..."
                  v-bind="passwordAttrs"
                  :invalid="errors.password"
                  type="password"
                  class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
                <ErrorMessage :error="errors.password" />
              </div>
            </div>
            <div class="form-data flex flex-col gap-2">
              <label for="confirm-password">Confirm password</label>
              <div>
                <Input
                  v-model="confirmPassword"
                  placeholder="Enter confirm password..."
                  v-bind="confirmPasswordAttrs"
                  :invalid="errors.confirmPassword"
                  type="password"
                  class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
                <ErrorMessage :error="errors.confirmPassword" />
              </div>
            </div>
          </div>

          <Button
            :disabled="isLoading"
            class="w-full h-10 flex gap-2"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Sign Up
          </Button>
          <div class="flex items-center gap-2 w-full mt-8">
            <span class="h-px bg-slate-200 w-full"></span>
            <p class="text-base">Or</p>
            <span class="h-px bg-slate-200 w-full"></span>
          </div>
        </form>

        <Button
          class="h-10 w-full flex items-center gap-4 bg-slate-100"
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
          <p>If you have an account?</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-normal"
            to="/login"
          >
            Sign in
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="flex-1 relative">
      <img
        class="top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/bg-image-1.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped></style>

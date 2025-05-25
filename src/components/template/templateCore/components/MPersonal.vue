<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'

const resumeStore = useResumeStore()
const localData = ref(cloneDeep(resumeStore.dataResume?.personal_details))
const localSocialData = ref(cloneDeep(resumeStore.dataResume?.socials))
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditPersonal = computed(() => resumeStore.isEditPersonal)

const isLoading = ref(false)

const displayItems = computed(() => {
  const items: string[] = []

  if (localData.value?.address) {
    items.push(localData.value.address)
  }

  if (localData.value?.email) {
    items.push(localData.value.email)
  }

  if (localData.value?.phone_number) {
    items.push(localData.value.phone_number)
  }

  localSocialData.value?.forEach((social) => {
    if (social?.link) {
      items.push(social.link)
    }
  })

  return items
})

const cancelEdit = () => {
  resumeStore.cancelEditPersonal()
  localData.value = resumeStore.dataResume?.personal_details
  localSocialData.value = resumeStore.dataResume?.socials
}

const schemaShape: Record<string, yup.AnySchema> = {
  full_name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone_number: yup.string().required('Phone number is required'),
  address: yup.string().nullable().notRequired(),
}

for (const social of localSocialData.value) {
  schemaShape[social.icon] = yup
    .string()
    .trim()
    .url(`${social.icon} must be a valid URL`)
    .nullable()
    .notRequired()
}

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaShape),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    const socialLinksUpdated = localSocialData.value.map((item) => {
      const link = values[item.icon]
      return {
        ...item,
        link,
      }
    })
    resumeStore.updatePersonalDetails(
      {
        ...resumeStore.dataResume?.personal_details,
        ...values,
      },
      socialLinksUpdated,
    )
    resumeStore.cancelEditPersonal()
    showToast({
      description: 'Update personal detail success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update personal detail failed',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.personal_details)
      localSocialData.value = cloneDeep(newVal.socials)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    :class="isEditPersonal || !isPreview ? 'bg-gray-50' : 'bg-white'"
    class="items-center group flex flex-col justify-center gap-3 w-full hover:bg-gray-50 rounded-lg p-5 py-2"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditPersonal && !isPreview"
      class="absolute hidden group-hover:flex top-2 right-10 cursor-pointer border size-8 rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
      @click="resumeStore.editPersonal"
    >
      <span class="i-solar-pen-bold text-primary"></span>
    </div>
    <!-- End edit button -->

    <h2 class="font-semibold text-3xl">{{ localData?.full_name }}</h2>
    <div
      class="flex items-center gap-1 justify-center font-normal text-slate-600 text-sm flex-wrap"
    >
      <template
        v-for="(item, index) in displayItems"
        :key="`item-${index}`"
      >
        <p class="break-all">
          {{ item }}
        </p>
        <div
          v-if="index + 1 < displayItems.length"
          :key="`dot-${index}`"
          class="font-semibold text-base -mt-2 flex justify-center items-center"
        >
          .
        </div>
      </template>
    </div>

    <!-- Edit area -->
    <div
      v-if="isEditPersonal"
      class="w-full rounded-lg p-5 mt-5"
    >
      <form
        class="flex flex-col gap-2 w-full"
        @submit.prevent
      >
        <div class="grid grid-cols-3 items-center gap-x-4 w-full flex-wrap justify-center">
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Full Name <span class="text-red-600 text-e">*</span></label>
            <InputValidation
              id="name"
              placeholder="Enter your name..."
              type="text"
              name="full_name"
              :initial-value="localData?.full_name"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-localData flex flex-col gap-1 w-full">
            <label for="name">Location</label>
            <InputValidation
              id="name"
              placeholder="Enter your location..."
              type="text"
              name="address"
              :initial-value="localData?.address"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Email <span class="text-red-600 text-e">*</span></label>
            <InputValidation
              id="name"
              placeholder="Enter your email..."
              type="text"
              name="email"
              :initial-value="localData?.email"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Phone Number <span class="text-red-600 text-e">*</span></label>
            <InputValidation
              id="name"
              placeholder="Enter your phone number..."
              type="text"
              name="phone_number"
              :initial-value="localData?.phone_number"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>

          <div
            v-for="link in localSocialData"
            :key="link.icon"
            class="form-data flex flex-col gap-1 w-full"
          >
            <label for="name">
              {{ link.icon.charAt(0).toUpperCase() + link.icon.slice(1) }}
            </label>
            <InputValidation
              :id="link.icon"
              :placeholder="`Enter your ${link.icon}...`"
              type="text"
              :name="link.icon"
              :initial-value="link.link"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>

          <!-- <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Other link</label>
            <InputValidation
              id="name"
              placeholder="Enter your other link..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div> -->
        </div>
        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-28 h-10 flex gap-2 items-center text-primary"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-28 h-10 text-white bg-primary flex gap-2 items-center"
            @click="onSubmit"
          >
            <p class="text-white">Save</p>
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize text-white"
            ></span>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

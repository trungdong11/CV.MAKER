<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'

const resumeStore = useResumeStore()
const localData = ref(resumeStore.data.personalDetails)
const localSocialData = ref(resumeStore.data.socials)

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

defineExpose({
  openEdit,
})

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.data.personalDetails
  localSocialData.value = resumeStore.data.socials
}

const { handleSubmit } = useForm()
const onSubmit = handleSubmit(async (values) => {
  resumeStore.updatePersonalDetails({
    ...resumeStore.data.personalDetails,
    ...values,
  })

  const socialLinksUpdated = localSocialData.value.map((item) => {
    const link = values[item.icon]
    return {
      ...item,
      link,
    }
  })
  resumeStore.updateSocials(socialLinksUpdated)
  isEdit.value = false
})

const data = computed(() => {
  if (isEdit.value) {
    return localData.value
  }
  return resumeStore.data.personalDetails
})

const socialData = computed(() => {
  if (isEdit.value) {
    return localSocialData.value
  }
  return resumeStore.data.socials
})

const isLoading = ref(false)
</script>

<template>
  <div
    :class="isEdit ? 'bg-gray-100' : 'bg-white'"
    class="items-center group flex flex-col justify-center gap-3 w-full hover:bg-gray-100 rounded-lg p-5 py-2"
  >
    <!-- Edit button -->
    <div
      v-if="!isEdit"
      class="absolute hidden group-hover:flex top-2 right-10 cursor-pointer border size-8 rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
      @click="openEdit"
    >
      <span class="i-solar-pen-bold text-primary"></span>
    </div>
    <!-- End edit button -->

    <h2 class="font-semibold text-3xl">{{ data.fullname }}</h2>
    <div
      class="flex items-center gap-1 justify-center font-normal text-slate-600 text-sm flex-wrap"
    >
      <p>{{ data.address }}</p>
      <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
      <p>{{ data.email }}</p>
      <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
      <p>{{ data.phoneNumber }}</p>
      <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
      <div
        v-for="(item, index) in socialData"
        :key="index"
        class="flex items-center justify-center gap-2"
      >
        <p class="underline">{{ item?.link }}</p>
        <div
          v-if="index + 1 < socialData.length"
          class="font-semibold text-base -mt-2 flex justify-center items-center"
        >
          .
        </div>
      </div>
    </div>
    <!-- Edit area -->
    <div
      v-if="isEdit"
      class="w-full rounded-lg p-5 mt-5"
    >
      <form
        class="flex flex-col gap-2 w-full"
        @submit.prevent
      >
        <div class="grid grid-cols-3 items-center gap-x-4 w-full flex-wrap justify-center">
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Name</label>
            <InputValidation
              id="name"
              placeholder="Enter your name..."
              type="text"
              name="fullname"
              :initial-value="data.fullname"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Location</label>
            <InputValidation
              id="name"
              placeholder="Enter your location..."
              type="text"
              name="address"
              :initial-value="data.address"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Email</label>
            <InputValidation
              id="name"
              placeholder="Enter your email..."
              type="text"
              name="email"
              :initial-value="data.email"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Phone Number</label>
            <InputValidation
              id="name"
              placeholder="Enter your phone number..."
              type="text"
              name="phoneNumber"
              :initial-value="data.phoneNumber"
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

          <div class="form-data flex flex-col gap-1 w-full">
            <label for="name">Other link</label>
            <InputValidation
              id="name"
              placeholder="Enter your other link..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
        </div>
        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-32 h-11 flex gap-2 items-center text-primary"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 text-white bg-primary flex gap-2 items-center"
            @click="onSubmit"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            <p class="text-white">Save</p>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'

interface Props {
  data: Record<string, any>
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => reactive({}),
  isLoading: false,
})

const onSubmit = () => {}
</script>

<template>
  <BaseItemTemplate>
    <div class="items-center flex flex-col justify-center gap-3 w-full">
      <h2 class="font-bold text-3xl">{{ prop.data.fullname }}</h2>
      <div
        class="flex items-center gap-1 justify-center font-normal text-slate-600 text-sm flex-wrap"
      >
        <p>{{ prop.data.address }}</p>
        <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
        <p>{{ prop.data.email }}</p>
        <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
        <p>{{ prop.data.phoneNumber }}</p>
        <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
        <div
          v-for="(item, index) in prop.data.socials"
          :key="index"
          class="flex items-center justify-center gap-2"
        >
          <p>{{ item?.link }}</p>
          <div
            v-if="index + 1 < prop.data.socials.length"
            class="font-semibold text-base -mt-2 flex justify-center items-center"
          >
            .
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
      <form
        class="flex flex-col gap-2 w-full"
        @submit="onSubmit"
      >
        <div class="flex items-center gap-x-4 w-full flex-wrap justify-center">
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Name</label>
            <InputValidation
              id="name"
              placeholder="Enter your name..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Location</label>
            <InputValidation
              id="name"
              placeholder="Enter your location..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Email</label>
            <InputValidation
              id="name"
              placeholder="Enter your email..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Phone Number</label>
            <InputValidation
              id="name"
              placeholder="Enter your phone number..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">LinkedIn</label>
            <InputValidation
              id="name"
              placeholder="Enter your linkedIn..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Github</label>
            <InputValidation
              id="name"
              placeholder="Enter your github..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/4">
            <label for="name">Other Link</label>
            <InputValidation
              id="name"
              placeholder="Enter your other link..."
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
        </div>
        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-32 h-11 flex gap-2 items-center text-primary"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 bg-primary flex gap-2 items-center"
            @click="onSubmit"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            Save
          </Button>
        </div>
      </form>
    </div>
  </BaseItemTemplate>
</template>

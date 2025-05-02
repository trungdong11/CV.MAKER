<script lang="ts" setup>
import BaseSubItem from '@/components/base/BaseSubItem.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'
import Button from '@/components/ui/button/Button.vue'

const isLoading = ref<boolean>(false)
const description = ref()
const onSubmit = () => {}
</script>

<template>
  <BaseSubItem>
    <form
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <div class="flex items-center gap-2">
        <img
          src="@/assets/images/matching.png"
          alt=""
          class="w-5 h-5"
        />
        <p class="font-medium text-base">Match Resume with job Opening</p>
      </div>
      <p class="text-xs text-slate-500">
        Build your resume based on the job opening you want to apply.
        <span class="font-semibold">Copy and paste the job descriptions</span> of that job opening
        and get keyword suggestion to optimise your resume.
      </p>
      <div>
        <TextareaValidation
          id="description"
          v-model="description"
          type="text"
          name="description"
          placeholder="Enter the job description here"
          class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
        />
      </div>
      <Button
        :disabled="!description"
        class="w-full h-11 bg-primary flex gap-2 items-center"
        @click="onSubmit"
      >
        <span
          v-if="isLoading"
          class="i-svg-spinners-ring-resize"
        ></span>
        Match Resume
      </Button>
    </form>
  </BaseSubItem>
</template>

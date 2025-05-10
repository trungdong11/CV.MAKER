<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="-flex flex-col gap-4 justify-center items-center">
    <h1 class="text-2xl font-medium">Upload Existing Resume</h1>
    <div
      class="flex flex-col p-8 rounded-lg gap-5 text-center items-center justify-center bg-white border-2"
    >
      <img
        src="@/assets/svg/funnel-upload.svg"
        alt="resume upload"
        class="mx-auto"
      />
      <div class="flex flex-col gap-2 mx-auto mb-5">
        <h2 class="text-xl font-medium">Drag and drop your resume here</h2>
        <p>
          You can upload your resume in PDF, DOC, DOCX or
          <span class="text-primary text-[14px] font-medium cursor hover:underline"
            >choose your resume</span
          >
        </p>
      </div>
      <Button class="w-1/2 h-11">
        <span
          class="i-material-symbols-light-upload-rounded text-white text-[20px] font-semibold"
        ></span>
        <span class="text-white ml-2">Upload Resume</span>
      </Button>
    </div>
    <div class="mt-4">
      <p class="text-[14px]">
        Or you can always
        <span class="text-primary font-medium cursor-pointer hover:underline"
          >build a new resume</span
        >
        from scratch
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

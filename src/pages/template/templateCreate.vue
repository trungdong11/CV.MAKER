<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Button from '@/components/ui/button/Button.vue'
import TemplateCore from '@/components/template/templateCore/index.vue'
import Evaluation from '@/components/template/review/Evaluation.vue'
import MatchResume from '@/components/template/review/MatchResume.vue'

const isLoading = ref(false)
</script>

<template>
  <div class="p-8 px-0 flex flex-col gap-8 h-full overflow-y-hidden">
    <div class="px-8 flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <RouterLink
                class="text-primary"
                to="/templates"
                >Templates</RouterLink
              >
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-primary">Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div class="flex items-center gap-3">
        <div
          class="flex gap-1 items-center justify-center cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-200"
        >
          <span class="i-solar-code-circle-broken w-4 h-4 font-medium"></span>
          <p class="text-base font-medium">Tips & Tricks</p>
        </div>
        <Button
          :disabled="isLoading"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
        >
          <span class="i-solar-bolt-outline text-primary w-4 h-4"></span>
          <span class="text-primary">Import</span>
        </Button>
        <Button
          :disabled="isLoading"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
        >
          <span class="text-primary i-solar-eye-linear w-4 h-4"></span>
          <span class="text-primary">Preview</span>
        </Button>
        <Button
          :disabled="isLoading"
          variant="outline"
          class="w-32 h-11 text-primary border-primary flex gap-2 items-center"
        >
          <span class="text-primary i-solar-download-minimalistic-broken w-4 h-4"></span>
          <span class="text-primary">Download</span>
        </Button>
      </div>
    </div>

    <div class="px-8 flex gap-6 overflow-y-hidden p-1">
      <TemplateCore />
      <div class="flex flex-col gap-6 min-w-[300px]">
        <Evaluation />
        <MatchResume />
      </div>
    </div>
  </div>
</template>

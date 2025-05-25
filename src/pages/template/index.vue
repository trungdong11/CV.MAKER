<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Card } from '@/components/ui/card'
import { useResumeStore } from '@/stores/resume/resume'
import { dataCreate } from '@/utils/resume'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
const resumeStore = useResumeStore()
const { createResume } = resumeStore

const handleSubmitCreate = async () => {
  await createResume(dataCreate)
}
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6 overflow-hidden h-full">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <RouterLink
              class="text-primary"
              to="/templates"
              ><span class="text-base font-semibold">Templates</span></RouterLink
            >
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Card class="h-[350px] w-[300px] relative">
      <div class="rounded-lg">
        <img
          src="/src/assets/images/cv_template.png"
          alt=""
          class="w-full h-[350px] rounded-lg object-cotain"
        />
        <div class="absolute bottom-3 flex items-center justify-center w-full">
          <Button @click="handleSubmitCreate()"
            ><span class="text-white">Create resume</span></Button
          >
        </div>
      </div>
    </Card>
  </div>
</template>

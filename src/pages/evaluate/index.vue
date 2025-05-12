<script setup lang="ts">
import FormEvaluate from '@/components/evaluate/FormEvaluate.vue'
import DetailView from '@/components/evaluate/detail/detailView.vue'
import GeneralView from '@/components/evaluate/detail/generalView.vue'
import ModalLoading from '@/components/evaluate/detail/ModalLoading.vue'
import { useEvaluateStore } from '@/stores/evaluate'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const evaluateStore = useEvaluateStore()
const { resetIsCheckUpload } = evaluateStore
const { isCheckUpload, isLoading } = toRefs(evaluateStore)
</script>

<template>
  <div class="p-5 w-full h-full flex items-center justify-center">
    <FormEvaluate v-if="!isCheckUpload" />
    <ModalLoading v-if="isLoading" />

    <div
      v-if="isCheckUpload"
      class="flex h-full flex-col w-full"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <div
                class="text-primary cursor-pointer"
                @click="resetIsCheckUpload"
              >
                Evaluate
              </div>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="">Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div class="flex gap-8 items-start mt-4">
        <GeneralView />
        <DetailView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

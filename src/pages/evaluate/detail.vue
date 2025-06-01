<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import GeneralView from '@/components/evaluate/detail/GeneralView.vue'
import DetailView from '@/components/evaluate/detail/DetailView.vue'
import { useEvaluateStore } from '@/stores/evaluate'

const route = useRoute()
const evaluateId = computed(() => route.params.id as string)

const evaluateStore = useEvaluateStore()

onMounted(() => {
  evaluateStore.getDetailEvaluate(evaluateId.value)
})
</script>

<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="flex flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <RouterLink
                class="text-primary"
                to="/evaluate"
                >Evaluate</RouterLink
              >
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

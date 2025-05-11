<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import generalView from '@/components/evaluate/detail/generalView.vue'
import detailView from '@/components/evaluate/detail/detailView.vue'
</script>

<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="flex items-center justify-between">
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
      <generalView />
      <detailView />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useDebounceFn } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ResumeFilter from '@/components/resumes/ResumeFilter.vue'
import ResumeList from '@/components/resumes/ResumeList.vue'
import { useResumeManageStore } from '@/stores/resume/resumeManage'

const router = useRouter()

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
const resumeManageStore = useResumeManageStore()

const search = useRouteQuery('k', '')
const pageQuery = useRouteQuery<number>('page', 1)

const pageQueryComputed = computed({
  get: () => Number(pageQuery.value),
  set: (value) => {
    pageQuery.value = value
    fetchResumes()
  },
})

const fetchResumes = () => {
  resumeManageStore.fetchResumes({
    page: pageQueryComputed.value,
    keyword: search.value,
  })
}

onBeforeMount(() => {
  fetchResumes()
})

const handleClickCreateQuiz = async () => {
  // await resumeManageStore.initQuizzflyDraft()
}

const debouncedFn = useDebounceFn((value) => {
  search.value = value
}, 500)
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6 overflow-hidden h-full">
    <!-- header -->
    <div class="flex justify-between items-center">
      <!-- left -->
      <div class="flex items-center gap-10">
        <h2 class="text-2xl font-semibold whitespace-nowrap">Your resumes</h2>
        <div class="relative w-full max-w-sm items-center">
          <Input
            id="search"
            :model-value="search"
            type="text"
            placeholder="Search..."
            class="md:min-w-[300px] pl-10 bg-white"
            @update:model-value="debouncedFn"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <span class="i-material-symbols-light-search text-2xl"></span>
          </span>
        </div>
      </div>
      <!-- right -->
      <Button @click="router.push('/templates')">
        <span class="i-material-symbols-light-add text-2xl text-white font-bold"></span>
        <span class="text-white">Create resume</span>
      </Button>
    </div>

    <div class="flex justify-between">
      <!-- result -->
      <div class="flex gap-2">
        <span
          v-if="search"
          class="text-sm text-gray-500"
          >Result for:</span
        >
        <span class="text-sm font-semibold">{{ search }}</span>
      </div>
      <!-- filter -->
      <ResumeFilter />
    </div>
    <div class="flex-auto overflow-y-auto">
      <div
        v-if="!resumeManageStore.getIsFetching && resumeManageStore.getResumes.length === 0"
        class="h-full w-full flex flex-col justify-center items-center"
      >
        <img
          class="w-[200px]"
          src="@/assets/icons/empty.png"
          alt=""
        />
        <p>No resume found. Create one now!</p>
      </div>
      <ResumeList v-else />
    </div>
    <div
      v-if="resumeManageStore.getResumeMeta"
      class="flex justify-center"
    >
      <Pagination
        v-slot="{ page }"
        v-model:page="pageQueryComputed"
        :total="resumeManageStore.getResumeMeta.total_records"
        :items-per-page="resumeManageStore.getResumeMeta.limit"
        :sibling-count="1"
        show-edges
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center gap-1"
        >
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-9 h-9 p-0 rounded-md"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="pageQuery = Number(item.value)"
              >
                <p class="text-white">{{ item.value }}</p>
              </Button>
            </PaginationListItem>
            <PaginationEllipsis
              v-else
              :key="item.type"
              :index="index"
            />
          </template>

          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

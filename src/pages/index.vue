<script setup lang="ts">
// import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import ResumeList from '@/components/resumes/ResumeList.vue'
import { useConfirmDialog } from '@/stores/modal'
// import { showToast } from '@/utils/toast'
import { useRouter } from 'vue-router'
import { useResumeManageStore } from '@/stores/resume/resumeManage'

const router = useRouter()
const authStore = useAuthStore()
const confirmDialog = useConfirmDialog()
const resumeManageStore = useResumeManageStore()

onBeforeMount(() => {
  // quizzflyStore.fetchQuizzflys()
  // getCountUnreadNotification()
  // groupStore.fetchGroups({ page: 1 })
})

onMounted(() => {
  resumeManageStore.fetchResumes({
    page: 1,
    keyword: '',
  })
})

const handleOpenCreateWithAI = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Create with AI✨',
    question: 'Are you sure you want to create with AI?',
  })

  if (isConfirmed) {
    // quizzflyStore.initQuizzflyDraft()
  }
}
</script>
<template>
  <div class="p-8">
    <!-- header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-medium text-black">
          Hello, <span class="text-black/90">{{ authStore.getUser?.name }} 👋</span>
        </h1>
        <p class="mt-2 text-base text-gradient">How were you today?</p>
      </div>
      <div class="flex items-center gap-5">
        <div
          class="max-md:hidden w-10 h-10 hover:bg-slate-200 flex justify-center items-center rounded-full cursor-pointer"
        >
          <span class="i-solar-magnifer-linear text-lg"></span>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-4 mt-4">
      <!-- Ask AI button with gradient border 
      <button
        class="px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
        @click="handleOpenCreateWithAI"
      >
        ✨ Create with AI
      </button>-->

      <!-- <RouterLink
        :to="{ name: 'templates', query: { create: 'true' } }"
        class="h-9 btn-gradient"
      >
        <div class="flex items-center h-full w-full bg-white text-black rounded-full px-3 py-[6px]">
          Create your group
        </div>
      </RouterLink> -->
    </div>
    <!-- body -->
    <div class="flex max-md:flex-col mt-10 gap-5">
      <div class="flex-[2] p-6 border bg-white rounded-xl shadow-sm">
        <p>Projects</p>

        <!-- grid 4 item -->
        <div class="grid grid-cols-2 gap-6 mt-5">
          <div
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
            @click="router.push('/templates')"
          >
            <div
              class="min-w-10 w-10 h-10 rounded-lg border-2 flex justify-center items-center border-dashed border-primary"
            >
              <span class="text-primary text-xl i-material-symbols-light-add-2-rounded"></span>
            </div>
            <p>Create new cv</p>
          </div>

          <RouterLink
            to="/resumes"
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#f7e4ff] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#9521c8] text-xl i-material-symbols-light-groups-2"></span>
            </div>
            <div>
              <p>Your CV</p>
              <p class="text-xs text-gray-500">Create a new cv</p>
            </div>
          </RouterLink>

          <!-- <RouterLink
            to="/"
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#ebe6fd] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#232ac9] text-xl i-material-symbols-light-payments-sharp"></span>
            </div>
            <div>
              <p>Upgrade plans</p>
              <p class="text-xs text-gray-500">Upgrade plan for more features</p>
            </div>
          </RouterLink> -->

          <!-- <RouterLink
            to="/"
            class="max-md:flex-col max-md:items-center hover:bg-slate-50 cursor-pointer p-3 rounded-2xl flex items-center gap-4"
          >
            <div
              class="bg-[#e5effb] min-w-10 w-10 h-10 rounded-lg flex justify-center items-center"
            >
              <span class="text-[#00b9c4] text-xl i-material-symbols-light-attach-money"> </span>
            </div>
            <div>
              <p>Payment history</p>
              <p class="text-xs text-gray-500">View your payment history</p>
            </div>
          </RouterLink> -->
        </div>
      </div>

      <!-- quizzfly -->
      <div class="flex-1 flex flex-col gap-3 p-6 border bg-white rounded-xl shadow-sm">
        <p>Quick access</p>
        <!-- <div
          v-for="group in groupStore.getGroups"
          :key="group.group.id"
          class="flex gap-3 border-b mb-2 pb-2 items-center"
        >
          <img
            v-image
            class="w-10 h-10 rounded-md object-cover"
            :src="group.group.background"
            alt=""
          />
          <div>
            <p class="truncate">
              {{ group.group.name }}
            </p>
            <p class="text-xs">
              {{ group.role }}
            </p>
          </div>
          <RouterLink
            :to="{ name: 'group-detail', params: { groupId: group.group.id } }"
            class="flex items-center hover:bg-gray-100 border ml-auto text-xs h-[30px] px-5 rounded-md"
            >Detail</RouterLink
          >
        </div> -->
      </div>
    </div>

    <!-- recent -->
    <div class="mt-10">
      <p class="text-lg font-medium pb-4">Recent activities</p>
      <!-- <div
        v-if="!quizzflyStore.getIsFetching && quizzflyStore.getQuizzflys.length === 0"
        class="h-full w-full flex flex-col justify-center items-center"
      >
        <img
          class="w-[200px]"
          src="@/assets/icons/empty.png"
          alt=""
        />
        <p>No quizzfly. Create one now!</p>

        <div class="flex items-center gap-3 mt-5">
          <Button
            class="text-xs w-full"
            @click="handleClickCreateQuiz"
          >
            Create new cv
          </Button>
        </div>
      </div> -->
      <!-- <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-5">
        <div
          v-for="quizzfly in quizzflys"
          :key="quizzfly.id"
          class="block"
        >
          <div
            class="border rounded-3xl overflow-hidden shadow-sm bg-white cursor-pointer hover:shadow-lg transition-all duration-500"
          >
            <img
              v-image
              class="w-full h-[100px] object-cover rounded-t-lg"
              :src="quizzfly.cover_image || ''"
              alt=""
            />
            <div class="p-5">
              <p class="font-medium">{{ quizzfly.title || 'Untitled' }}</p>
              <p class="text-xs mt-1 text-gray-600">
                {{ new Date(quizzfly.created_at).toLocaleString() }}
              </p>
              <div
                class="flex items-center mt-4 gap-3"
                @click.stop
              >
                <RouterLink
                  :to="{ name: 'quizzfly-create', params: { quizzflyId: quizzfly.id } }"
                  class="flex items-center gap-1 flex-1"
                >
                  <span class="i-material-symbols-light-edit"></span>
                  <p>Edit</p>
                </RouterLink>
                <div
                  class="flex items-center gap-1 flex-1"
                  @click="handleOpenHostLive(quizzfly.id)"
                >
                  <Button class="flex-1 text-xs bg-black">Start</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <ResumeList />
    </div>
  </div>
</template>
<style scoped lang="scss"></style>

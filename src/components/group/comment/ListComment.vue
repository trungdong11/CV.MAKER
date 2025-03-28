<script lang="ts" setup>
import { usePostStore } from '@/stores/group/post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { vIntersectionObserver } from '@vueuse/components'
import { formatCommentDateTime } from '@/utils/time'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import FormSend from '@/components/group/comment/FormSend.vue'
import ListReply from './ListReply.vue'
import { useConfirmDialog } from '@/stores/modal'
// import Textarea from '@/components/ui/textarea/Textarea.vue'
import type { IComment } from '@/types/group'

const confirmDialog = useConfirmDialog()
const postStore = usePostStore()
const route = useRoute()

const postId = route.params.postId as string

const props = defineProps<{
  idPost: string
}>()

const listComment = computed(() => {
  return postStore.getListComnentByPostId
})

const isLoading = ref(false)
const isFetched = ref(false)
const isFocus = ref(true)
// const content = ref('')
// const textAreaRef = ref()

// const handleEditComment = (comment: IComment) => {
//   listComment.value.forEach((c) => {
//     c.isShowEdit = c.id === comment.id ? true : false
//   })
//   content.value = comment.content
// }

const toggleReplyComment = (comment: IComment) => {
  listComment.value.forEach((c) => {
    if (c.id === comment.id) {
      c.isShowReply = !c.isShowReply
    } else {
      c.isShowReply = false
    }
  })
}

async function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  if (entry.isIntersecting) {
    if (isFetched.value) return
    isLoading.value = true
    await postStore.getCommentByPostId(props.idPost)
    isFetched.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const handleDeletePost = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you want to delete this comment?',
    question: 'All data in your comment will be lost',
    warning: true,
  })

  if (result.isConfirmed) {
    postStore.handleDeleteComment(id)
  }
}
</script>

<template>
  <div v-intersection-observer="onIntersectionObserver">
    <div
      v-if="isLoading"
      class="flex justify-center h-5"
    >
      <span class="i-svg-spinners-90-ring-with-bg text-2xl"></span>
    </div>

    <div class="flex items-center justify-between gap-12 w-full">
      <div class="flex flex-col gap-2 w-full">
        <div
          v-for="(item, index) in listComment"
          :key="index"
          class="w-full"
        >
          <div class="h-px w-full bg-slate-300"></div>
          <div class="p-6">
            <div class="flex items-start gap-1">
              <Avatar>
                <AvatarImage :src="item.member.avatar" />
                <AvatarFallback v-if="item.member.name">{{
                  item.member.name.charAt(0).toUpperCase()
                }}</AvatarFallback>
              </Avatar>
              <div class="flex flex-col w-full">
                <div class="flex flex-col py-2 px-5 rounded-2xl bg-slate-100 w-full">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center justify-center gap-2">
                      <p class="text-sm font-semibold">{{ item.member.name }}</p>
                      <p class="text-xs font-normal text-slate-500">
                        {{ formatCommentDateTime(item.created_at) }}
                      </p>
                    </div>
                    <div class="-mr-3">
                      <Popover>
                        <PopoverTrigger>
                          <span class="i-solar-menu-dots-bold rotate-90 w-3 h-3"></span>
                        </PopoverTrigger>
                        <PopoverContent class="p-0 w-full">
                          <div class="rounded-md cursor-pointer py-1 px-1.5 shadow-md bg-white">
                            <p class="py-1 px-3 text-xs hover:bg-slate-100 rounded-sm">
                              <!-- @click.prevent="handleEditComment(item)" -->
                              Edit
                            </p>
                            <p
                              class="py-1 px-3 text-xs text-red-500 hover:bg-slate-100 rounded-sm"
                              @click.prevent="handleDeletePost(item.id)"
                            >
                              Delete
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div class="">
                    <span
                      v-if="!item.isShowEdit"
                      class="text-sm font-normal"
                      >{{ item.content }}</span
                    >
                    <!-- <Textarea
                      v-else
                      ref="textAreaRef"
                      v-model="content"
                      class="border-none bg-white"
                    /> -->
                  </div>

                  <div class="flex items-center gap-2 -ml-2">
                    <div
                      class="hover:bg-gray-300 px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                      @click.stop="toggleReplyComment(item)"
                    >
                      <span class="i-solar-chat-round-line-duotone text-lg text-slate-500"></span>
                      <p class="text-slate-600">{{ item.count_replies }}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <ListReply
                    v-if="item.isShowReply"
                    :id-parent="item.id"
                  />
                </div>
                <FormSend
                  v-if="item.isShowReply"
                  v-motion
                  :focus-on-mount="isFocus"
                  :initial="{ opacity: 0, y: 100 }"
                  :enter="{ opacity: 1, y: 0, scale: 1 }"
                  :delay="300"
                  :member="item.member"
                  :post-id="postId"
                  :parent-id="item.id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

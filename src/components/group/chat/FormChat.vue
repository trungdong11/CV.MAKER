<script lang="ts" setup>
import Avatar from '@/components/ui/avatar/Avatar.vue'
import Input from '@/components/ui/input/Input.vue'
// import { usePostStore } from '@/stores/group/post'
// import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { uploadMultiFileApi } from '@/services/file'
import { showToast } from '@/utils/toast'
// import { type IComment } from '@/types/group'

// const postStore = usePostStore()

const isLoading = ref(false)
const content = ref('')
// const refImage = ref<HTMLInputElement | null>(null)
// const listImage = ref<string[]>([])
const ImageUpload = ref<File[]>([])
const parentCommentId = ref(null)

const resetData = () => {
  content.value = ''
  parentCommentId.value = null
}

const props = defineProps<{
  member: any
}>()

const onSubmit = async () => {
  isLoading.value = true
  const listImageUpload = [] as any

  if (ImageUpload.value.length > 0) {
    const formData = new FormData()

    for (let i = 0; i < ImageUpload.value.length; i++) {
      formData.append('files', ImageUpload.value[i])
    }

    try {
      await uploadMultiFileApi(formData).then((res) => {
        listImageUpload.push(...res.data)
      })
    } catch (error) {
      showToast({
        description: 'Upload files failed',
        variant: 'destructive',
      })
    }
  }

  //   const data: IComment = {
  //     parent_comment_id: parentCommentId.value,
  //     content: content.value,
  //     files: listImageUpload,
  //     member: {
  //       id: '',
  //       username: '',
  //       avatar: '',
  //       name: '',
  //     },
  //   }

  //   await postStore.createCommentPost(props.idPost, data)
  resetData()
  // postStore.fetchComments(props.idPost)
  isLoading.value = false
}
</script>
<template>
  <form
    class="flex items-center justify-between px-3 py-4 gap-4 w-full"
    @submit.prevent="onSubmit"
  >
    <div class="flex items-center gap-2 w-full">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="props.member.avatar" />
        <AvatarFallback v-if="props.member.name">{{
          props.member.name.charAt(0).toUpperCase()
        }}</AvatarFallback>
      </Avatar>
      <Input
        v-model="content"
        placeholder="Write your text..."
        class="outline-none items-center h-10 border rounded-full p-3 text-sm font-normal text-gray-600"
      />
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center justify-center rounded-full w-8 h-8 border cursor-pointer">
        <span class="i-material-symbols-light-attach-file w-5 h-5"></span>
      </div>
      <div
        class="flex items-center justify-center border-primary rounded-full w-8 h-8 border cursor-pointer"
      >
        <span class="i-material-symbols-light-send-rounded w-6 h-6 text-primary"></span>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/ui/button/Button.vue'

interface Props {
  data: any[]
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'update:data', value: any[]): void
  (e: 'add'): void
  (e: 'edit', index: number): void
  (e: 'delete', index: number): void
}>()

const localData = ref(props.data)

watch(
  () => props.data,
  (newData) => {
    localData.value = newData
  },
  { deep: true },
)

const isEdit = ref(false)
const editingIndex = ref(-1)

const openEdit = (index: number) => {
  editingIndex.value = index
  isEdit.value = true
}

const cancelEdit = () => {
  isEdit.value = false
  editingIndex.value = -1
  localData.value = props.data
}

const handleAdd = () => {
  emit('add')
}

const handleEdit = (index: number) => {
  emit('edit', index)
}

const handleDelete = (index: number) => {
  emit('delete', index)
}

const handleSubmit = () => {
  emit('update:data', localData.value)
  isEdit.value = false
  editingIndex.value = -1
}

defineExpose({
  openEdit,
  cancelEdit,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSubmit,
})
</script>

<template>
  <div class="w-full">
    <slot name="header"></slot>

    <!-- Display Mode -->
    <div
      v-if="!isEdit"
      class="flex flex-col gap-2"
    >
      <slot
        name="display"
        :data="localData"
      ></slot>
    </div>

    <!-- Edit Mode -->
    <div
      v-else
      class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
    >
      <form
        class="flex gap-2 w-full flex-col"
        @submit.prevent="handleSubmit"
      >
        <slot
          name="edit"
          :data="localData"
          :index="editingIndex"
        ></slot>

        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-32 h-11 flex gap-2 items-center"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 bg-primary flex gap-2 items-center"
            type="submit"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            <span class="text-white">Save</span>
          </Button>
        </div>
      </form>
    </div>

    <!-- Add More Button -->
    <Button
      v-if="!isEdit"
      variant="outline"
      class="w-32 h-11 flex gap-2 items-center border-primary text-primary mt-4"
      @click="handleAdd"
    >
      <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
      <span class="text-primary">Add more</span>
    </Button>
  </div>
</template>

<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'

interface Props {
  data: Record<string, any>
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => reactive({}),
  isLoading: false,
})

const localData = ref(prop.data)

watch(
  () => prop.data,
  (newData) => {
    localData.value = newData
  },
  { deep: true },
)

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

defineExpose({
  openEdit,
})

const cancelEdit = () => {
  isEdit.value = false
  localData.value = prop.data // Khôi phục dữ liệu gốc
}

const emit = defineEmits<{
  (e: 'update:data', value: Record<string, any>[]): void
}>()
const onSubmit = () => {
  emit('update:data', localData.value)
  isEdit.value = false
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">LANGUAGES</h2>
    <div class="px-3 flex gap-2 items-center mt-1">
      <div
        v-for="(item, index) in prop.data"
        :key="index"
        class="flex gap-1 items-center"
      >
        <span class="text-base font-semibold">{{ item?.language }}</span>
        ( <span class="font-normal text-sm">{{ item?.proficiency }}</span> )
        <div
          v-if="index + 1 < prop.data.length"
          class="font-semibold text-lg -mt-2 flex justify-center items-center text-slate-500"
        >
          .
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isEdit"
    class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
  >
    <form
      class="flex w-full flex-col"
      @submit="onSubmit"
    >
      <div
        v-for="(item, index) in prop.data"
        :key="index"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="form-data flex flex-col gap-1 w-1/2">
          <label for="language">Language</label>
          <InputValidation
            id="language"
            placeholder="e.g., English, Vietnamese etc."
            type="text"
            name="language"
            class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="form-data flex flex-col gap-1 w-full">
          <label for="Proficiency">Proficiency</label>
          <TextareaValidation
            id="Proficiency"
            v-model="item.Proficiency"
            type="text"
            name="Proficiency"
            placeholder="Fluent, basic communication, etc"
            class="h-18 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div
          v-if="index + 1 < prop.data.length"
          class="border-b border-slate-950 mb-5 w-full mt-5"
        ></div>
        <div
          class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
        >
          <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
        </div>
      </div>
      <Button
        variant="outline"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
      >
        <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
        <span class="text-primary">Add more</span>
      </Button>
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
          @click="onSubmit"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          Save
        </Button>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.form-description {
  &:deep() {
    .ql-container.ql-snow {
      border: 1px solid #ff5c00;
      background-color: white;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    .ql-toolbar.ql-snow {
      border: 1px solid #ff5c00;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
}
</style>

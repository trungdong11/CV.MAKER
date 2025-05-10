<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import BaseCRUDComponent from '@/components/base/BaseCRUDComponent.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  data: Record<string, any>[]
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'update:data', value: Record<string, any>[]): void
}>()

const handleAdd = () => {
  const newItem = {
    name: '',
    position: '',
    address: '',
    startDate: '',
    endDate: '',
    description: '',
  }
  emit('update:data', [...props.data, newItem])
}

const handleDelete = (index: number) => {
  const newData = [...props.data]
  newData.splice(index, 1)
  emit('update:data', newData)
}
</script>

<template>
  <BaseCRUDComponent
    :data="data"
    :is-loading="isLoading"
    @update:data="(value) => emit('update:data', value)"
    @add="handleAdd"
    @delete="handleDelete"
  >
    <template #header>
      <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">
        ORGANIZATION & VOLUNTEERING EXPERIENCED
      </h2>
    </template>

    <template #display="{ data }">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex flex-col gap-0 items-start">
            <p class="font-semibold text-base">{{ item?.position }}</p>
            <p class="font-semibold text-base">{{ item?.name }}</p>
          </div>
          <div class="flex flex-col gap-0 items-end">
            <div class="flex items-center font-semibold text-base">
              <p class="font-semibold text-base">{{ item?.startDate }}</p>
              <span> - </span>
              <p class="font-semibold text-base">{{ item?.endDate }}</p>
            </div>
            <p class="font-semibold text-base">{{ item?.address }}</p>
          </div>
        </div>
        <p class="font-nomal text-sm">{{ item?.description }}</p>
      </div>
    </template>

    <template #edit="{ data }">
      <div
        v-for="(item, idx) in data"
        :key="idx"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="form-data flex flex-col gap-1 w-1/2">
          <label for="title">Company Name</label>
          <InputValidation
            id="title"
            v-model="item.name"
            placeholder="e.g., Meta, Shopee, etc."
            type="text"
            name="title"
            class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-center gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="position">Position</label>
            <InputValidation
              id="position"
              v-model="item.position"
              placeholder="e.g., Frontend, Backend, etc"
              type="text"
              name="position"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="city">City, Country</label>
            <InputValidation
              id="city"
              v-model="item.address"
              placeholder="VietNam, UK, etc"
              type="text"
              name="city"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="start">Start Date</label>
            <InputValidation
              id="start"
              v-model="item.startDate"
              placeholder="Start Date"
              type="text"
              name="start"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="end">End Date</label>
            <InputValidation
              id="end"
              v-model="item.endDate"
              placeholder="End Date"
              type="text"
              name="end"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1 w-full mb-12">
          <label for="description">Descriptions</label>
          <div class="form-description h-40 w-full bg-white rounded-lg">
            <QuillEditor
              v-model:content="item.description"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="e.g. Awarded for writing and presenting an outstading technical paper at a conference"
              content-type="html"
              theme="snow"
            />
          </div>
        </div>
        <div
          v-if="idx + 1 < data.length"
          class="border-b border-slate-950 mb-5 w-full mt-5"
        ></div>
        <div
          class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
          @click="handleDelete(idx)"
        >
          <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
        </div>
      </div>
    </template>
  </BaseCRUDComponent>
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

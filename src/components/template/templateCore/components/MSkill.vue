<script lang="ts" setup>
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
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

const onSubmit = () => {}
</script>

<template>
  <BaseItemTemplate class="items-start">
    <div class="items-start w-full">
      <h2 class="font-semibold text-base pb-2 border-b-2 border-slate-950 w-full mb-1">SKILLS</h2>
      <div
        v-for="(item, index) in prop.data"
        :key="index"
        class="flex items-center gap-2 px-3"
      >
        <p class="font-bold text-base">{{ item.skillCategory }}:</p>
        <p class="font-normal text-sm">{{ item.ListOfSkill }}</p>
      </div>
    </div>
    <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
      <form
        class="flex gap-2 w-full flex-col"
        @submit="onSubmit"
      >
        <div class="flex items-center w-full flex-col justify-center">
          <div
            v-for="(item, index) in prop.data"
            :key="index"
            class="w-full relative"
          >
            <div class="form-data flex flex-col gap-1 w-full">
              <label for="name">Skill Category</label>
              <InputValidation
                id="name"
                v-model="item.skillCategory"
                placeholder="Enter your skill..."
                type="text"
                name="name"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-full">
              <label for="name">List of skills</label>
              <TextareaValidation
                id="ListOfSkill"
                v-model="item.ListOfSkill"
                type="text"
                name="ListOfSkill"
                placeholder="Enter list of skill..."
                class="h-18 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div
              v-if="index + 1 < prop.data.length"
              class="border-b border-slate-950 mb-5"
            ></div>
            <div
              class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
            >
              <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
            </div>
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
            class="w-32 h-11 flex gap-2 items-center text-primary"
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
  </BaseItemTemplate>
</template>

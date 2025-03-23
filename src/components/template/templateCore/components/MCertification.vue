<script lang="ts" setup>
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'

interface Props {
  data: Record<string, any>
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => reactive({}),
  isLoading: false,
})

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

const onSubmit = () => {}
</script>

<template>
  <BaseItemTemplate
    :name="'certification'"
    class="items-start"
    @edit="openEdit"
  >
    <div class="w-full">
      <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">CERTIFICATION</h2>
      <div
        v-for="(item, index) in prop.data"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <a
            :href="item?.certificationLink"
            class="cursor-pointer"
          >
            <span class="font-semibold text-base">{{ item?.certificationName }}</span> by
            <span class="font-normal text-sm">{{ item?.issuingOrganization }}</span>
          </a>
          <p class="font-semibold text-base">{{ item?.issuedDate }}</p>
        </div>
        <div class="flex justify-between w-full items-center">
          <p class="font-semibold text-base underline cursor-pointer hover:text-primary">
            Credential Id:
            <span class="font-normal text-sm"> {{ item?.credentialId }}</span>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="isEdit"
      class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
    >
      <form
        class="flex gap-2 w-full flex-col"
        @submit="onSubmit"
      >
        <div
          v-for="(item, index) in prop.data"
          :key="index"
          class="flex items-start gap-x-4 w-full flex-col justify-center relative"
        >
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="name">Certification Name</label>
            <InputValidation
              id="name"
              placeholder="e.g. AWS Certified Cloud Practitioner"
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="flex items-center gap-x-3 flex-wrap">
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="position">Issuing Organization</label>
              <InputValidation
                id="position"
                placeholder="e.g., Frontend, Backend, etc"
                type="text"
                name="position"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="city">Issued Date</label>
              <InputValidation
                id="city"
                placeholder="issued day"
                type="text"
                name="city"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
          </div>
          <div class="flex items-center gap-x-3 flex-wrap">
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="city">Certification Link</label>
              <InputValidation
                id="city"
                placeholder="link-to-your-certification.com"
                type="text"
                name="city"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="end">Credential ID</label>
              <InputValidation
                id="end"
                placeholder="Credential ID"
                type="text"
                name="end"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
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
            @click="isEdit = false"
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

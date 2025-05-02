<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  name: string
}
const prop = withDefaults(defineProps<Props>(), {
  name: '',
})

defineEmits<{
  (e: 'edit', name: string): void
  (e: 'delete', name: string): void
  (e: 'move-up', name: string): void
  (e: 'move-down', name: string): void
}>()
</script>

<template>
  <div class="flex flex-col p-2 rounded-lg hover:bg-slate-100 w-full relative group">
    <slot />
    <div
      class="absolute opacity-0 scale-95 transition-all duration-300 hidden group-hover:flex group-hover:opacity-100 group-hover:scale-100 items-center justify-center -top-5 p-2 rounded-lg gap-2 right-5 border border-slate-300 bg-white"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              @click="$emit('edit', prop.name)"
            >
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-pen-new-square-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent class="h-7">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              @click="$emit('move-up', prop.name)"
            >
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-round-arrow-up-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent class="h-7">
            <p>Move up</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              @click="$emit('move-down', prop.name)"
            >
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-round-arrow-down-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent class="h-7">
            <p>Move Down</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              @click="$emit('delete', prop.name)"
            >
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent class="h-7">
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

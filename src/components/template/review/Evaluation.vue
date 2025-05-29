<script lang="ts" setup>
import BaseSubItem from '@/components/base/BaseSubItem.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Important from '@/components/template/review/suggest/Important.vue'
import Recommended from './suggest/Recommended.vue'
import NiceToHave from './suggest/NiceToHave.vue'
</script>

<template>
  <BaseSubItem class="flex flex-col gap-3 h-screen overflow-y-auto">
    <div class="flex items-center justify-between w-full">
      <p class="font-medium text-base">Resume Score</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div class="flex items-center gap-1 cursor-pointer">
              <span class="i-material-symbols-light-help-outline text-slate-400"></span>
              <p class="text-slate-400 text-xs">How it works?</p>
            </div>
          </TooltipTrigger>
          <TooltipContent> </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Important
      id="tour-item"
      data-tour="5"
    />
    <Recommended
      id="tour-item"
      data-tour="6"
    />
    <NiceToHave
      id="tour-item"
      data-tour="7"
    />
  </BaseSubItem>
</template>

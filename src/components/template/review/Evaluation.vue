<script lang="ts" setup>
import BaseSubItem from '@/components/base/BaseSubItem.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <BaseSubItem>
    <div class="flex items-center justify-between w-full">
      <p class="font-medium text-base">Resume Score</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            ><div class="flex items-center gap-1 cursor-pointer">
              <span class="i-material-symbols-light-help-outline text-slate-400"></span>
              <p class="text-slate-400 text-xs">How it works?</p>
            </div></TooltipTrigger
          >
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </BaseSubItem>
</template>

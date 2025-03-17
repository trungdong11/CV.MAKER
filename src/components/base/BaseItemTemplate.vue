<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <div class="flex flex-col p-5 rounded-lg hover:bg-slate-100 w-full relative group">
    <slot />
    <div
      class="absolute opacity-0 scale-95 transition-all duration-300 hidden group-hover:flex group-hover:opacity-100 group-hover:scale-100 items-center justify-center -top-5 p-2 rounded-lg gap-2 right-5 border border-slate-300 bg-white"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-pen-new-square-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-round-arrow-up-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Move up</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-round-arrow-down-broken w-4 h-4"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Move Down</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">
              <div
                class="flex justify-center items-center p-1 rounded-lg cursor-pointer hover:bg-slate-50"
              >
                <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

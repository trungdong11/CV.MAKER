<template>
  <div class="w-full h-[68px] flex items-center justify-between px-[80px]">
    <div class="flex items-center cursor-pointer">
      <img
        src=""
        alt=""
      />
      <h2 class="text-3xl font-semibold text-primary">CV.Maker</h2>
    </div>
    <div class="right flex items-center gap-8">
      <Button
        class="h-10 w-28 border-primary text-primary"
        variant="outline"
        @click.prevent.stop="
          router.push({
            name: 'register',
          })
        "
      >
        Sign up
      </Button>
      <Button
        class="h-10 w-28"
        @click.prevent.stop="
          router.push({
            name: 'login',
          })
        "
      >
        <span class="text-white font-medium">Sign in</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'

const router = useRouter()
</script>

<style lang="scs"></style>

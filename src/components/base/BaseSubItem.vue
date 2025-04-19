<script setup lang="ts"></script>

<template>
  <div class="flex rounded-xl p-3 shadow-common border-color w-full heigh-full">
    <slot />
  </div>
</template>
<style lang="scss">
.shadow-common {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>

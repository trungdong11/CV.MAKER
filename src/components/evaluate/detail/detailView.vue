<template>
  <div>
    {{ evaluateDetail }}
  </div>
</template>
<script setup lang="ts">
import { useEvaluateStore } from '@/stores/evaluate'

const useEvaluate = useEvaluateStore()

const { evaluateDetail } = useEvaluate
</script>
<style lang="scss" scoped></style>

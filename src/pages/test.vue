<script setup lang="ts">
// import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
// import confetti from 'canvas-confetti'
import Confetti from '@/components/base/Confetti.vue'

const isShowConfetti = ref(false)
const onExplore = () => {
  isShowConfetti.value = true
  // confetti({
  //   particleCount: 150,
  //   spread: 100,
  //   origin: { y: 0.6 },
  // })
}
// import { useConfirmDialog } from '@/stores/modal'
// import RankingFinal from '@/components/room/play/RankingFinal.vue';
const audioFiles = import.meta.glob('/assets/audio/*.mp3')

// const confirmDialog = useConfirmDialog()
// const openConfirm = async () => {
//   const result = await confirmDialog.open({
//     title: 'Are you sure?',
//     question: 'Do you really want to delete this item?',
//     onlyConfirm: true,
//     warning: true,
//   })
// }

const musicList = ref<{ value: string; label: string; src: string }[]>([])

for (const path in audioFiles) {
  const fileName = path.split('/').pop()?.replace('.mp3', '') || 'Unknown'
  musicList.value.push({
    value: fileName,
    label: fileName,
    src: path,
  })
}

const isChechSelected = ref('')
const audio = ref<HTMLAudioElement | null>(null)
const volume = ref([30])

const stopAudio = () => {
  if (audio.value) {
    audio.value.pause()
    audio.value.currentTime = 0
  }
}

const toggleAudio = (src: string) => {
  if (audio.value) {
    audio.value.src = src
    audio.value.volume = volume.value[0] / 100
    audio.value.play()
  }
}

watch(volume, (val) => {
  if (audio.value) {
    audio.value.volume = val[0] / 100
  }
})

watch(isChechSelected, (val) => {
  const selectedSong = musicList.value.find((item) => item.value === val)
  if (selectedSong) {
    stopAudio()
    toggleAudio(selectedSong.src)
  }
})
</script>

<template>
  <div class="flex items-center justify-center mt-80">
    <div class="flex flex-col items-center gap-4">
      <Button @click="onExplore">Explore</Button>
    </div>
    <Confetti
      v-if="isShowConfetti"
      class="fixed top-40 right-40 z-40"
    />
    <div>
      <Select v-model="isChechSelected">
        <SelectTrigger class="w-[200px] h-10">
          <SelectValue
            class="text-base"
            placeholder="Select a song"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Songs</SelectLabel>
            <SelectItem
              v-for="(song, index) in musicList"
              :key="index"
              :value="song.value"
            >
              {{ song.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div class="mt-4">
        <label class="block mb-2">Volume: {{ volume[0] }}%</label>
        <Slider
          v-model="volume"
          :max="100"
          :min="0"
          :step="2"
        />
      </div>

      <audio
        ref="audio"
        hidden
      />
    </div>

    <!-- open modal -->
    <!-- <Button @click="openConfirm">Open modal confirm</Button> -->
  </div>
  <!-- <Ranking /> -->
  <!-- <RankingFinal /> -->
</template>

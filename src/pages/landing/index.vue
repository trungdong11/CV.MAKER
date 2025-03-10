<template>
  <Navbar />
  <div class="flex flex-col mx-[80px]">
    <div class="flex items-center justify-around gap-6 my-20">
      <div class="flex flex-col relative gap-7 max-w-[500px]">
        <h2 class="font-bold text-4xl">
          Create a <span class="text-primary">resume</span> that secures your
          <span class="text-primary">dream job</span>
        </h2>
        <p class="text-base font-normal">
          Build a resume thats piques the interest of recruiters and get you hired. It's fast and
          easy to use
        </p>
        <Button
          class="h-10 w-40 text-white font-medium"
          @click.prevent.stop="
            router.push({
              name: 'login',
            })
          "
        >
          Try for free
        </Button>
      </div>
      <div class="relative">
        <img
          src="@/assets/images/try-free.png"
          alt=""
        />
      </div>
    </div>
    <div class="flex items-center flex-col justify-around gap-6 my-20">
      <h2 class="font-bold text-4xl mx-auto">
        Build your <span class="text-primary">resume</span> in 3 steps
      </h2>
      <div class="flex flex-col gap-6 w-full">
        <div class="flex items-center w-full">
          <div class="flex items-center gap-8 w-1/2">
            <img
              src="@/assets/images/step-1.png"
              alt=""
              class="w-[150px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-6xl text-primary">1.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Pick a Template</h2>
                <p class="font-normal text-sm text-primary">
                  Fill in the blank and see result in real-time
                </p>
              </div>
            </div>
          </div>
          <div class="flex w-1/2 items-end">
            <div class="flex w-full">
              <img
                src="@/assets/icons/svg/circle.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex items-center w-full">
          <div class="flex items-center gap-8 w-1/2">
            <img
              src="@/assets/images/step-1.png"
              alt=""
              class="w-[150px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-6xl text-primary">1.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Pick a Template</h2>
                <p class="font-normal text-sm text-primary">
                  Fill in the blank and see result in real-time
                </p>
              </div>
            </div>
          </div>
          <div class="flex w-1/2 items-end">
            <div class="flex w-full">
              <img
                src="@/assets/icons/svg/circle.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex items-center w-full">
          <div class="flex items-center gap-8 w-1/2">
            <img
              src="@/assets/images/step-1.png"
              alt=""
              class="w-[150px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-7xl text-primary">1.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Pick a Template</h2>
                <p class="font-normal text-sm text-primary">
                  Fill in the blank and see result in real-time
                </p>
              </div>
            </div>
          </div>
          <div class="flex w-1/2 items-end">
            <div class="flex w-full">
              <img
                src="@/assets/icons/svg/circle.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import Navbar from '@/components/layout/landing/Navbar.vue'
import Footer from '@/components/layout/landing/Footer.vue'
import Button from '@/components/ui/button/Button.vue'
const router = useRouter()
</script>

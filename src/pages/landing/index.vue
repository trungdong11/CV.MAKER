<template>
  <Navbar />
  <div class="flex flex-col">
    <div class="flex items-center justify-around gap-6 my-20 mx-[80px]">
      <div class="flex flex-col gap-7 max-w-[500px] relative">
        <h2 class="font-bold text-4xl">
          Create a <span class="text-primary">resume</span> that secures your
          <span class="text-primary">dream job</span>
        </h2>
        <p class="text-base font-normal">
          Build a resume thats piques the interest of recruiters and get you hired. It's fast and
          easy to use
        </p>
        <Button
          class="h-10 w-40 font-medium"
          @click.prevent.stop="
            router.push({
              name: 'login',
            })
          "
        >
          <span class="text-white">Try for free</span>
        </Button>

        <div class="absolute w-full -top-20 left-0 rectangular-animation">
          <img
            src="@/assets/icons/svg/rectangle.svg"
            alt=""
            class="w-14 h-14"
          />
        </div>
      </div>
      <div class="relative">
        <img
          src="@/assets/images/try-free.png"
          alt=""
        />
        <div class="absolute -top-4 -right-8 triangular-animation">
          <img
            src="@/assets/icons/svg/triangular.svg"
            alt=""
            class="w-14 h-14"
          />
        </div>
        <div class="absolute bottom-10 -left-44 circle-animation">
          <img
            src="@/assets/icons/svg/circle.svg"
            alt=""
            class="w-14 h-14"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center flex-col justify-around gap-20 mt-20 mx-[80px]">
      <h2 class="font-bold text-4xl mx-auto">
        Build your <span class="text-primary">resume</span> in 3 steps
      </h2>
      <div class="flex flex-col gap-12 w-full">
        <div class="flex items-center w-full justify-around">
          <div class="flex items-center gap-8 w-1/2 justify-center">
            <img
              src="@/assets/images/step-1.png"
              alt=""
              class="w-[160px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-5xl text-primary">1.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Pick a Template</h2>
                <p class="font-normal text-sm text-primary">
                  Fill in the blank and see result in real-time
                </p>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="w-full flex justify-center">
              <img
                src="@/assets/icons/svg/circle.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex items-center w-full">
          <div class="flex w-1/2">
            <div class="flex w-full justify-center">
              <img
                src="@/assets/icons/svg/rectangle.svg"
                alt=""
              />
            </div>
          </div>
          <div class="flex items-center gap-8 w-1/2 justify-center">
            <img
              src="@/assets/images/step-2.png"
              alt=""
              class="w-[160px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-5xl text-primary">2.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Customize Your Layout</h2>
                <p class="font-normal text-sm text-primary">
                  Give your document a professional and elegant look.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center w-full">
          <div class="flex items-center gap-8 w-1/2 justify-center">
            <img
              src="@/assets/images/step-3.png"
              alt=""
              class="w-[160px] object-cover"
            />
            <div class="flex items-center gap-3">
              <h1 class="font-extrabold text-5xl text-primary">3.</h1>
              <div class="flex flex-col">
                <h2 class="font-semibold text-primary text-lg">Hit 'Download!'</h2>
                <p class="font-normal text-sm text-primary">
                  Download your resume, apply, get more interview.
                </p>
              </div>
            </div>
          </div>
          <div class="flex w-1/2">
            <div class="flex w-full justify-center">
              <img
                src="@/assets/icons/svg/triangular.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="resume-create flex items-center justify-around gap-6 mb-20 p w-full pt-28">
      <div class="flex flex-col gap-4">
        <h2 class="font-medium text-xl">Snapshot of our simple-to-use editor</h2>
        <img
          src="@/assets/images/create-resume.png"
          alt=""
        />
      </div>
      <div class="flex flex-col relative gap-11 max-w-[500px]">
        <div class="flex flex-col gap-6">
          <p class="text-base font-normal">
            All the flexibility & intuition you need to build a resume that stands out
          </p>
          <ul class="flex flex-col gap-3 w-[400px]">
            <li class="text-lg text-primary font-semibold flex items-start gap-3">
              <img
                src="@/assets/images/Text.png"
                alt=""
                class="w-3 h-3 mt-2"
              />
              <p>Multi-theme & type face for personalization.</p>
            </li>
            <li class="text-lg text-primary font-semibold flex items-start gap-3">
              <img
                src="@/assets/images/Text.png"
                alt=""
                class="w-3 h-3 mt-2"
              />
              <p>Placeholder resume content to guide your filling.</p>
            </li>
            <li class="text-lg text-primary font-semibold flex items-start gap-3">
              <img
                src="@/assets/images/Text.png"
                alt=""
                class="w-3 h-3 mt-2"
              />
              <p>Multiple layouts & templates to choose from.</p>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-6">
          <Button
            class="h-10 w-40"
            @click.prevent.stop="
              router.push({
                name: 'login',
              })
            "
          >
            <span class="text-white">Create Resume</span>
          </Button>
          <div class="flex">
            <div class="flex flex-col">
              <h1 class="font-extrabold text-5xl">200+</h1>
              <p class="font-normal text-xs">users</p>
            </div>
            <div class="w-[1px] bg-slate-900 mx-6"></div>
            <div class="flex flex-col">
              <h1 class="font-extrabold text-5xl">3 mins</h1>
              <p class="font-normal text-xs">Average resume building time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center justify-around gap-20 my-20 mx-20 mx-[80px] p-5 py-16 rounded-md bg-slate-100"
    >
      <div class="flex flex-col gap-16 max-w-[500px]">
        <div class="">
          <h2 class="font-semibold text-4xl">You can always pick any template you like</h2>
          <p class="font-medium text-lg text-primary mt-4">Our Services</p>
        </div>
        <p class="font-normal text-sm">
          Choose from one of our expertly prepared resume types below, by using pre-established
          parts that have been endorsed by recruiters internationally, you can begin creating your
          resume in under 5 seconds, additionally, you can edit to fit your preferences and
          personality before clicking "Download". Even if you have never created a resume before, it
          is that SIMPLE to use!
        </p>
      </div>
      <div class="flex items-center gap-2">
        <img
          src="@/assets/images/cv-1.png"
          alt=""
        />
        <img
          src="@/assets/images/cv-3.png"
          alt=""
        />
        <img
          src="@/assets/images/cv-2.png"
          alt=""
        />
      </div>
    </div>

    <div class="flex items-center justify-center gap-20 my-20 mx-[80px]">
      <div class="flex flex-col gap-4">
        <img
          src="@/assets/images/feature.png"
          alt=""
        />
      </div>
      <div class="flex flex-col relative gap-11 max-w-[500px]">
        <p class="font-normal text-base">
          Future Resume is a product of FutureLabs — a global innovation & digital skill learning
          center. Future Resume was born of the need to create a new way for job-seekers to connect
          with recruiters. Hence, our best hands got to work with one thing in mind: to help you
          find a great job faster. We went even further to ensure that our Template designs meet
          Industry Standards and accepted by leading HR departments. With us, you can spin out an
          impressive resume that makes a memorable first impression!
        </p>
        <Button
          class="h-10 w-40"
          @click.prevent.stop="
            router.push({
              name: 'login',
            })
          "
        >
          <span class="text-white">Read More</span>
        </Button>
      </div>
    </div>

    <div class="flex items-center flex-col justify-around gap-20 my-20 mx-[80px]">
      <div class="text-center">
        <h2 class="font-bold text-4xl mx-auto">Benefits Of Using Our Product</h2>
        <p class="text-primary font-semibold text-lg mt-[18px]">Why Choose Us?</p>
      </div>
      <div class="flex flex-wrap gap-x-8 gap-y-16 w-full justify-center">
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-1.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">Easy to use</h2>
            <p class="font-normal max-w-[200px]">
              The process of writing a resume is substantially sped up and simplified by using our
              resume builder.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-2.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">Secure</h2>
            <p class="font-normal max-w-[200px]">
              We respect your privacy & give you control over your content and your data with us.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-3.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">Cool Templates</h2>
            <p class="font-normal max-w-[200px]">
              Our template designs help your resume standout in a pool of others.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-4.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">Intelligent Design</h2>
            <p class="font-normal max-w-[200px]">
              With us, you won't have to bother about the minute details of resume development, such
              as font choice, layout, etc.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-5.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">HR-Approved & ATS-Friendly</h2>
            <p class="font-normal max-w-[200px]">
              The core design of our resume templates are HR-Approved & accepted by leading
              organizations.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 w-[31%]">
          <img
            src="@/assets/images/benefit-6.png"
            alt=""
          />
          <div class="flex flex-col gap-3">
            <h2 class="font-semibold text-lg">No Hidden Charges</h2>
            <p class="font-normal max-w-[200px]">
              We’ve got a free version and our premium pricing is clear. We notify you about any new
              changes in good time.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative h-[900px] w-full">
      <img
        class="absolute w-full h-full"
        src="@/assets/images/previous-1.png"
        alt=""
      />
      <img
        class="absolute w-full h-full"
        src="@/assets/images/previous-2.png"
        alt=""
      />
      <img
        class="absolute w-full h-full"
        src="@/assets/images/previous-3.png"
        alt=""
      />
      <div class="absolute flex flex-col justify-center items-center w-full gap-24">
        <div class="flex items-center gap-6 w-full justify-center pt-36">
          <div class="flex w-[450px] flex-col">
            <h2 class="font-semibold text-4xl">Testimonials From Our Previous Users</h2>
            <p class="font-medium text-base text-primary">What People Say About Us</p>
          </div>
          <div class="flex flex-col bg-white rounded p-5 gap-2 shadow-lg w-[450px]">
            <div class="flex gap-2 items-center">
              <img
                src="@/assets/images/avatar-1.png"
                alt=""
                class="h[68px] w-[68px] object-cover"
              />
              <p class="font-semibold text-2xl">
                Peter Eva, <span class="font-medium text-base text-primary">Web Developer</span>
              </p>
            </div>
            <p class="font-normal text-base pb-4">
              <span class="font-bold text-3xl">"</span>We move with make a Creative Strategy for
              help your goal, we help to improve your income by a services,
              <span class="font-bold text-3xl">"</span>
            </p>
          </div>
        </div>
        <div class="flex items-start gap-6 w-full justify-around">
          <div class="flex flex-col bg-white rounded p-5 gap-2 shadow-lg w-[450px]">
            <div class="flex gap-2 items-center">
              <img
                src="@/assets/images/avatar-2.jpg"
                alt=""
                class="h-[68px] w-[68px] object-cover rounded-full"
              />
              <p class="font-semibold text-2xl">
                Dana Jayson,
                <span class="font-medium text-base text-primary">Mobile Developer</span>
              </p>
            </div>
            <p class="font-normal text-base pb-4">
              <span class="font-bold text-3xl">"</span>We move with make a Creative Strategy for
              help your goal, we help to improve your income by a services,
              <span class="font-bold text-3xl">"</span>
            </p>
          </div>
          <div class="flex flex-col bg-white rounded p-5 gap-2 shadow-lg w-[450px] mt-11">
            <div class="flex gap-2 items-center">
              <img
                src="@/assets/images/avatar-3.jpeg"
                alt=""
                class="h-[68px] w-[68px] object-cover rounded-full"
              />
              <p class="font-semibold text-2xl">
                Tony Nguyen, <span class="font-medium text-base text-primary">Quality Control</span>
              </p>
            </div>
            <p class="font-normal text-base pb-4">
              <span class="font-bold text-3xl">"</span>We move with make a Creative Strategy for
              help your goal, we help to improve your income by a services,
              <span class="font-bold text-3xl">"</span>
            </p>
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

<style>
.resume-create {
  background: url('@/assets/images/bg-resume.png') no-repeat center;
  background-size: cover;
  width: 100%;
}

.rectangular-animation {
  animation: wave-motion 20s cubic-bezier(0.42, 0, 0.58, 1) infinite alternate;
  border-radius: 50%;
}

.triangular-animation {
  animation: spin 3s linear infinite;
}

.circle-animation {
  position: relative;
  animation:
    move 3s ease-in-out infinite alternate,
    3s linear infinite;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes wave-motion {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  12.5% {
    transform: translateX(12.5%) translateY(350px) rotate(45deg);
  }
  25% {
    transform: translateX(25%) translateY(450px) rotate(90deg);
  }
  37.5% {
    transform: translateX(37.5%) translateY(350px) rotate(135deg);
  }
  50% {
    transform: translateX(50%) translateY(100px) rotate(180deg);
  }
  62.5% {
    transform: translateX(62.5%) translateY(-150px) rotate(225deg);
  }
  75% {
    transform: translateX(75%) translateY(-250px) rotate(270deg);
  }
  87.5% {
    transform: translateX(87.5%) translateY(-150px) rotate(315deg);
  }
  100% {
    transform: translateX(100%) translateY(100px) rotate(360deg);
  }
}
</style>

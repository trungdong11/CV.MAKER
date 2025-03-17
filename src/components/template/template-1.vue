<script setup lang="ts">
import BaseTemplate from '@/components/base/BaseTemplate.vue'
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
import { type ITemplate } from '@/types/template'
import InputValidation from '../base/InputValidation.vue'
import Button from '../ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'

const data: ITemplate = {
  id: '1',
  lngCode: 'en',
  isPremium: false,
  createdAt: '2024-01-01T12:00:00Z',
  updatedAt: '2024-03-10T15:30:00Z',
  status: 'active',
  summary:
    'Experienced software engineer with a strong background in web development and cloud computing.',
  personalDetails: {
    fullname: 'John Doe',
    phoneNumber: '123-456-7890',
    address: '123 Main Street, New York, USA',
    birthday: '1990-05-15',
    email: 'johndoe@example.com',
    avatar: 'https://example.com/avatar.jpg',
    jobTitle: 'Senior Software Engineer',
    socials: [
      {
        icon: 'linkedin',
        link: 'JohnDoeLinkedIn',
      },
      {
        icon: 'github',
        link: 'JohnDoeGitHub',
      },
    ],
  },
  content: {
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'MIT',
        startDate: '2008-09-01',
        endDate: '2012-06-01',
        schoolLink: 'https://mit.edu',
        city: 'Cambridge, MA',
        GPA: 3.9,
        description: 'Focused on software engineering and AI development.',
      },
    ],
    award: [
      {
        awardTitle: 'Best Developer Award',
        awardTitleLink: 'https://example.com/award',
        issuer: 'Tech Community',
        issuedDate: 'Jan 25',
      },
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'Fluent',
      },
      {
        language: 'Spanish',
        proficiency: 'Intermediate',
      },
    ],
    skills: [
      {
        skillCategory: 'Programming Languages',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
      {
        skillCategory: 'Framework',
        ListOfSkill: 'VueJs, NuxtJs',
      },
      {
        skillCategory: 'Others',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
      {
        skillCategory: 'Project Management Software and Methodologies',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
    ],
    Tools: [
      {
        ToolCategory: 'Frameworks',
        ListOfTool: 'React, Next.js, Node.js',
      },
    ],
    works: [
      {
        companyName: 'Tech Corp',
        iscurrentWorking: true,
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2018-07-01',
        endDate: '2018-07-01',
        description:
          'Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. ',
      },
      {
        companyName: 'Tech Corp',
        iscurrentWorking: true,
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2018-07-01',
        endDate: '2018-07-01',
        description:
          'Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. ',
      },
    ],
    projects: [
      {
        projectName: 'Open Source Contribution',
        projectLink: 'https://github.com/johndoe',
        startDate: '2020-01-01',
        endDate: 'Present',
        description:
          'Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development.',
      },
      {
        projectName: 'Open Source Contribution',
        projectLink: 'https://github.com/johndoe',
        startDate: '2020-01-01',
        endDate: 'Present',
        description:
          'Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development.',
      },
    ],
    certification: [
      {
        certificationName: 'AWS Certified Solutions Architect',
        issuingOrganization: 'Amazon Web Services',
        issuedDate: '2023-05-10',
        certificationLink: 'https://aws.amazon.com/certification/',
        credentialId: 'AWS-12345',
      },
    ],
  },
}

const onSubmit = () => {}
</script>

<template>
  <BaseTemplate>
    <div class="flex flex-col w-full">
      <BaseItemTemplate class="">
        <div class="items-center flex flex-col justify-center gap-3 w-full">
          <h2 class="font-bold text-3xl">{{ data.personalDetails?.fullname }}</h2>
          <div
            class="flex items-center gap-1 justify-center font-normal text-slate-600 text-sm flex-wrap"
          >
            <p>{{ data.personalDetails?.address }}</p>
            <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
            <p>{{ data.personalDetails?.email }}</p>
            <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
            <p>{{ data.personalDetails?.phoneNumber }}</p>
            <div class="font-semibold text-base -mt-2 flex justify-center items-center">.</div>
            <div
              v-for="(item, index) in data.personalDetails?.socials"
              :key="index"
              class="flex items-center justify-center gap-2"
            >
              <p>{{ item?.link }}</p>
              <div
                v-if="index + 1 < data.personalDetails?.socials.length"
                class="font-semibold text-base -mt-2 flex justify-center items-center"
              >
                .
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex flex-col gap-2 w-full"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-wrap justify-center">
              <div class="form-data w-1/4">
                <label for="name">Name</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your name..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">Location</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your location..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">Email</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your email..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">Phone Number</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your phone number..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">LinkedIn</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your linkedIn..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">Github</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your github..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-1/4">
                <label for="name">Other Link</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your other link..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center text-primary"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="items-start w-full">
          <h2 class="font-semibold text-base pb-2 border-b-2 border-slate-950 w-full mb-1">
            SKILLS
          </h2>
          <div
            v-for="(item, index) in data.content.skills"
            :key="index"
            class="flex items-center gap-2 px-3"
          >
            <p class="font-bold text-base">{{ item.skillCategory }}:</p>
            <p class="font-normal text-sm">{{ item.ListOfSkill }}</p>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center w-full flex-col justify-center">
              <div class="form-data w-full">
                <label for="name">Skill Category</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your skill..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-full">
                <label for="name">List of skills</label>
                <TextareaValidation
                  id="ListOfSkill"
                  type="text"
                  name="ListOfSkill"
                  placeholder="Enter list of skill..."
                  class="h-18 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center text-primary"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="w-full">
          <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">EDUCATION</h2>
          <div
            v-for="(item, index) in data.content.education"
            :key="index"
            class="flex flex-col gap-0 mt-1 w-full px-3"
          >
            <div class="flex justify-between w-full items-center">
              <p class="font-bold text-base">{{ item?.degree }}</p>
              <div class="flex items-center gap-3">
                <p class="font-semibold text-base">{{ item?.startDate }}</p>
                <p class="font-semibold text-base">{{ item?.endDate }}</p>
              </div>
            </div>
            <div class="">
              <div class="flex justify-between w-full items-center">
                <h4 class="text-base font-normal">{{ item?.school }}</h4>
                <p class="font-semibold text-base">GPA: {{ item?.GPA }}</p>
              </div>
              <p class="text-sm font-normal">{{ item?.description }}</p>
            </div>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-col justify-center">
              <div class="form-data w-[300px]">
                <label for="name">Educational Institution Name</label>
                <InputValidation
                  id="name"
                  placeholder="University of CVMaker"
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="flex items-center gap-x-3 flex-wrap">
                <div class="form-data w-[300px]">
                  <label for="name">Degree</label>
                  <InputValidation
                    id="name"
                    placeholder="Bachelor of IT ..."
                    type="text"
                    name="name"
                    class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                  />
                </div>
                <div class="form-data w-[150px]">
                  <label for="name">GPA</label>
                  <InputValidation
                    id="name"
                    placeholder="3.4 of 4.0"
                    type="text"
                    name="name"
                    class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                  />
                </div>
                <div class="form-data w-[200px]">
                  <label for="name">Start Date</label>
                  <InputValidation
                    id="name"
                    placeholder="Start Date"
                    type="text"
                    name="name"
                    class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                  />
                </div>
                <div class="form-data w-[200px]">
                  <label for="name">Graduation Date</label>
                  <InputValidation
                    id="name"
                    placeholder="Graduation Date"
                    type="text"
                    name="name"
                    class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="w-full">
          <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">
            WORK EXPERIENCED
          </h2>
          <div
            v-for="(item, index) in data.content.works"
            :key="index"
            class="flex flex-col gap-0 mt-1 w-full px-3"
          >
            <div class="flex justify-between w-full items-center">
              <p class="font-bold text-base">{{ item?.position }}</p>
              <div class="flex items-center gap-3">
                <p class="font-semibold text-base">{{ item?.startDate }}</p>
                <p class="font-semibold text-base">{{ item?.endDate }}</p>
              </div>
            </div>
            <div class="flex justify-between w-full items-center">
              <p class="font-bold text-base">{{ item?.companyName }}</p>
              <p class="font-semibold text-base">{{ item?.location }}</p>
            </div>
            <p class="text-sm font-normal mt-1">{{ item?.description }}</p>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-col justify-center">
              <div class="form-data w-full">
                <label for="name">Skill Category</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your skill..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-full">
                <label for="name">List of skills</label>
                <TextareaValidation
                  id="ListOfSkill"
                  type="text"
                  name="ListOfSkill"
                  placeholder="Enter ListOfSkill..."
                  class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="w-full">
          <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">PROJECTS</h2>
          <div
            v-for="(item, index) in data.content.projects"
            :key="index"
            class="flex flex-col gap-0 mt-1 w-full px-3"
          >
            <div class="flex justify-between w-full items-center">
              <a
                :href="item?.projectLink"
                class="font-bold text-base"
                >{{ item?.projectName }}</a
              >
              <div class="flex items-center gap-3">
                <p class="font-semibold text-base">{{ item?.startDate }}</p>
                <p class="font-semibold text-base">{{ item?.endDate }}</p>
              </div>
            </div>
            <p class="text-sm font-normal">{{ item?.description }}</p>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-col justify-center">
              <div class="form-data w-full">
                <label for="name">Skill Category</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your skill..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-full">
                <label for="name">List of skills</label>
                <TextareaValidation
                  id="ListOfSkill"
                  type="text"
                  name="ListOfSkill"
                  placeholder="Enter ListOfSkill..."
                  class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="w-full">
          <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">
            CERTIFICATION
          </h2>
          <div
            v-for="(item, index) in data.content.certification"
            :key="index"
            class="flex flex-col gap-0 mt-1 w-full px-3"
          >
            <div class="flex justify-between w-full items-center">
              <a
                :href="item?.certificationLink"
                class="cursor-pointer"
              >
                <span class="font-semibold text-base">{{ item?.certificationName }}</span> by
                <span class="font-normal text-sm">{{ item?.issuingOrganization }}</span>
              </a>
              <p class="font-semibold text-base">{{ item?.issuedDate }}</p>
            </div>
            <div class="flex justify-between w-full items-center">
              <p class="font-semibold text-base">
                credentialId:
                <span class="underline font-normal text-sm"> {{ item?.credentialId }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-col justify-center">
              <div class="form-data w-full">
                <label for="name">Skill Category</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your skill..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-full">
                <label for="name">List of skills</label>
                <TextareaValidation
                  id="ListOfSkill"
                  type="text"
                  name="ListOfSkill"
                  placeholder="Enter ListOfSkill..."
                  class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>

      <BaseItemTemplate class="items-start">
        <div class="w-full">
          <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">AWARDS</h2>
          <div
            v-for="(item, index) in data.content.award"
            :key="index"
            class="flex flex-col gap-0 mt-1 w-full px-3"
          >
            <div class="flex justify-between w-full items-center">
              <a
                :href="item?.awardTitleLink"
                class="cursor-pointer"
              >
                <span class="font-semibold text-base">{{ item?.awardTitle }}</span>
              </a>
              <p class="font-semibold text-base">{{ item?.issuedDate }}</p>
            </div>
            <p class="font-normal text-base">{{ item?.issuer }}</p>
          </div>
        </div>
        <div class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5">
          <form
            class="flex gap-2 w-full flex-col"
            @submit="onSubmit"
          >
            <div class="flex items-center gap-x-4 w-full flex-col justify-center">
              <div class="form-data w-full">
                <label for="name">Skill Category</label>
                <InputValidation
                  id="name"
                  placeholder="Enter your skill..."
                  type="text"
                  name="name"
                  class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
              <div class="form-data w-full">
                <label for="name">List of skills</label>
                <TextareaValidation
                  id="ListOfSkill"
                  type="text"
                  name="ListOfSkill"
                  placeholder="Enter ListOfSkill..."
                  class="h-28 mt-1 bg-slate-50 border-slate-200 outline-none"
                />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                class="w-32 h-11 flex gap-2 items-center"
                @click="emits('close')"
              >
                Cancel
              </Button>
              <Button
                :disabled="isLoading"
                class="w-32 h-11 bg-primary flex gap-2 items-center"
                @click="onSubmit"
              >
                <span
                  v-if="isLoading"
                  class="i-svg-spinners-ring-resize"
                ></span>
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseItemTemplate>
    </div>
  </BaseTemplate>
</template>

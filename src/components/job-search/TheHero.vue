<template>
  <main class="flex flex-col h-screen">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <!-- margin -->
        <div class="col-start-1 col-span-1"></div>
        <!-- content -->
        <div class="col-start-2 col-span-5">
          <TheHeadline/>
          <JobSearchForm/>
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img class="h-80 w-80" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png" alt="page-logo">
        </div>
        <!-- margin -->
        <div class="col-start-12 col-span-1"></div>
      </div>
    </section>

    <!-- (# == v-slot:name) the name is the data passed from the child -->
    <!-- can also be destructured if the info passed is on various props -->
    <spot-light class="flex felx-row justify-center pb-16">
      <template #default="{img, title, description}">
        <router-link to="/jobs/results" class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2">
          <img :src="img" class="object-contain" />

          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">{{ title }}</h3>
            <p class="mt-3 text-sm">{{ description }}</p>
          </div>

          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1">
            See Jobs
          </router-link>
        </router-link>
      </template>
    </spot-light>
  </main>
</template>

<script lang="ts" setup>
import TheHeadline from '@/components/job-search/TheHeadline.vue';
import JobSearchForm from '@/components/job-search/JobSearchForm.vue';
import SpotLight from '@/components/job-search/SpotLight.vue';

// export default {
//     name: "TheHero",
//     components: {
//       TheHeadline,
//       JobSearchForm,
//       SpotLight,
//     },
// };
</script>
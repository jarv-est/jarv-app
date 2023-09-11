<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <single-job-listing v-for="job in displayedJobs" :key="job.id" :job="job"/>
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link role="link" v-if="previousPage" :to="{name:'JobResults', query: {page:previousPage}}" class="mx-3 text-sm font-semibold text-brand-blue-1">Previous</router-link>
        </div>

        <div class="flex items-center justify-center">
          <router-link role="link" v-if="nextPage" :to="{name: 'JobResults', query: {page: nextPage}}" class="mx-3 text-sm font-semibold text-brand-blue-1">Next</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import SingleJobListing from '@/components/job-results/SingleJobListing.vue';
import { useJobsStore } from '@/stores/jobs'; // {, FETCH_JOBS, FILTERED_JOBS}
import { useDegreesStore } from '@/stores/degrees';

import useChangePages from "@/composables/useChangePages.js";

// computed
const route = useRoute();
const jobsStore = useJobsStore();

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const currentPage = computed(() => Number.parseInt(route.query.page as string || "1"));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

// const previousPage = computed(() => {
//   const prevPage = currentPage.value - 1;
//   const firstPage = 1;
//   // condition?x:y if (condition) return x, else return y 
//   return prevPage >= firstPage ? prevPage:undefined;
// });

// const nextPage = computed(() => {
//   const nextPage = currentPage.value + 1;
//   const maxPage = Math.ceil(FILTERED_JOBS.value.length / 10);
//   return nextPage <= maxPage ? nextPage : undefined;
// });

// previousPage and nextPage are already reactive => no need to use toRefs()
const {previousPage, nextPage} = useChangePages(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

// hooks
onMounted(jobsStore.FETCH_JOBS);

const degreesStore = useDegreesStore();
onMounted(degreesStore.FETCH_DEGREES);

// import { mapActions, mapState } from 'pinia';
// export default {
//   name: "JobListings",
//   components: { SingleJobListing },
//   computed: {
//     currentPage() {
//       return Number.parseInt(this.$route.query.page || "1");
//     },
//     previousPage() {
//       const prevPage = this.currentPage - 1;
//       const firstPage = 1;
//       // condition?x:y if (condition) return x, else return y 
//       return prevPage >= firstPage ? prevPage:undefined;
//     },
//     // statename: "statename referenced in pinia"
//     // nextPage and displayedJobs are in mapState because they reference this.jobs
//     ...mapState(useJobsStore, {
//       // jobs: "jobs", // BEFORE
//       FILTERED_JOBS,
//       nextPage() {
//         const nextPage = this.currentPage + 1;
//         const maxPage = Math.ceil(this.FILTERED_JOBS.length / 10);
//         return nextPage <= maxPage ? maxPage : undefined;
//       },
//       displayedJobs() {
//         const pageNumber = this.currentPage;
//         const firstJobIndex = (pageNumber - 1) * 10;
//         const lastJobIndex = pageNumber * 10
//         return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
//       },
//     }),
//   },
//   async mounted() {
//     // importing a variable from .env files
//     // const baseUrl = import.meta.env.VITE_APP_API_URL;
//     // const response = await axios.get(`${baseUrl}/jobs`);
//     // this.jobs = response.data;
//     // importing data using the pinia store
//     this.FETCH_JOBS()
//   },
//   methods: {
//     ...mapActions(useJobsStore, [FETCH_JOBS]),
//   },
// };
</script>
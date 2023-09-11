<template>
  <div class="w-full h-16 border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <!-- fas: font-awesome-solid, category of icons -->
        <!-- fai has a multitude of icons, to choose one it needs a prop (:icon) -->
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span>
      </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";

// computed
const route = useRoute();
const onJobResultsPage = computed(() => route.name === "JobResults");

// useJobsStore is a reactive component (composable)
const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

// import { mapState } from "pinia";
// export default {
//   name: "SubNav",
//   computed: {
//     // ...mapState() allows the use of this. to access the states
//     ...mapState(useJobsStore, [FILTERED_JOBS]),
//     onJobResultsPage() {
//       return this.$route.name === "JobResults";
//     },
//   },
// };
</script>
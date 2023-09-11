<template>
  <div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white p-4 w-96">
    <section class="pb-5">
      <job-filters-sidebar-prompt/>

      <job-filters-sidebar-skills/>

      <!-- slot component -->
      <!-- using an opening/closing tag (not self closing), allows to pass to the child component everything between the tags -->
      <!-- <accordion header="Degree"></accordion> -->

      <accordion header="Degrees">
        <job-filters-sidebar-checkbox :unique-values="UNIQUE_DEGREES" :action="userStore.ADD_SELECTED_DEGREES"/>
      </accordion>

      <accordion header="Job Types">
        <job-filters-sidebar-checkbox :unique-values="UNIQUE_JOB_TYPES" :action="userStore.ADD_SELECTED_JOB_TYPES"/>
      </accordion>

      <accordion header="Organizations">
        <job-filters-sidebar-checkbox :unique-values="UNIQUE_ORGANIZATIONS" :action="userStore.ADD_SELECTED_ORGANIZATIONS"/>
      </accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useDegreesStore } from "@/stores/degrees";

import Accordion from "@/components/shared/Accordion.vue";
import JobFiltersSidebarCheckbox from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckbox.vue";
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "./JobFiltersSidebarSkills.vue";

// computed
const jobsStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);

const degreesStore = useDegreesStore();
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

// methods
const userStore = useUserStore();
const route = useRoute();

const parseSkill = () => {
  const role = route.query.role as string || "";
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
};

// hooks
onMounted(parseSkill);
</script>
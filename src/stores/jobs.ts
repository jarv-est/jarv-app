import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import type { Job } from "@/api/types";
import getJobs from "@/api/getJobs";

// guarantee to have the correct name for the method when imported in a component
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";

export interface JobState {
  jobs: Job[];
}

export const useJobsStore = defineStore("jobs", {
  // state: equivalent to data component
  state: (): JobState => ({
    jobs: [],
  }),
  // actions: equivalent to method component
  actions: {
    // dynamic method name
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  // getters: equivalent to computed component
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrgs = new Set<string>();
      state.jobs.forEach((job) => { uniqueOrgs.add(job.organization) });
      return uniqueOrgs;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>();
      state.jobs.forEach((job) => { uniqueJobTypes.add(job.jobType) });
      return uniqueJobTypes;
    },
    // returns a (arrow) function
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job: Job) => {
      const userStore = useUserStore();
      const noJobOrgs = userStore.selectedOrganizations.length === 0;
      return noJobOrgs ? true : userStore.selectedOrganizations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore();
      const noJobOrgs = userStore.selectedJobTypes.length === 0;
      return noJobOrgs ? true : userStore.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore();
      if (userStore.selectedDegrees.length === 0) return true;
      return userStore.selectedDegrees.includes(job.degree);
    },
    [INCLUDE_JOB_BY_SKILL]: () => (job: Job) => {
      const userStore = useUserStore();
      // no need for if since includes with empty string returns true
      // if (userStore.skillSearchTerm.length === 0) return true;
      return job.title.toLowerCase().includes(userStore.skillSearchTerm.toLowerCase());
    },
    [FILTERED_JOBS](state): Job[] {
      const userStore = useUserStore();
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILL(job));
    },
  },
});
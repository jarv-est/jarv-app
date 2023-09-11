import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { createJob } from "@/utils/createJob";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("unique organizations", () => {
    it("finds unique organizations from a list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Temporary" }),
        createJob({ jobType: "Full-time" }),
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Full-time", "Temporary"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected an organizartion", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const store = useJobsStore();
        userStore.selectedOrganizations = [];
        const job = createJob({ organization: "Google" });

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      const store = useJobsStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const job = createJob({ organization: "Google" });

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const store = useJobsStore();
        userStore.selectedJobTypes = [];
        const job = createJob({ jobType: "Full-time" });

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      const store = useJobsStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];
      const job = createJob({ jobType: "Part-time" });

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not selected any degrees", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        const store = useJobsStore();
        userStore.selectedDegrees = [];
        const job = createJob();

        const result = store.INCLUDE_JOB_BY_DEGREE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given degrees", () => {
      const userStore = useUserStore();
      const store = useJobsStore();
      userStore.selectedDegrees = ["Master's"];
      const job = createJob({ degree: "Master's" });

      const result = store.INCLUDE_JOB_BY_DEGREE(job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("identifies if job matches user's skill", () => {
      const userStore = useUserStore();
      userStore.skillSearchTerm = "Vue";
      const store = useJobsStore();
      const job = createJob({ title: "Vue Developer" });

      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const userStore = useUserStore();
      userStore.skillSearchTerm = "vuE";
      const store = useJobsStore();
      const job = createJob({ title: "Vue Developer" });

      const result = store.INCLUDE_JOB_BY_SKILL(job);
      expect(result).toBe(true);
    });

    describe("when the user has not entered any skill", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.skillSearchTerm = "";
        const store = useJobsStore();
        const job = createJob({ title: "Vue Developer" });

        const result = store.INCLUDE_JOB_BY_SKILL(job);
        expect(result).toBe(true);
      });
    });
  });
});
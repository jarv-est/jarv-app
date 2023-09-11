import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");
// import axios from "axios";

import JobListings from "@/components/job-results/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";
import { useDegreesStore } from "@/stores/degrees";

// vi.mock("module"): replaces all exports/methods from the module with mock functions
// vi.mock("axios");
const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  // const createRoute = (queryParams = {}) => ({
  //   query: {
  //     page: "5",
  //     ...queryParams,
  //   },
  // });

  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const degreesStore = useDegreesStore();
    // @ts-expect-error: Getters are read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    render(JobListings, {
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route,
        // },
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { jobsStore, degreesStore };
  };

  it("fetches jobs", () => {
    // mockReturnValue: specify the return value which teh function gives
    // mockResolvedValue: async of mockReturnValue
    // axios.get.mockResolvedValue({data:[]});
    // const $route = createRoute();
    useRouteMock.mockReturnValue({ query: {} });
    const { jobsStore } = renderJobListings();
    // const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
    // expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  });

  it("fetches degrees", () => {
    useRouteMock.mockReturnValue({ query: {} });
    const { degreesStore } = renderJobListings();
    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("creates a job listing for 10 jobs", async () => {
    // axios.get.mockResolvedValue({data: Array(15).fill({})});
    // const $route = createRoute({page: "1"});
    useRouteMock.mockReturnValue({ query: { page: "1" } });
    const { jobsStore } = renderJobListings();
    // const jobsStore = useJobsStore();
    // add jobs array to pinia store
    // jobsStore.jobs = Array(15).fill({});
    // @ts-expect-error: Getters are read only
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    // findByRole: async version of getByRole (find/get as a rule)
    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page 1", () => {
      // const queryParams = {page:undefined};
      // const $route = createRoute(queryParams);
      useRouteMock.mockReturnValue({ query: { page: undefined } });
      renderJobListings();
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      // const queryParams = {page:"3"};
      // const $route = createRoute(queryParams);
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      renderJobListings();
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      // axios.get.mockResolvedValue({data: Array(15).fill({})});
      // const $route = createRoute({page: "1"});
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      const { jobsStore } = renderJobListings();
      // const jobsStore = useJobsStore();
      // jobsStore.jobs = Array(15).fill({});
      // @ts-expect-error: Getters are read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      // UI is up to date
      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    // it.only makes the only test to be done
    it("shows link to next page", async () => {
      // axios.get.mockResolvedValue({data: Array(15).fill({})});
      // const $route = createRoute({page: "1"});
      useRouteMock.mockReturnValue({ query: { page: "1" } });
      const { jobsStore } = renderJobListings();
      // const jobsStore = useJobsStore();
      // jobsStore.jobs = Array(15).fill({});
      // @ts-expect-error: Getters are read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      // axios.get.mockResolvedValue({data: Array(15).fill({})});
      // const $route = createRoute({page: "2"});
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      const { jobsStore } = renderJobListings();
      // const jobsStore = useJobsStore();
      // jobsStore.jobs = Array(15).fill({});
      // @ts-expect-error: Getters are read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      // axios.get.mockResolvedValue({data: Array(15).fill({})});
      // const $route = createRoute({page: "2"});
      useRouteMock.mockReturnValue({ query: { page: "2" } });
      const { jobsStore } = renderJobListings();
      // const jobsStore = useJobsStore();
      // jobsStore.jobs = Array(15).fill({});
      // @ts-expect-error: Getters are read only
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
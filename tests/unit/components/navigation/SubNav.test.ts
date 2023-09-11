import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");

import SubNav from "@/components/navigation/SubNav.vue";
import { useJobsStore } from "@/stores/jobs";

const useRouteMock = useRoute as Mock;

describe("SubNav", () => {
  // (routeName)
  const renderSubNav = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      // because of font-awesome-icon (app-wide component), a stub (lightweight replacement) is needed
      // stubs: {component: bool} (true: stub it)
      // mocks: replace an existing property with a mock
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route: {
        //     name: routeName,
        //   },
        // },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore };
  };

  describe("when the user is on the jobs page", () => {
    it("displays job count", async () => {
      // const routeName = "JobResults";
      useRouteMock.mockReturnValue({ name: "JobResults" })
      const { jobsStore } = renderSubNav(); // (routeName)
      const numJobs = 16;
      // @ts-expect-error: Getter is read-only
      jobsStore.FILTERED_JOBS = Array(numJobs).fill({});

      const jobCount = await screen.findByText(numJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      // const routeName = "Home";
      useRouteMock.mockReturnValue({ name: "Home" })
      const { jobsStore } = renderSubNav(); // (routeName)
      const numJobs = 16;
      // @ts-expect-error: Getter is read-only
      jobsStore.FILTERED_JOBS = Array(numJobs).fill({});

      const jobCount = screen.queryByText(numJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
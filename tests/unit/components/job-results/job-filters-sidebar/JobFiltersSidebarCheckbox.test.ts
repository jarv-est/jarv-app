import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobFiltersSidebarCheckbox from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckbox.vue";
import { useUserStore } from "@/stores/user";

const useRouterMock = useRouter as Mock;

describe("JobFiltersSidebarCheckbox", () => {
  interface Checkbox {
    uniqueValues: Set<string>
    action: Mock;
  };

  const createProps = (props: Partial<Checkbox> = {}) => ({
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersSidebarCheckbox = (props: Checkbox) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useUserStore();

    render(JobFiltersSidebarCheckbox, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        // stubs: {
        //   FontAwesomeIcon: true,
        // },
      },
    });

    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFiltersSidebarCheckbox(props);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value type", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["Full-time", "Part-time"]),
      });
      renderJobFiltersSidebarCheckbox(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(fullTimeCheckbox);
      expect(props.action).toHaveBeenCalledWith(["Full-time"]);
    });

    it("navigates user to JobResults page with new filtered jobs", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["Full-time"]),
      });
      renderJobFiltersSidebarCheckbox(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", { name: /full-time/i });
      await userEvent.click(fullTimeCheckbox);
      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });

  describe("when user clears job filters", () => {
    it("unchecks any checked checkboxes", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["Full-time"]),
      });
      const { userStore } = renderJobFiltersSidebarCheckbox(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /full-time/i,
        }
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();

      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /full-time/i,
        });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
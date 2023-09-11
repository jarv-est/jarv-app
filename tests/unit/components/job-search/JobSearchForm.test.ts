import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import JobSearchForm from "@/components/job-search/JobSearchForm.vue";

const useRouterMock = useRouter as Mock;

describe("JobSearchForm", () => {
  describe("when user submits a form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      // create a mock push function and add as a method of $push
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      // const $router = {push};

      render(JobSearchForm, {
        global: {
          // mocks: {
          //   $router,
          // },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Vue Developer");
      const locationInput = screen.getByRole("textbox", {
        // checks for the label 
        name: /where?/i
      });
      await userEvent.type(locationInput, "Dallas");

      const submitButton = screen.getByRole("button", {
        name: /search/i
      });
      await userEvent.click(submitButton);
      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Developer", location: "Dallas" },
      });
    });
  });
});
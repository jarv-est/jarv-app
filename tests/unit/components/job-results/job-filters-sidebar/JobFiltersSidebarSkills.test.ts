import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";
import JobFiltersSidebarSkills from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  const renderSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populates search input from store", async () => {
    const { userStore } = renderSkills();
    userStore.skillSearchTerm = "Programmer";
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("Programmer");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderSkills();
    userStore.skillSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "V");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  it("removes whitespace from user input", async () => {
    const { userStore } = renderSkills();
    userStore.skillSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "  Vue  ");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("Vue");
  });
});
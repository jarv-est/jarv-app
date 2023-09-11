import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import Accordion from "@/components/shared/Accordion.vue";

describe("Accordion", () => {
  const renderAccordion = (config = {}) => {
    render(Accordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      // default name for identifying slots is "default" (can be renamed in the element)
      slots: {
        default: "<h3>My nested child</h3>"
      },
      ...config,
    });
  };

  it("renders child component", async () => {
    const props = {
      header: "My Category",
    };
    const slots = {
      default: "<h3>My nested child</h3>",
    };
    renderAccordion({props, slots});

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", {name: /my category/i});
    await userEvent.click(button);
    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent does not provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
      header: "My Category",
    };
    const slots = {};
    renderAccordion({props, slots});

    const button = screen.getByRole("button", {name: /my category/i});
    await userEvent.click(button);
    expect(screen.getByText("Hmm, there should be something here")).toBeInTheDocument();
    });
  });
});
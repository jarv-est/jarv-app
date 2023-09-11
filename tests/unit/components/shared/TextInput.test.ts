import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import TextInput from "@/components/shared/TextInput.vue";

describe("TextInput", () => {
  it("communicates that user has entered character", async () => {
    // emitted(): method from the render that returns an object which keeps track of a components emitted events
    // the properties will be the event names
    const {emitted} = render(TextInput, {
      props: {
        modelValue: "",
      },
    });
    const input = screen.getByRole("textbox");
    // simulate the event of an input (object, "typedString") on the render
    // it stores the individual events as a nested array
    await userEvent.type(input, "NYC");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["N"],["NY"],["NYC"]]);
  });
});
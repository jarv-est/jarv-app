import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue"; //async, await for next tick

import TheHeadline from "@/components/job-search/TheHeadline.vue";

// mock functions: (vi.fn(), equivalent to arrow fn) functions that tracks how many times was called and with what arguments. Used to replace some functions
// expect(mock).toHaveBeenCalled(): checks how many times has been called
// expect(mock(args)).toHaveBeenCalledWith(args): checks the arguments the fn have been called
// vi.useFakeTimers(): replaces all time-related fn with mocks (setTimeout, etc)
describe("TheHeadline", () => {
  // to be run before each test
  beforeEach(() => {
    vi.useFakeTimers();
  });
  // to be run after each test
  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory action word", () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionPhrase).toBeInTheDocument();
  });

  it("changes action verb at a consistent interval", () => {
    // normally we cant assign the mock functions as objects, for that we use vi.stubGlobal("name-to-replace",to-replace-with)
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);

    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    // simulate the passage of time for the mock fn (like for setInterval)
    // there is an issue where the component is not going to have time to fully re-render (update) before the next assertion (ie. quering the component after the advanceTimers, the component wont be found)
    // this can be resolved with async "nextTick()"
    vi.advanceTimersToNextTimer();
    await nextTick();

    const actionPhrase = screen.getByRole("heading", {
      name: /for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    // mock clearInterval
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    // grab the unmount method from the component
    const { unmount } = render(TheHeadline);
    // simulates the unmount
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
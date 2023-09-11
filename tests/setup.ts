// runs once before doing any of the tests
import {cleanup} from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import {expect, afterEach} from "vitest";

// extend the matchers functionality from jest to expect
expect.extend(matchers);
// clean the environment after every test (assures the test are isolated)
afterEach(() => {
  cleanup();
});
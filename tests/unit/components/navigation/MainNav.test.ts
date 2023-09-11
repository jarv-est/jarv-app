// describe: optional, used to describe what is being tested (can be nested)
// it: invoke the test, it has to especify what it does
// expect: assertion of the test, the operation that is being evaluated
// import {describe, it, expect} from "vitest";
// if eslint errors appears do: npm install --save-dev eslint-plugin-vitest-globals
// screen: will be used to query the DOM to check if the elements are rendered, etc
// render: gets the component and its arguments (optional)
// render(MainNav, {
//   data() {
//     return {
//       company: 'Super Corp',
//     }
//   }
// });
// screen.debug();  // see the user dom
// .toBe vs toEqual: toBe is more strict as for arrays it expects to be the same array in the memory as the one being tested (requiring a reference to it). toEqual in the other hand just compares if the elements of the tested and expected array are the same
// queryByRole vs getByRole: query retuns null if the object is not found, get rises an error

import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import MainNav from "@/components/navigation/MainNav.vue";
import { useUserStore } from "@/stores/user";

const useRouteMock = useRoute as Mock;

describe("MainNav", () => {
  const renderMainNav = () => {
    useRouteMock.mockReturnValue({ name: "Home" });
    // invoke mock pinia (by defaut mocks all functions)
    const pinia = createTestingPinia({
      // stubActions: false  // mantain functions as is
      stubActions: true  // replace all functions with mocks
    });
    // const $route = {
    //   name:"Home",
    // };
    render(MainNav, {
      // FontAwesomeIcon: true => stub the font-awesome-icon from child SubNav
      // RouterLink: RouterLinkStub => stub the routerlink component
      global: {
        // add pinia to the component with real functions
        plugins: [pinia],
        // mocks: {
        //   $route,
        // },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText('AR Carrers'); // this checks for ONE match
    expect(companyName).toBeInTheDocument();  // checks for the element to be on the document
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navMenuItems = screen.getAllByRole("listitem");
    const navMenuText = navMenuItems.map((item) => item.textContent)
    expect(navMenuText).toEqual(["Teams", "Locations", "Benefits", "Students", "Jobs",])
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      // instanciate the mock store (not needed if the real functions are used)
      const userStore = useUserStore();

      // name for img is the alt-text. it goes as string or a regular expression /name/ (i: case insensitive)
      let profileImage = screen.queryByRole("img", {
        name: /profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      // name for button is its text content
      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      // simulate the action loginUser in pinia (not needed for the real functions)
      userStore.isLoggedIn = true;
      // click event is asyncronous. now the dom has the event applied to the corresponding element
      await userEvent.click(loginButton);
      profileImage = screen.getByRole("img", {
        name: /profile image/i,
      });
      expect(profileImage).toBeInTheDocument();

    });
  });
});
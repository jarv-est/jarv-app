import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe('state', () => {
  // create Pinia instance
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it("stores degrees that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });

  it("stores user's search term for skills and qualifications", () => {
    const store = useUserStore();
    expect(store.skillSearchTerm).toBe("");
  });
});

describe('actions', () => {
  describe('loginUser', () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  // the standard to name actions are in all caps
  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(["Full-time", "Part-time"]);
      expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"]);
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("recieves search term for skills the user has entered", () => {
      const store = useUserStore();
      store.skillSearchTerm = "";
      store.UPDATE_SKILLS_SEARCH_TERM("Vue");
      expect(store.skillSearchTerm).toBe("Vue");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const store = useUserStore();
      store.selectedDegrees = ["Random degree"];
      store.selectedJobTypes = ["Random job type"];
      store.selectedOrganizations = ["Random organization"];
      store.skillSearchTerm = "Vue"

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.skillSearchTerm).toEqual("");
    })
  });
});
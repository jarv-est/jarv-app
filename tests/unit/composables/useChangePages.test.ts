import { ref } from "vue";
import useChangePages from "@/composables/useChangePages";

describe("useChangePages", () => {
  it("calculates page before current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(10);
    const { previousPage } = useChangePages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });

  describe("when current page is the first page", () => {
    it("does not provide previous page", () => {
      const currentPage = ref(1);
      const maxPage = ref(1);
      const { previousPage } = useChangePages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });

  it("calculates page after current one", () => {
    const currentPage = ref(8);
    const maxPage = ref(10);
    const { nextPage } = useChangePages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });

  describe("when current page is the last page", () => {
    it("does not provide next page", () => {
      const currentPage = ref(8);
      const maxPage = ref(8);
      const { nextPage } = useChangePages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
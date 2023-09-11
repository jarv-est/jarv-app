import { type Ref, computed } from "vue";

const useChangePages = (currentPage: Ref<number>, maxPage: Ref<number>) => {
  const previousPage = computed(() => {
    const prevPage = currentPage.value - 1;
    const firstPage = 1;
    // condition?x:y if (condition) return x, else return y 
    return prevPage >= firstPage ? prevPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  return { previousPage, nextPage };
};

export default useChangePages;
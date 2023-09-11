import { computed, ref } from "vue";
import { defineStore } from "pinia";

import getDegrees from "@/api/getDegrees";
import type { Degree } from "@/api/types";

// Composition API
export const useDegreesStore = defineStore("degrees", () => {
  // state
  const degrees = ref<Degree[]>([]);

  // actions
  const FETCH_DEGREES = async () => {
    const recDegrees = await getDegrees();
    degrees.value = recDegrees;
  };

  // getters
  const UNIQUE_DEGREES = computed(() => degrees.value.map((degree) => degree.degree));

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
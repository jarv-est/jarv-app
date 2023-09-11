<template>
  <div class="mt-2">
    <input v-model.lazy.trim="skillSearchTerm" type="text" class="h-12 w-full rounded border-solid border-brand-gray-1 p-3 text-base shadow-gray" placeholder="Computer Programming, Finance Degree"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

// computed
const userStore = useUserStore();
// computed can be called with an object with get and set methods
// get() describe how the current value of the computed property will be calculated
// set() describe how to update the current piece of that computed state
const skillSearchTerm = computed({
  get() {
    return userStore.skillSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});
</script>
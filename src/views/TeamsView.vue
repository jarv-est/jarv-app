<template>
  <!-- to indicate which named slot in child should be injected, v-slot:name (#name) is used in a template element -->
  <!-- if a slot doesnt have a name, it is assigned default (v-slot:default) -->
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>

    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">Why don't you come join us?</h2>
    </template>
  </header-container>
</template>

<script lang="ts" setup>
import HeaderContainer from '@/components/shared/HeaderContainer.vue';
// export default {
//   name: "TeamsView",
//   components: { HeaderContainer },
// };
</script>
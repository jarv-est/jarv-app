<!-- script, template, style -->
<!-- style always* last (and with 'scoped' attribute) -->
<template>
  <MainNav/>
  <router-view/>
</template>

<!-- script: Composition API (Vue3) -->
<!-- <script setup></script> -->
<script lang="ts" setup>
  import MainNav from '@/components/navigation/MainNav.vue';

  // export default {
  //   name: "App",
  //   components: {
  //     MainNav, // kebab case: main-nav, pascal case: MainNav (accepts both)
  //   },
  // };
</script>


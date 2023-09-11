<!-- single job page -->
<template>
  <div>Job Page for {{ currentJobId }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// computed
const route = useRoute();
const currentJobId = () => route.params.id;

// export default {
//   name: "JobView",
//   computed: {
//     currentJobId() {
//       // the last name must match with the given in router
//       return this.$route.params.id;
//     },
//   },
// };
</script>
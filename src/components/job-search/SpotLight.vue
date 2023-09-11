<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <!-- to give information up to the parent, a slot prop is needed (scoped slot) -->
      <!-- for that, we give a prop to the slot which is passed to the parent -->
      <slot :img="spotlight.img" :title="spotlight.title" :description="spotlight.description"></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
// hooks methods like onMounted (on[Hook]) recieves a function as an argument
import { ref, onMounted } from "vue";
import axios from "axios";

interface SpotLight {
  id: number;
  img: string;
  title: string;
  description: string;
};

// data
const spotlights = ref<SpotLight[]>([]);

// hooks
const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get<SpotLight[]>(url);
  spotlights.value = response.data;
};

onMounted(getSpotlights);

// export default {
//   name: "SpotLight",
//   data() {
//     return {
//       spotlights: [],
//     };
//   },
//   async mounted() {
//     const baseUrl = import.meta.env.VITE_APP_API_URL;
//     const url = `${baseUrl}/spotlights`;
//     const response = await axios.get(url);
//     this.spotlights = response.data;
//   },
// };
</script>
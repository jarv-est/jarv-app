<template>
  <img :src="imageLink" alt="Profile image" class="h-8 w-8 rounded-3xl object-contain">
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const imageLink = ref("https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png");
</script>

<!-- Options API -->
<!-- <script lang="ts">
// helper function for wrapping OptionsAPI with TypeScirpt
import { defineComponent } from 'vue';

interface Data {
  imageLink: string;
};

export default defineComponent({
  name: "ProfileImage",
  data(): Data {
    return {
      imageLink: "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png"
    };
  },
});
</script> -->
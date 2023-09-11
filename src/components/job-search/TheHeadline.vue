<template>
  <section class="mb-16">
    <!-- <br/>: line break -->
    <!-- tracking-tighter: less spacing between letters -->
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br/>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at AR corp.</h2>
  </section>
</template>


<script lang="ts" setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import nextElementList from "@/utils/nextElementList.js";

// data
const action = ref("Build");
// ReturnType allows the type to be defined by the return of another function
const interval = ref<ReturnType<typeof setInterval>>();

// computed
const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  };
});

// methods
const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Build", "Create", "Design", "Code"];
    action.value = nextElementList(actions,action.value);
  }, 3000);
};

// hooks
onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));

// export default {
//   name: "TheHeadline",
//   data() {
//     return {
//       action: "Build",
//       interval: null,
//     };
//   },
//   computed: {
//     actionClasses() {
//       return {
//         // dynamic keys
//         [this.action.toLowerCase()]: true,
//       };
//     },
//   },
//   // Hook: intercepts one of the precesses when the component is called to render, updated or unmounted, and allows JS to execute operations at it
//   // beforeCreate(), created(), beforeMount(), mounted(), beforeUpdate(), updated(), beforeUnmount(), unmounted()
//   created() {
//     this.changeTitle();
//   },
//   // clean the setInterval to prevent bugs and memory leaks
//   beforeUnmount() {
//     clearInterval(this.interval);
//   },
//   methods: {
//     changeTitle() {
//       this.interval = setInterval(()=>{
//         const actions = ["Build", "Create", "Design", "Code"];
//         this.action = nextElementList(actions,this.action);
//       }, 3000);
//     },
//   },
// };
</script>

<style scoped>
.build {
  color: #1a73e8;
}

.create {
  color: #34a853;
}

.design {
  color: #f9ab00;
}

.code {
  color: #d93025;
}
</style>
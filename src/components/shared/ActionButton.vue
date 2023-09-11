<template>
  <!-- px, py: padding on x-axis or y-axis -->
  <!-- hover:attr hover effect which applies the attribute -->
  <!-- v-bind can be used to apply JS expressions -->
  <!-- JS objects can be used to tell which classes to apply -->
  <button :class="buttonClass">{{text}}</button>
</template>

<!-- Options API -->
<!-- props: data which can be passed (1-way) upon child components (parent is the component that renders another component in itself) -->
<!-- computed: property for data which tells is derived from another piece of data -->
<!-- <script>
// for Composition API
import { computed, toRefs } from 'vue';

export default {
  name: "ActionButton",
  // props: ["text", "type"],
  // typescript: "type" type of data used, "required" forces it or it rises a warning, if not "default" will give the value when the type is not correct
  // validator() checks for the value of the prop which returns a boolean, gives a warning if result is false
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "primary",
      validator(value) {
        return ["primary", "secondary"].includes(value);
      },
    },
  },
  // Options API
  // computed: {
  //   buttonClass() {
  //     return {
  //       // dynamic object keys [key]:
  //       [this.type]: true, // css-class: true
  //     };
  //   },
  // },
  // Composition API (to use props, must be added as an argument)
  setup(props) {
    const { type } = toRefs(props);

    const buttonClass = computed(() => {
      return {
        [type.value]: true,
      };
    });

    return {buttonClass};
  },
};
</script> -->

<!-- UPDATED SCRIPT (Vue3) -->
<script lang="ts" setup>
import { computed, toRefs } from 'vue';

// to use props, assign the function to an object
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "primary",
    validator(value: string) {
      return ["primary", "secondary"].includes(value);
    },
  },
});

const { type } = toRefs(props);

const buttonClass = computed(() => {
  return {
    [type.value]: true,
  };
});

</script>

<!-- Tailwind directive: @apply -->
<style scoped>
button {
  @apply px-5 py-3 font-medium
}

.primary{
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary{
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}

</style>
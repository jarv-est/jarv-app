<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div class="flex flex-wrap items-center justify-between cursor-pointer" role="button" @click="open">
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon"/>
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <!-- slot: allows a parent component to define an injectable slice of HTML that can be injected or placed in a child component -->
      <!-- used when we want the parent component to customize some bit of HTML that is going to be rendered within the child -->
      <!-- similar to props, but those are resticted for passing down data -->
      <!-- with slots, we can pass down elements, components, etc -->
      <!-- when there is no elements passed from the parent, the fallback resides of whatever is between the slot tags -->
      <slot>
        <p>Hmm, there should be something here</p>
      </slot>
    </div>
  </div>
</template>

<!-- UPDATED SETUP (Vue3) -->
<!-- all elements inside the script do not require to be returned to be available -->
<!-- everything is immediately available -->
<!-- export default, "name" property are no longer needed -->
<!-- to crate props, the function defineProps() has to be used (with an object as an argument) -->
<!-- the setup() function is no longer needed -->
<!-- imported components no longer needs to be declarated -->
<script lang="ts" setup>
import { computed, ref } from 'vue';

// props
defineProps({
  header: {
    type: String,
    required: true,
  },
});

// data
const isOpen = ref(false);

// methods
const open = () => {isOpen.value = !isOpen.value;};

// computed
const caretIcon = computed(() => isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]);
</script>

<!-- Options API (Vue2) -->
<!-- <script>
export default {
  name: "Accordion",
  props: {
    header: {
      type: String,
      required: true,
    },

  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script> -->

<!-- Composition API (Vue3) -->
<!-- <script>
import { computed, ref } from 'vue';

export default {
  name: "Accordion",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  // setup runs once, returns an object
  // runs before rendering the component, but after resolving props
  // does not have access to .this
  // runs before lifecycle hooks (created, mounted)
  // everything returned is available in the template
  setup() {
    const isOpen = ref(false);

    const open = () => {
      isOpen.value = !isOpen.value;
    };

    const caretIcon = computed(() => isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]);

    return {isOpen, open, caretIcon};
  },
};
</script> -->
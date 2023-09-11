<template>
  <!-- v-model: (v-model="data") two way binding with data and Ui -->
  <!-- @input="updateRole" == @input="location = $event.target.value" -->
  <input type="text" :value="modelValue" class="w-full text-lg font-normal focus:outline-none" @input="handleInput">
</template>


<script lang="ts" setup>
// props
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

// emits
const emit = defineEmits(["update:modelValue"]);

// methods
const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>


<!-- <script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TextInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  // emit events validation
  emits: ["update:modelValue"],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement;
      // Emiiting a custom event to parent component: $emit("eventName", data_sent)
      // generates an event to the parent component with the given data
      // using the emit name as is in combination with the prop name, it enables the use of the v-model on the component (gives the prop to the parent as an event with the specified name, for which v-model is listening)
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script> -->
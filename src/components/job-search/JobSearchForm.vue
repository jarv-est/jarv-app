<template>
  <!-- submit.prevent: prevent default action when submit form is called (refresh page) -->
  <form action="" class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3" @submit.prevent="searchForJobs">
    <font-awesome-icon :icon="['fas','search']" class="ml-4 mr-3"/>

    <div class="flex flex-1 flex-nowrap h-full text-base font-light">
      <div class="flex h-full flex-1 relative items-center pr-3">
        <label for="role" class="absolute left-0 -top-10">Role</label>
        <!-- @handle-input="role = $event" => @handle-input="handle" handle(payload) {this.role = payload} -->
        <!-- :value="role" => binded role data with a prop of child component which will update the data based on the input -->
        <text-input id="role" v-model="role" placeholder="Software engineer"/>
      </div>

      <span class="flex items-center h-full border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3">in</span>

      <div class="flex h-full flex-1 relative items-center pr-3 ml-2">
          <label for="location" class="absolute left-0 -top-10">Where?</label>
          <text-input id="location" v-model="location" placeholder="Los Angeles"/>
        </div>
    </div>

    <action-button text="Search" type="secondary" class="rounded-r-3xl"/>
  </form>
</template>

<!-- <script>
import ActionButton from "@/components/shared/ActionButton.vue";
import TextInput from "@/components/shared/Textinput.vue";

export default {
  name: "JobSearchForm",
  components: {ActionButton, TextInput},
  data() {
    return {
      role: "",
      location: "",
    };
  },
  methods: {
    searchForJobs() {
      this.$router.push({
        name: "JobResults",
        // query: tranforms JSON into query parameters
        query: {role: this.role, location: this.location},
      });
    },
  }
};
</script> -->

<script lang="ts" setup>
import { ref } from "vue";
// composable: (use...) helper methods which helps to access to reactive states
import { useRouter } from "vue-router"; 
import ActionButton from "@/components/shared/ActionButton.vue";
import TextInput from "@/components/shared/TextInput.vue";

const role = ref("");
const location = ref("");

// invoking useRouter() makes available the router object
const router = useRouter();
const searchForJobs = () => {
  router.push({
    name: "JobResults",
    // query: tranforms JSON into query parameters
    query: { role: role.value, location: location.value },
  });
};
</script>
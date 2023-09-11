<!-- directives: special vue command (v-*) -->
<!-- v-bind: (:href, v-bind:attr) binds an attribute's value to a data property, class, target, etc -->
<!-- v-for: (v-for="element in iterable" key="") iterate over an iterable and produce a html for every iteration. "key" is the unique value for each iteation -->
<!-- v-if: (v-if="") conditionally renders an element based on a criteria (must be evaluable as true or false) -->
<!-- v-else: renders an element when v-if is not -->
<!-- v-on: (v-on:event="", @event="") renders an element based on an (user) event -->

<!-- first: tailwind class to apply only to the first child -->
<!-- to display data(), the {{ }} is used -->
<!-- roles: all identifalbe objects are assigned a default role (li: listitem, nav: navigation, etc). div nor any general type are assigned a role, which has to be specified with role="role type" -->
<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8 mx-auto">
        <!-- <a :href="url" class="flex h-full items-center text-xl">{{ company }}</a> -->
        <router-link :to="{name:'Home'}" class="flex h-full items-center text-xl">AR Carrers</router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="ml-9 h-full first:ml-0">
              <!-- <a href="" class="flex h-full items-center py-2.5">{{ menuItem }}</a> -->
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">{{ menuItem.text }}</router-link>
            </li>
          </ul>
        </nav>
        <!-- ml-auto: push to far right side -->
        <!-- props: data which can be passed (1-way) upon child components (parent is the component that renders another component in itself) -->
        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn"/>
          <ActionButton v-else text="Sign In" type="primary" @click="loginUser"/>
        </div>
      </div>
      <!-- conditionally render the subnav -->
      <sub-nav v-if="isLoggedIn"/>
    </div>
  </header>
</template>

<!-- components can hold data() -->
<!-- each component holds its own batch (copy) of data -->
<!-- interpolate: embed a value (into the template)/ inject to something else -->
<!-- Vue2: Options API -->
<!-- <script>
  // mapStores is meant to be used with a "useStore" function
  // allows to connect components with the pinia store
  // makes available the states and actions within the component 
  // import { mapStores } from "pinia";
  // mapActions and mapState are similar to mapStores but they make available only the actions and states respectively
  import { mapActions, mapState } from "pinia";
  import { useUserStore } from "@/stores/user";

  import ActionButton from "@/components/shared/ActionButton.vue";
  import ProfileImage from "@/components/navigation/ProfileImage.vue";
  import SubNav from "@/components/navigation/SubNav.vue";

  export default {
    name: "MainNav",
    components: {
      ActionButton,
      ProfileImage,
      SubNav,
    },
    data() {
        return {
            menuItems: [
                {text: "Teams", url:"/teams"},
                {text: "Locations", url:"/"},
                {text: "Benefits", url:"/"},
                {text: "Students", url:"/"},
                {text: "Jobs", url:"/jobs/results"},
            ],
        };
    },
    computed: {
      // spread the properties of the returned object
      // the properties are named after the id in the store and append Store to it
      // id: user => userStore
      // ...mapStores(useUserStore),
      // import only the specified state
      // allows to use the state with this.
      ...mapState(useUserStore, ["isLoggedIn"]),
      // dynamic height of the mainnav for the Hero to be rendered under the nav and subnav
      headerHeightClass() {
        return {
          // call the property in the pinia store
          "h-16": !this.isLoggedIn,
          "h-32": this.isLoggedIn,
        };
      }
    },
    methods: {
      // add the specified actions from the pinia store
      // also available with this.
      ...mapActions(useUserStore, ["loginUser"]),
    },
};
</script> -->

<!-- Composition API -->
<script lang="ts" setup>
import { computed, ref } from "vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/navigation/ProfileImage.vue";
import SubNav from "@/components/navigation/SubNav.vue";

// data
const menuItems = ref([
  { text: "Teams", url: "/teams" },
  { text: "Locations", url: "/" },
  { text: "Benefits", url: "/" },
  { text: "Students", url: "/" },
  { text: "Jobs", url: "/jobs/results" },
]);

// computed
const userStore = useUserStore();
const loginUser = userStore.loginUser;
const isLoggedIn = computed(() => userStore.isLoggedIn);

// dynamic height of the mainnav for the Hero to be rendered under the nav and subnav
const headerHeightClass = computed(() => ({
  // call the property in the pinia store
  "h-16": !isLoggedIn.value,
  "h-32": isLoggedIn.value,
}));
</script>
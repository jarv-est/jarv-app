import { createApp } from 'vue';
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleUp, faSearch } from "@fortawesome/free-solid-svg-icons"; // faSearch: magnifying glass

import '@/index.css';
import router from "@/router";
import App from '@/App.vue';

// add icon to the Vue library
library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);


// create Pinia store
const pinia = createPinia();

// builder pattern: each method returns the app instance
// component: ("component name",component)
// the component will be available globally
createApp(App).use(pinia).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";

import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon.scss";

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);
appInstance.mount("#app");

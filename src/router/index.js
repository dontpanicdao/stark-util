import { createRouter, createWebHistory } from "vue-router";

import Util from "../views/Util.vue";

const routes = [
  {
    path: "/",
    component: Util,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;

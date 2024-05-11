import { createRouter, createWebHistory } from "vue-router";
import Default from "../components/Default.vue";
import Homepage from "../views/Homepage.vue";
const routes = [
  {
    path: "/",
    component: Default,
    children: [
      {
        path: "/",
        name: "Homepage",
        component: Homepage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Default from "../components/Default.vue";
import Homepage from "../views/Homepage.vue";
import Analytics from "../components/Analytics.vue"; // Import the new component

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
      {
        path: "analytics",
        name: "Analytics",
        component: Analytics,
      },
    ],
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

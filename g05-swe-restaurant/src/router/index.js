import { createRouter, createWebHistory } from "vue-router";
import Default from "../components/Default.vue";
import Homepage from "../views/Homepage.vue";

import Analytics from "../views/Analytics.vue";

import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";

import { notify } from "@kyvg/vue3-notification";

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
        meta: { requiresAdmin: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Default,
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/LogIn.vue"),
      },
      {
        path: "signup",
        name: "Signup",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

async function checkAuth() {
  try {
    const response = await fetch("http://localhost:8000/users/auth", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Not authenticated");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const user = await checkAuth();
      if (
        to.matched.some(
          (record) => record.meta.requiresAdmin && user.type != "manager"
        )
      ) {
        notify({
          type: "warn",
          title: "Warning",
          text: "Must be Admin/Manager to access this page",
        });
        next({ name: "Homepage" });
      }
      next();
    } catch (error) {
      console.log(error);
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;

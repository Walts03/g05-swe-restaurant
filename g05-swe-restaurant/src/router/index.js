import { createRouter, createWebHistory } from "vue-router";
import Default from "../components/Default.vue";
import Homepage from "../views/Homepage.vue";

import Analytics from "../views/Analytics.vue";

import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";

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
  {
		path: '/login',
		name: 'LogIn',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
	},
	{
		path: '/signup',
		name: 'SignUp',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

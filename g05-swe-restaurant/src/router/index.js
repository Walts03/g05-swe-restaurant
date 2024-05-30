import { createRouter, createWebHistory } from "vue-router";
import Default from "../components/Default.vue";
import Homepage from "../views/Homepage.vue";
import Analytics from "../components/Analytics.vue"; // Import the new component
import MenuItems from "../components/MenuItems.vue";
import AddMenuItem from "../components/AddMenuItem.vue";
import EditItem from "../components/EditItem.vue";
import Cart from "../components/Cart.vue";

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
        path: "/analytics",
        name: "Analytics",
        component: Analytics,
      },
      {
        path: "/menuitems",
        name: "MenuItems",
        component: MenuItems,
      },
      {
        path: "/addmenu",
        name: "AddMenuItem",
        component: AddMenuItem,
      },
      {
        path: "/edititem",
        name: "EditItem",
        component: EditItem,
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

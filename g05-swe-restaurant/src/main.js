import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

const app = createApp(App);
app.use(router).mount("#app");
app.component("Nav", Nav);
app.component("Footer", Footer);

import { createApp } from "vue";
import { createPinia } from "pinia";
import { variantJS } from "@variantjs/vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Importa Lucide Vue
import {
  LucidePlay,
  LucidePause,
  LucideRefreshCw,
  LucideGithub,
  LucideUser,
  LucideMenu,
  LucideMoon,
  LucideSun,
  LucideTrash2,
  LucideX,
  LucidePlus,
  LucideCircleX,
  LucideUserPlus,
} from "lucide-vue-next";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "flowbite";

const app = createApp(App);
const configuration = {
  //...
};

app.component(VueCountdown.name, VueCountdown);

// Registra i componenti Lucide
app.component("LucidePlay", LucidePlay);
app.component("LucidePause", LucidePause);
app.component("LucideRefreshCw", LucideRefreshCw);
app.component("LucideGithub", LucideGithub);
app.component("LucideUser", LucideUser);
app.component("LucideMenu", LucideMenu);
app.component("LucideMoon", LucideMoon);
app.component("LucideSun", LucideSun);
app.component("LucideTrash2", LucideTrash2);
app.component("LucideX", LucideX);
app.component("LucidePlus", LucidePlus);
app.component("LucideCircleX", LucideCircleX);
app.component("LucideUserPlus", LucideUserPlus);

app.use(variantJS, configuration);
app.use(Vue3Toasity, { autoClose: 3000 });
app.use(createPinia());
app.use(router);

app.mount("#app");

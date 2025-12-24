import { createApp } from "vue";
import { createPinia } from "pinia";
import { variantJS } from "@variantjs/vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import Vue3Toasity from "vue3-toastify";
import { configure } from "vue-gtag";
import "vue3-toastify/dist/index.css";

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
  LucideStar,
  LucideClock,
  LucideUsers,
  LucideSettings,
  LucideCode,
  LucideGlobe,
} from "lucide-vue-next";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";

import "./assets/main.css";
import "flowbite";

configure({
  appName: "xScrabbler",
  pageTrackerScreenviewEnabled: true,
  config: {
    id: "G-8PKY8T9FPE",
  },
  router,
});

const app = createApp(App);
const configuration = {
  //...
};

app.component(VueCountdown.name, VueCountdown);

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
app.component("LucideStar", LucideStar);
app.component("LucideClock", LucideClock);
app.component("LucideUsers", LucideUsers);
app.component("LucideSettings", LucideSettings);
app.component("LucideCode", LucideCode);
app.component("LucideGlobe", LucideGlobe);

app.use(variantJS, configuration);
app.use(Vue3Toasity, { autoClose: 3000 });
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");

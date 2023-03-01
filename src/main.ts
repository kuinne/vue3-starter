import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

import "element-plus/dist/index.css";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    ja,
  },
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);
// app.config.unwrapInjectedRef = true
app.mount("#app");

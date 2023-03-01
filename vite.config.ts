import { defineConfig, Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from "path";
import fs from "fs";
import Inspect from "vite-plugin-inspect";
import Test from "./plugins/test";
import MarkDown from "./plugins/markdown/index";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 在Vue SFC中为props和emits引入外部类型定义
const vueImportType = (): Plugin => {
  return {
    name: "test",
    enforce: "pre",
    async transform(code, id) {
      if (!/\.(vue)$/.test(id)) return;
      const typePath = path.resolve(id, "../type.d.ts");
      if (!fs.existsSync(typePath)) return;
      const typeData = fs.readFileSync(typePath).toString();
      const replaceList = [
        `import type { Props } from './type'`,
        `import type { Props, Emits } from './type'`,
        `import type { Props, Emits } from "./type";`,
        `import type { Emits } from "./type";`,
        `import type { Props } from "./type";`,
      ];
      const replaceItem = replaceList.find((item) => code.indexOf(item) > -1);
      if (!replaceItem) return;
      return code.replace(replaceItem, typeData);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      /* options */
    }),
    vueImportType(),
    MarkDown(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Inspect(),
  ],
});

import { defineAsyncComponent, ref } from "vue";
import type { UseTabOptionsType } from "./type";

export function useTab({ tabPaneRender1, tabPaneRender2 }: UseTabOptionsType) {
  const TabSFC = defineAsyncComponent(() => import("./Tab.vue"));
  const activeKey = ref<string | number>("1");
  const handleTabChange = (name: string | number) => {
    activeKey.value = name;
  };
  const Tab = () => (
    <TabSFC
      onTabChange={handleTabChange}
      tabPaneRender1={tabPaneRender1}
      tabPaneRender2={tabPaneRender2}
    ></TabSFC>
  );
  return {
    Tab,
    activeKey,
  };
}

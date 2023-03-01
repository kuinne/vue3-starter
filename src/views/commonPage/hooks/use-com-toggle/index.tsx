import { defineAsyncComponent } from "vue";
import type { UseComToggleOptionsType } from "./type";

export function useComToggle({ activeKey, comps }: UseComToggleOptionsType) {
  const ComToggleSFC = defineAsyncComponent(() => import("./ComToggle.vue"));

  const ComToggle = () => (
    <ComToggleSFC activeKey={activeKey.value} comps={comps} />
  );

  return {
    ComToggle,
  };
}

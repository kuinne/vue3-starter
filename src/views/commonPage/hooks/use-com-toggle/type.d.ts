import type { Ref } from "vue";
export type UseComToggleOptionsType = {
  activeKey: Ref<string | number>;
  comps: {
    key: string;
    onActivated: () => void;
    render: () => JSX.Element;
  }[];
};

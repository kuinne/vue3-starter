import { defineAsyncComponent, ref } from "vue";
import type { UseAddOptions } from "./type";

export function useAdd({ onSubmit }: UseAddOptions) {
  const AddSFC = defineAsyncComponent(() => import("./Add.vue"));

  const visible = ref(false);

  const handleClose = () => {
    visible.value = false;
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  const Add = () => (
    <AddSFC
      visible={visible.value}
      onClose={handleClose}
      onSubmit={handleSubmit}
    ></AddSFC>
  );

  const open = () => {
    visible.value = true;
  };

  return {
    Add,
    open,
  };
}

import { defineAsyncComponent, unref, watchEffect, ref } from "vue";
import type { User } from "../../type";
import type { UseEditOptions } from "./type";

export function useEdit({ onSubmit }: UseEditOptions) {
  const EditSFC = defineAsyncComponent(() => import("./Edit.vue"));
  const visible = ref(false);
  const formData = ref<User | null>(null);

  const handleClose = () => {
    visible.value = false;
    formData.value = null;
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  const open = (val: User) => {
    formData.value = val;
    visible.value = true;
  };
  const Edit = () => (
    <EditSFC
      visible={visible.value}
      formData={formData.value}
      onClose={handleClose}
      onSubmit={handleSubmit}
    ></EditSFC>
  );

  return {
    Edit,
    open,
  };
}

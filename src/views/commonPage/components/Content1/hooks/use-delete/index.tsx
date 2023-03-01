import { defineAsyncComponent, ref } from "vue";
import type { User } from "../../type";
import type { UseDeleteOptions } from "./type";

export function useDelete({ onConfirm }: UseDeleteOptions) {
  const DeleteSFC = defineAsyncComponent(() => import("./Delete.vue"));

  const visible = ref(false);
  const formData = ref<User | null>(null);

  const handleClose = () => {
    visible.value = false;
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  const open = (val: any) => {
    formData.value = val;
    visible.value = true;
  };
  const Delete = () => (
    <DeleteSFC
      visible={visible.value}
      formData={formData.value}
      onClose={handleClose}
      onConfirm={handleConfirm}
    ></DeleteSFC>
  );
  return {
    Delete,
    open,
  };
}

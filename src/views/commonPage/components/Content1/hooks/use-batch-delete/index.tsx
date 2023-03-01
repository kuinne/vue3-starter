import { defineAsyncComponent, ref } from "vue";
import type { UseBatchDeleteOptions } from "./type";

export function useBatchDelete({
  multipleSelection,
  onConfirm,
}: UseBatchDeleteOptions) {
  const BatchDeleteSFC = defineAsyncComponent(() => import("./Delete.vue"));
  const visible = ref(false);
  const handleClose = () => {
    visible.value = false;
  };

  const handleConfirm = () => {
    onConfirm?.();
  };
  const BatchDelete = () => (
    <BatchDeleteSFC
      visible={visible.value}
      multipleSelection={multipleSelection.value}
      onClose={handleClose}
      onConfirm={handleConfirm}
    ></BatchDeleteSFC>
  );

  const open = () => {
    visible.value = true;
  };
  return {
    BatchDelete,
    open,
  };
}

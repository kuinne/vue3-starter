import { computed, defineAsyncComponent, ref, watchEffect } from "vue";
import type { UserTableOptions, TableAction, InitDataParamsType } from "./type";
import type { User } from "../../type";

export function useTable({ slots, onDelete, onEdit }: UserTableOptions) {
  const TableSFC = defineAsyncComponent(() => import("./Table.vue"));
  const tableRef = ref<InstanceType<typeof TableSFC>>();

  const multipleSection = ref<User[]>([]);

  watchEffect(() => {
    multipleSection.value = tableRef.value?.multipleSection || [];
  });
  const handleEdit = (row: User) => {
    onEdit?.(row);
  };
  const handleDelete = (row: User) => {
    onDelete?.(row);
  };
  const Table = () => (
    <TableSFC
      ref={tableRef}
      onEdit={handleEdit}
      onDelete={handleDelete}
      v-slots={slots}
    ></TableSFC>
  );

  return {
    Table,
    reload: (params?: InitDataParamsType) => tableRef?.value?.reload(params),
    multipleSection,
  };
}

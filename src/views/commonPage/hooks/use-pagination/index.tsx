import { defineAsyncComponent } from "vue";
import { UsePaginationOptions } from "./type";
import { ref } from "vue";

export function usePagination({
  total,
  onCurrentChange,
  onSizeChange,
}: UsePaginationOptions) {
  const PaginationSFC = defineAsyncComponent(() => import("./Pagination.vue"));

  const currentPage = ref(1);

  const handleCurrentChange = (val: number) => {
    onCurrentChange?.(val);
  };

  const handleSizeChange = (val: number) => {
    onSizeChange?.(val);
  };

  const Pagination = () => (
    <PaginationSFC
      curPage={currentPage.value}
      total={total.value}
      onCurrentChange={handleCurrentChange}
      onSizeChange={handleSizeChange}
    ></PaginationSFC>
  );

  return {
    Pagination,
  };
}

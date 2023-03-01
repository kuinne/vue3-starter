import { ComputedRef } from "vue";

export type Props = {
  pageSize?: number;
  curPage: number;
  total: number;
};

export type Emits = {
  ($event: "sizeChange", val: number): void;
  ($event: "currentChange", val: number): void;
};

export type UsePaginationOptions = {
  total: ComputedRef<number>;
  onCurrentChange?: (val: number) => void;
  onSizeChange?: (val: number) => void;
};

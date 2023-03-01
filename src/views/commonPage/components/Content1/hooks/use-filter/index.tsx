import { defineAsyncComponent } from "vue";
import type { UseFilterOptionsType, FilterObj } from "./type";

export function useFilter({ onChange }: UseFilterOptionsType) {
  const FilterSFC = defineAsyncComponent(() => import("./Filter.vue"));

  const handleChange = (filterObj: FilterObj) => {
    onChange?.(filterObj);
  };

  const Filter = () => <FilterSFC onChange={handleChange}></FilterSFC>;

  return {
    Filter,
  };
}

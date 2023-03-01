export type FilterObj = Partial<{
  name: string;
  sex: "男" | "女" | "all";
}>;

export type Props = {};

export type Emits = {
  ($event: "change", filterObj: any): void;
};

export type UseFilterOptionsType = {
  onChange?: (filterObj: FilterObj) => void;
};

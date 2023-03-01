export type Emits = {
  ($event: "edit", row: any);
  ($event: "delete", row: any);
};

export type FilterObj = Partial<{
  department: string;
  name: string;
  sex: "男" | "女" | "all";
}>;

export type Props = {};

export type TablePageType = {
  curPage: number;
  pageSize: number;
  total: number;
};

export type FilterObjType = Partial<{
  department: string;
  sex: "男" | "女" | "all";
}>;

export type InitDataParamsType = Partial<{
  tablePage: TablePageType;
  filterObj: FilterObjType;
}>;

export type UserTableOptions = {
  onEdit?: (row: User) => void;
  onDelete?: (row: User) => void;

  slots?: Partial<{
    default: () => any;
    header: () => any;
  }>;
};

export type TableAction = "edit" | "delete";

export interface User {
  id: number;
  date: string;
  name: string;
  address: string;
  department?: string;
  sex?: "男" | "女" | "all";
}

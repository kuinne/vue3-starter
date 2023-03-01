import { User } from "../../type";
import { Random } from "mockjs";
import { timeout } from "../utils/timeout";

const mockData: User[] = [];
for (let i = 0; i < 100; i++) {
  mockData.push({
    id: i,
    name: Random.cname(),
    address: Random.province() + Random.city(),
    date: Random.date(),
    department: Random.pick(["1-1-1-1", "1-1-1-2"]),
    sex: Random.pick(["男", "女"]),
  });
}
type FilterObj = Partial<{
  department: string;
  name: string;
  sex: User["sex"];
}>;
export type GetListParams = {
  pageSize?: number;
  curPage?: number;
  filterObj?: FilterObj | FilterObj[];
};
export const getList = (
  params?: GetListParams
): Promise<{
  data: User[];
  total: number;
  pageSize: number;
  curPage: number;
}> => {
  const { pageSize = 10, curPage = 1, filterObj } = params || {};

  const filteredData = mockData.filter((item) => {
    let flag = true;
    if (filterObj) {
      if (Array.isArray(filterObj)) {
        const departments = filterObj
          .map((item) => item.department)
          .filter((item) => !!item);

        const names = filterObj
          .map((item) => item.name)
          .filter((item) => !!item);

        const sexs = filterObj.map((item) => item.sex).filter((item) => !!item);

        flag = flag && departments.includes(item.department);
        flag = flag && names.includes(item.name);
        flag = flag && sexs.includes(item.sex);
      } else {
        const { department, name, sex } = filterObj;

        if (department) {
          flag = flag && item.department === department;
        }
        if (name) {
          flag = flag && item.name === name;
        }
        if (sex) {
          flag = flag && item.sex === sex;
        }
      }
    }
    return flag;
  });
  const resData = filteredData.slice(
    (curPage - 1) * pageSize,
    (curPage - 1) * pageSize + pageSize
  );
  return timeout({
    data: resData,
    total: filteredData.length,
    curPage,
    pageSize,
  });
};

export const updateItem = (id: number, payload: User) => {
  const index = mockData.findIndex((item) => item.id === id);
  mockData.splice(index, 1, payload);

  return timeout(payload);
};

export const deleteItem = (id: number) => {
  const index = mockData.findIndex((item) => item.id === id);
  mockData.splice(index, 1);
  return timeout("ok");
};

export const batchDelete = (ids: number[]) => {
  for (let id of ids) {
    const index = mockData.findIndex((item) => item.id === id);
    mockData.splice(index, 1);
  }
  return timeout("ok");
};

export const addItem = (payload: Omit<User, "id">) => {
  const addItem = {
    ...payload,
    id: mockData.length,
  };
  mockData.unshift(addItem);
  return timeout(addItem);
};

import { timeout } from "./../utils/timeout";
export type TreeNode = {
  name: string;
  id: string;
  leaf: boolean;
  path: string | null;
  children?: TreeNode[];
};

export type Tree = TreeNode[];

const rootData: Tree = [
  {
    id: "1",
    name: "菜单1",
    leaf: false,
    path: null,
  },
  {
    id: "2",
    name: "菜单2",
    leaf: true,
    path: null,
  },
  {
    id: "3",
    name: "菜单3",
    leaf: true,
    path: null,
  },

  {
    id: "4",
    name: "菜单4",
    leaf: true,
    path: null,
  },
];

const leafData: Record<string, TreeNode[]> = {
  "1": [
    {
      id: "1-1",
      name: "菜单1-1",
      leaf: false,
      path: null,
    },
    {
      id: "1-2",
      name: "菜单1-2",
      leaf: false,
      path: null,
    },
  ],
  "1-1": [
    {
      id: "1-1-1",
      name: "菜单1-1-1",
      leaf: false,
      path: null,
    },
    {
      id: "1-1-2",
      name: "菜单1-1-2",
      leaf: true,
      path: null,
    },
  ],
  "1-1-1": [
    {
      id: "1-1-1-1",
      name: "菜单1-1-1-1",
      leaf: true,
      path: null,
    },
    {
      id: "1-1-1-2",
      name: "菜单1-1-1-2",
      leaf: true,
      path: null,
    },
  ],
};

export function getTreeRoots(): Promise<Tree> {
  return timeout(rootData.slice());
}

export function getTree(): Promise<Tree> {
  const traverse = (data: any[]) => {
    return data.map((item) => {
      if (leafData[item.id]) {
        item.children = traverse(leafData[item.id]);
      }
      return item;
    });
  };

  const treeData = traverse(rootData);
  return timeout(treeData);
}

export type GetTreeLeafParams = {
  parentId: string;
};
export function getTreeLeaf({ parentId }: GetTreeLeafParams) {
  return timeout(leafData[parentId]?.slice() || []);
}

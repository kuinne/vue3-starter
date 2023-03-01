export type Props = {};

export type Emits = {
  ($event: "nodeClick", node: any): void;
};

export type UseTreeOptions = {
  onNodeClick?: (node: any) => void;
};

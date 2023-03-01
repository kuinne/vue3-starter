export type Props = {};

export type Emits = {
  ($event: "nodeClick", node: any): void;
};

export type UseCheckableTreeOptions = {
  onNodeClick?: (node: any) => void;
};

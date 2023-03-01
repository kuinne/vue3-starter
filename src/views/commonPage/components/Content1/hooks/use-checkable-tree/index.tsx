import { defineAsyncComponent, ref, toRaw } from "vue";

import type Node from "element-plus/es/components/tree/src/model/node";
import type { UseCheckableTreeOptions } from "./type";

export function useCheckableTree(options?: UseCheckableTreeOptions) {
  const { onNodeClick } = options || {};
  const TreeSFC = defineAsyncComponent(() => import("./Tree.vue"));
  const handleNodeClick = (node: Node) => {
    onNodeClick?.(toRaw(node));
  };
  const Tree = () => <TreeSFC onNodeClick={handleNodeClick}></TreeSFC>;
  return {
    Tree,
  };
}

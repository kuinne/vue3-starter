<template>
  <el-tree
    :props="treeProps"
    :load="loadNode"
    lazy
    node-key="id"
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script setup lang="ts">
import { ElTree } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { getTreeLeaf, getTreeRoots } from "../../mock";
import type { Props, Emits } from "./type";

interface Tree {
  name: string;
  id: string;
  leaf?: boolean;
}

const treeProps = {
  label: "name",
  children: "children",
  isLeaf: "leaf",
};

// const props = defineProps<Props>();

const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.data.id) {
    const treeLeafs = await getTreeLeaf({ parentId: node.data.id });
    resolve(treeLeafs);
  } else {
    const treeRoots = await getTreeRoots();

    resolve(treeRoots);
  }
};

const emits = defineEmits<Emits>();

const handleNodeClick = (node: Node) => {
  emits("nodeClick", node);
};
</script>

<style></style>

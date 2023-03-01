<template>
  <div class="container">
    <el-tree
      :data="treeData"
      :props="treeProps"
      :load="loadNode"
      :lazy="lazy"
      :default-expand-all="!lazy"
      node-key="id"
      @node-click="handleNodeClick"
      empty-text="暂无数据"
    ></el-tree>
  </div>
</template>

<script setup lang="ts">
import { ElTree } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import { getTree, getTreeLeaf, getTreeRoots } from "../../mock";
import type { Props, Emits } from "./type";
import { onMounted, ref } from "vue";

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

const lazy = ref(false);

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

const treeData = ref<Tree[]>([]);
const initTreeData = async () => {
  try {
    treeData.value = await getTree();
  } catch (error) {}
};

onMounted(() => {
  if (!lazy.value) {
    initTreeData();
  }
});

const emits = defineEmits<Emits>();

const handleNodeClick = (node: Node) => {
  emits("nodeClick", node);
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  :deep(.el-tree) {
    height: 100%;
  }
}
</style>

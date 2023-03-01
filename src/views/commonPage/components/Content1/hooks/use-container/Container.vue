<template>
  <el-container>
    <el-aside><Tree /></el-aside>
    <el-main><Table /></el-main>
  </el-container>
  <Edit />
  <Delete />
  <Add />
  <BatchDelete />
</template>

<script setup lang="tsx">
import { h } from "vue";
import { ElContainer, ElAside, ElMain } from "element-plus";
import { useEdit } from "../use-edit";
import { useTable } from "../use-table";
import { useDelete } from "../use-delete";
import { useAdd } from "../use-add";
import { useBatchDelete } from "../use-batch-delete";
import { useTree } from "../use-tree";
import { useFilter } from "../use-filter";

const { Delete, open: openDelete } = useDelete({
  onConfirm: () => {
    reload();
  },
});

const { Edit, open: openEdit } = useEdit({
  onSubmit: () => {
    reload();
  },
});

const { Filter } = useFilter({
  onChange: (filterObj) => {
    reload({
      filterObj,
    });
  },
});

const { Table, reload, multipleSection } = useTable({
  slots: {
    header: () => <Filter />,
  },
  onDelete: openDelete,
  onEdit: openEdit,
});

const { Tree } = useTree({
  onNodeClick: (node: any) => {
    reload({
      filterObj: {
        department: node.id,
      },
    });
  },
});

const { Add, open: openAdd } = useAdd({
  onSubmit: () => {
    reload();
  },
});

const { BatchDelete, open: openBatchDelete } = useBatchDelete({
  multipleSelection: multipleSection,
  onConfirm: () => {
    reload();
  },
});

defineExpose({
  reload,
  openAdd,
  openBatchDelete,
});
</script>

<style></style>

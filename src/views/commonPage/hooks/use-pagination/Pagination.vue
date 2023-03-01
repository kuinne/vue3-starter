<template>
  <el-pagination
    v-model="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 50]"
    :total="total"
    small
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts">
import { ElPagination } from "element-plus";
import { ref, watchEffect } from "vue";
import type { Props, Emits } from "./type";

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
});

const currentPage = ref(1);
const pageSize = ref(props.pageSize);
const total = ref(10);

watchEffect(() => {
  currentPage.value = props.curPage;
  total.value = props.total;
});

const emits = defineEmits<Emits>();

const handleSizeChange = (val: number) => {
  emits("sizeChange", val);
};

const handleCurrentChange = (val: number) => {
  emits("currentChange", val);
};
</script>

<style></style>

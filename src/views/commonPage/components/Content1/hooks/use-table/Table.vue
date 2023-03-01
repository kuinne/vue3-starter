<template>
  <div class="container">
    <div class="header-wrapper">
      <slot name="header"></slot>
    </div>
    <div class="table-wrapper">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="sex" label="性别" width="120" />
        <el-table-column
          property="address"
          label="Address"
          show-overflow-tooltip
        />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-wrapper">
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from "vue";
import { ElTable, ElTableColumn } from "element-plus";
import type { User } from "../../type";
import type { Props, Emits } from "./type";
import type { TablePageType, FilterObjType, InitDataParamsType } from "./type";
import { getList } from "../../mock";
import { usePagination } from "../../../../hooks/use-pagination";
import deepmerge from "deepmerge";

const tableData = ref<User[]>([]);

const tablePage = ref<TablePageType>({
  curPage: 1,
  total: 0,
  pageSize: 10,
});

const filterObj = ref<FilterObjType>({});

const { Pagination } = usePagination({
  total: computed(() => tablePage.value.total),
  onCurrentChange: (curPage: number) => {
    initData({
      tablePage: {
        ...tablePage.value,
        curPage,
      },
    });
  },
  onSizeChange: (pageSize: number) => {
    initData({
      tablePage: {
        ...tablePage.value,
        pageSize,
      },
    });
  },
});

const tableRef = ref<InstanceType<typeof ElTable>>();

const loading = ref(false);

const removeEmptyKey = (obj: Record<PropertyKey, any>) => {
  for (let key in obj) {
    const item = obj[key];
    if (item === undefined || item === null) {
      delete obj[key];
    } else if (typeof item === "object") {
      removeEmptyKey(item);
    }
  }
  return obj;
};

const mergeParams = (params?: InitDataParamsType) => {
  const innerParams = removeEmptyKey({
    curPage: tablePage.value.curPage,
    pageSize: tablePage.value.pageSize,
    filterObj: filterObj.value,
  });
  const outerParams = removeEmptyKey({
    curPage: params?.tablePage?.curPage,
    pageSize: params?.tablePage?.pageSize,
    filterObj: params?.filterObj,
  });
  const mergedParams = deepmerge.all<{
    curPage?: number;
    pageSize?: number;
    filterObj?: InitDataParamsType["filterObj"];
  }>([innerParams, outerParams]);

  if (mergedParams.curPage) {
    tablePage.value.curPage = mergedParams.curPage;
  }

  if (mergedParams.pageSize) {
    tablePage.value.pageSize = mergedParams.pageSize;
  }
  return mergedParams;
};

const initData = async (params?: InitDataParamsType) => {
  const mergedParams = mergeParams(params);

  loading.value = true;

  try {
    const res = await getList(mergedParams);

    tableData.value = res.data;
    tablePage.value.total = res.total;
  } catch (error) {
  } finally {
    mergedParams.filterObj && (filterObj.value = mergedParams.filterObj);
    loading.value = false;
  }
};

// 多选
const multipleSection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSection.value = val;
};

// 操作

const emits = defineEmits<Emits>();
const handleEdit = (index: number, row: User) => {
  emits("edit", toRaw(row));
};
const handleDelete = (index: number, row: User) => {
  emits("delete", toRaw(row));
};

onMounted(() => {
  initData();
});

defineExpose({
  reload: (params?: InitDataParamsType) => initData(params),
  multipleSection,
  tablePage,
});
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

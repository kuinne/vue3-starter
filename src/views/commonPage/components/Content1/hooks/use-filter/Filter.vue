<template>
  <el-input
    v-model="filterObj.name"
    placeholder="请输入关键词"
    :suffix-icon="Search"
    style="width: 200px"
    clearable
    @change="handleChange('name', $event)"
  />
  <el-select v-model="filterObj.sex" @change="handleChange('sex', $event)">
    <el-option value="all" label="全部"></el-option>
    <el-option value="女" label="女"></el-option>
    <el-option value="男" label="男"></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ElInput, ElSelect, ElOption } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import type { FilterObj } from "./type";
import type { Props, Emits } from "./type";

const filterObj = ref<FilterObj>({
  name: "",
  sex: "all",
});

const emits = defineEmits<Emits>();

const handleChange = (key: keyof FilterObj, val: any) => {
  filterObj.value[key] = val;
  emits("change", {
    ...filterObj.value,
    sex: filterObj.value.sex == "all" ? undefined : filterObj.value.sex,
  });
};
</script>

<style></style>

<template>
  <div class="container">
    <el-tabs v-model="activeKey" @tab-change="handleTabChange">
      <tab-panes />
    </el-tabs>
  </div>
</template>

<script setup lang="tsx">
import { ElTabs, ElTabPane, TabPaneName } from "element-plus";
import { computed, ref } from "vue";
import type { Props, Emits } from "./type";

const props = defineProps<Props>();
const options = computed(() => [
  {
    key: "1",
    name: "标签1",
    tabPaneRender: props.tabPaneRender1,
  },
  {
    key: "2",
    name: "标签2",
    tabPaneRender: props.tabPaneRender2,
  },
]);

const activeKey = ref(options.value[0].key);

const emits = defineEmits<Emits>();

const handleTabChange = (name: TabPaneName) => {
  emits("tabChange", name);
};

const TabPanes = () =>
  options.value.map((item) => (
    <ElTabPane label={item.name} name={item.key}>
      {item.tabPaneRender()}
    </ElTabPane>
  ));
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  margin: 0 0 20px 0;
  padding: 10px;
  box-sizing: border-box;
}
</style>

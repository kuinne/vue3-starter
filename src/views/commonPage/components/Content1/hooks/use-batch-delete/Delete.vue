<template>
  <el-dialog v-model="visible" @close="handleCancel">
    <div v-loading="loading">
      <el-result
        v-if="multipleSelection"
        icon="warning"
        title="批量删除提示"
        :sub-title="subTitle"
      >
      </el-result>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { ElDialog, ElResult } from "element-plus";
import type { Props, Emits } from "./type";
import { batchDelete } from "../../mock";

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  multipleSelection: [] as any,
});

const { visible, multipleSelection } = toRefs(props);

const subTitle = computed(() =>
  multipleSelection.value
    .map((formData) => `是否删除${formData?.name}用户`)
    .join("\n")
);

const emits = defineEmits<Emits>();

const loading = ref(false);
const handleConfirm = async () => {
  if (multipleSelection.value.length === 0) return;
  loading.value = true;
  try {
    await batchDelete(multipleSelection.value.map((item) => item.id));
    emits("close");
    emits("confirm");
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
const handleCancel = () => {
  emits("close");
};
</script>

<style></style>

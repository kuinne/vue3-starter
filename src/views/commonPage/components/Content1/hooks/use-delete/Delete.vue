<template>
  <el-dialog v-model="visible" @close="handleCancel">
    <div v-loading="loading">
      <el-result
        v-if="formData"
        icon="warning"
        title="删除提示"
        :sub-title="subTitle"
      >
      </el-result>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { ElDialog, ElResult } from "element-plus";
import type { Props, Emits } from "./type";
import { deleteItem } from "../../mock";

const props = defineProps<Props>();
const visible = ref(false);
const formData = ref<Props["formData"]>(null);
const subTitle = computed(() => `是否删除${formData.value?.name}用户`);

const emits = defineEmits<Emits>();

const loading = ref(false);
const handleConfirm = async () => {
  loading.value = true;
  try {
    await deleteItem(formData.value!.id);
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
watchEffect(() => {
  visible.value = props.visible;
  formData.value = props.formData;
});
</script>

<style></style>

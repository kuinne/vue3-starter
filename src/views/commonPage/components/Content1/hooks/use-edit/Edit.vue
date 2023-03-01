<template>
  <el-dialog title="编辑" v-model="visible" @close="handleClose">
    <el-form v-if="formData" :model="formData!">
      <el-form-item prop="date" label="日期">
        <el-date-picker
          v-model="formData!.date"
          type="date"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input v-model="formData!.name"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="地址">
        <el-input v-model="formData!.address" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElDatePicker,
  ElInput,
  ElButton,
} from "element-plus";
import type { Props, Emits } from "./type";
import { ref, toRaw, unref, watchEffect } from "vue";
import { updateItem } from "../../mock";

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const visible = ref(false);
const formData = ref<Props["formData"] | null>(null);

const handleClose = () => {
  emits("close");
};

const handleCancel = () => {
  emits("close");
};

const handleSubmit = async () => {
  if (formData.value) {
    try {
      await updateItem(props.formData?.id as number, toRaw(formData.value)!);
      emits("close");
      emits("submit");
    } catch (error) {}
  }
};

const formatFormData = (data: any): Props["formData"] => ({
  ...data,
});

watchEffect(() => {
  visible.value = props.visible;
  formData.value = formatFormData(JSON.parse(JSON.stringify(props.formData)));
});
</script>

<style></style>

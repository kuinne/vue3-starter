<template>
  <el-dialog v-model="visible" @close="handleCancel">
    <div v-loading="loading">
      <el-form :model="formData">
        <el-form-item prop="date" label="日期">
          <el-date-picker
            v-model="formData.date"
            type="date"
            value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="地址">
          <el-input v-model="formData.address" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRaw, watchEffect } from "vue";
import { ElDialog } from "element-plus";
import type { Props, Emits } from "./type";
import type { User } from "../../type";
import { addItem } from "../../mock";

const props = defineProps<Props>();
const visible = ref(false);

const getInitFormData = () => ({
  name: "",
  address: "",
  date: new Date().toDateString(),
});
const formData = ref<Omit<User, "id">>(getInitFormData());

const emits = defineEmits<Emits>();
const loading = ref(false);

const resetData = () => {
  formData.value = getInitFormData();
};
const handleSubmit = async () => {
  loading.value = true;
  try {
    await addItem(toRaw(formData.value));
    emits("close");
    emits("submit");
    resetData();
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
});
</script>

<style></style>

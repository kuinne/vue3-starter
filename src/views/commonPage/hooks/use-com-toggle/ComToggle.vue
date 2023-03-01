<template>
  <keep-alive>
    <component :is="curComp"></component>
  </keep-alive>
</template>

<script setup lang="ts">
import {
  computed,
  defineComponent,
  onActivated,
  reactive,
  ref,
  defineProps,
} from "vue";

type Props = {
  activeKey: string | number;
  comps: {
    key: string;
    onActivated: () => void;
    render: () => JSX.Element;
  }[];
};

const props = defineProps<Props>();

const Comps = props.comps.map((item) => ({
  key: item.key,
  Comp: defineComponent({
    setup() {
      onActivated(() => {
        item.onActivated();
      });
      return item.render;
    },
  }),
}));

const curComp = computed(
  () => Comps.find((item) => item.key === props.activeKey)?.Comp
);
</script>

<style></style>

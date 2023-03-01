import { defineAsyncComponent, ref } from "vue";
import { ElButton, ElButtonGroup } from "element-plus";
export function useContainer() {
  const ContainerSFC = defineAsyncComponent(() => import("./Container.vue"));

  const containerRef = ref<InstanceType<typeof ContainerSFC>>();

  const Container = () => <ContainerSFC ref={containerRef}></ContainerSFC>;

  const TabPaneContent = () => (
    <ElButtonGroup style={{ display: "flex", gap: "10px" }}>
      <ElButton type="primary" onClick={containerRef.value?.openAdd}>
        新增
      </ElButton>
      <ElButton onClick={containerRef.value?.openBatchDelete}>
        批量删除
      </ElButton>
    </ElButtonGroup>
  );

  return {
    Container,
    reload: () => containerRef.value?.reload(),
    TabPaneContent,
  };
}

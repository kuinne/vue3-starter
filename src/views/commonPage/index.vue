<template>
  <div class="container">
    <Tab />
    <ComToggle />
  </div>
</template>

<script setup lang="tsx">
import { useTab } from "./hooks/use-tab";
import { useContainer } from "./components/Content1/hooks/use-container";
import { useComToggle } from "./hooks/use-com-toggle";

const { Tab, activeKey } = useTab({
  tabPaneRender1: () => <TabPaneContent1 />,
  tabPaneRender2: () => <div>内容2</div>,
});

const { Container: Container1, TabPaneContent: TabPaneContent1 } =
  useContainer();

const tabContents = [
  {
    key: "1",
    onActivated: () => {
      console.log("zzz");
    },
    render: () => <Container1 />,
  },
  {
    key: "2",
    onActivated: () => {
      console.log("333");
    },
    render: () => <div>{new Date().getTime()}</div>,
  },
];

const { ComToggle } = useComToggle({
  activeKey,
  comps: tabContents,
});
</script>

<style></style>

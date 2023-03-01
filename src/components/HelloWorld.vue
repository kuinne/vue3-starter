<script setup lang="ts">
import MyModal from './MyModal'
import MyModalFC from './MyModalFC'
import { myInjectionKey} from './keys'
import { computed, provide, reactive, ref, useCssModule } from 'vue';
import ConfigProvider, {ConfigType} from './ConfigProvider'
defineProps<{ msg: string }>();
const msg = ref('我是父组件的依赖')
provide(myInjectionKey, {
  msg
})
const changeMsg = () => {
  msg.value = '我是父组件的依赖111'
}
const globalCss = useCssModule('global')
console.log('globalCss', globalCss.base)
const provideConfig = reactive<ConfigType>({theme: 'dark', lang: 'en'})
const changeTheme = () => {
  provideConfig.theme = 'light'
}
</script>

<template>
  <ConfigProvider :config="provideConfig">
    <div>hll</div>
  <MyModal />
  <MyModalFC msg="hellofc">我是插槽</MyModalFC>
  <button @click="changeMsg">changMsg</button>
  <p :class="$style['read-the-docs']">module css</p>
  <p :class="global.base">global css</p>
  <button :class="$style.otherClassName">ssss</button>
  <button @click="changeTheme">chang config theme</button>
  </ConfigProvider>
</template>

<style scoped module>
.read-the-docs {
  color: #888;
}
:global(.read-the-docs){
  color: yellow
}

.className {
  color: green;
  background: red;
}

.otherClassName {
  composes: className;
  color: yellow;
}
</style>
<style module="global">
.base {
  color: red
}
</style>

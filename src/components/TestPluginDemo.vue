<template>
        <div>Test Plugin Demo11: {{ msg }}</div>
        <button @click="sendMsg">send ws msg</button>
</template>
    
<script setup lang='ts'>
import { msg } from 'virtual:my-module'


if (import.meta.hot) {
  import.meta.hot.on('my:ack', (data) => {
    console.log(data)
  })
}

const sendMsg = () => {
    console.log(import.meta.hot)
    if (import.meta.hot) {
  import.meta.hot.send('my:from-client', { msg: 'Hey!' })
}
}
</script>
    
<style>
    
</style>
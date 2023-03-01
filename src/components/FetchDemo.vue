<script setup lang='ts'>
import { useFetch } from '@/hooks/useFetch';
import { computed, ref } from 'vue';
import type { Props } from './type'
const props = defineProps<Props>()

    const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
    const id = ref(1)
    const url = computed(() => baseUrl + id.value)

     const { data, error, retry } = useFetch(url)
</script>
    
<template>
        Load Post id:
        <button v-for="(item, index) in 5" :key="index" @click="id = item">{{ item }}</button>
        <div v-if="error">
            <p>Oops! Error encountered: {{ error.message }}</p>
            <button @click="retry">Retry</button>
        </div>
        <div v-else-if="data">Data Loaded: <pre>{{ data }}</pre></div>
        <div v-else>Loading...</div>
        <p>{{ props.foo}}</p>
</template>
<script>
import {onMounted, ref} from 'vue'

onMounted(() => {
    console.log('1234')
})

const counter = ref(123)
</script>

<template>
    <div>{{ counter }}</div>
</template>

<style></style>
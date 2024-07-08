<script setup>
import { onMounted, ref } from 'vue'

onMounted(() => {
    console.log('1234')
})

const counter = ref(231)
</script>

<template>
  <div class="test" @click="() => counter++">{{ counter }}</div>
</template>

<style scoped lang="scss">
body {
  .test {
    background: yellow; 
  } 
}
</style>
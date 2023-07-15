<template>
<div class='device-controller'>
  {{ props.name }}
</div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>

</style>
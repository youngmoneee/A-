<template>
<div class='device-controller'>
  {{ props.name }}
</div>
</template>

<script setup lang='ts'>
import { defineProps, onUnmounted, watch } from 'vue';
import { useCensorData } from '@/store/censor';
const { deviceSubscribe, deviceUnSubscribe, data } = useCensorData();
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

watch(
  () => props.name,
  (newName, oldName) => {
    if (oldName) deviceUnSubscribe(oldName);
    deviceSubscribe(newName);
  },
  { immediate: true }
);

onUnmounted(() => {
  if (props.name) {
    deviceUnSubscribe(props.name);
  }
});

</script>

<style scoped>

</style>
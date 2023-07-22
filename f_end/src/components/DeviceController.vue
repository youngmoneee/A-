<template>
<div class='device-controller'>
  {{ props.name }}
  <div v-for='(topic) in sensorData?.sensorData?.keys()' :key='topic'>
    <SensorChart :topic='topic' style='width: 1000px; height: 200px;'/>
  </div>
</div>
</template>

<script setup lang='ts'>
import { defineProps, onUnmounted, watch } from 'vue';
import SensorChart from '@/components/sensor/SensorChart.vue';
import { useSensorData } from '@/store/sensor';

const sensorData = useSensorData();
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

watch(
  () => props.name,
  (newName, oldName) => {
    if (oldName) sensorData.deviceUnSubscribe(oldName);
    sensorData.deviceSubscribe(newName);
  },
  { immediate: true },
);

onUnmounted(() => {
  if (props.name) sensorData.deviceUnSubscribe(props.name);
});

</script>

<style scoped>

</style>
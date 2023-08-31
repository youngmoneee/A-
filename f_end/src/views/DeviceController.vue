<template>
  <div class='device-controller'>
    <div class='title'>{{ props.name }}</div>
    <div class='chart-container'>
      <div v-for='(topic) in sensorData.keys()' :key='topic' class='chart'>
        <SensorChart :topic='topic' class='SensorChart'/>
      </div>
    </div>
    <div class='button-container'>
      <DeviceButton command='on' :target="'/api/mqtt/device/' + props.name" />
      <DeviceButton command='off' :target="'/api/mqtt/device/' + props.name" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, onUnmounted, watch } from 'vue';
import SensorChart from '@/components/sensor/SensorChart.vue';
import { useSensorData } from '@/store/sensor';
import DeviceButton from '@/components/sensor/DeviceButton.vue';

const { sensorData, deviceSubscribe, deviceUnSubscribe } = useSensorData();
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
    if (newName) deviceSubscribe(newName);
  },
  { immediate: true },
);
onUnmounted(() => {
  deviceUnSubscribe(props.name);
})

</script>

<style scoped>
.device-controller {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
}
.title {
  font-weight: bold;
  position: absolute;
  top: 20px;
  left: 20px;
}
.chart-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
}
.button-container {
  position: absolute;
  right: 20px;
  bottom: 0;
}
.chart {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
}
.SensorChart {
  display: flex;
  box-sizing: border-box;
  margin: 0;
}
</style>

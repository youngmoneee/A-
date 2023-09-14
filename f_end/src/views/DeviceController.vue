<template>
  <div class='device-controller'>
    <div class='title'>{{ props.name }}</div>
    <div class='chart-container'>
      <div v-for='(topic) in sensorData.keys()' :key='topic' class='chart'>
        <SensorChart :topic='topic'/>
      </div>
    </div>
    <div class='button-container'>
      <DeviceButton command='on' :target="'/api/device/' + props.name" />
      <DeviceButton command='off' :target="'/api/device/' + props.name" />
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
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}
.title {
  font-weight: bold;
  text-align: left;
  margin: 5px 10px;
}
.chart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
}
.button-container {
  text-align: right;
  margin: 5px 10px;
}
.chart {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>

<template>
  <div>
    <canvas ref="chart"/>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useSensorData } from '@/store/sensor';

Chart.register(...registerables);
const sensorData = useSensorData();
const props = defineProps({
  topic: {
    type: String,
    required: true,
  }
})

const chart = ref(null);
let chartInstance: any = null;

onMounted(() => {
  const context = chart.value?.getContext('2d');
  chartInstance = new Chart(context, {
    type: 'line',
    data: {
      labels: sensorData.getLabel(props.topic) || [],
      datasets: [
        {
          label: props.topic,
          backgroundColor: '#f87979',
          data: sensorData.sensorData?.get(props.topic) || [],
          fill: false,
          tension: 0.1,
        }
      ]
    },
  });
});
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
watch(() => sensorData.getAllData().get(props.topic) as number[], (newData : number[]) => {
  if (chartInstance) {
    chartInstance.data.labels = sensorData.getLabel(props.topic);
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
}, {deep: true})

</script>
<style scoped>

</style>
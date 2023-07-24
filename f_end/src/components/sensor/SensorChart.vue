<template>
  <canvas ref="chart"/>
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

//  TODO : REMOVE
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
    chartInstance.update('none');
  }
};


onMounted(() => {
  const context = chart.value?.getContext('2d');
  chartInstance = new Chart(context, {
    type: 'line',
    data: {
      labels: sensorData.getLabel(props.topic) || [],
      datasets: [
        {
          label: props.topic?.split('/').slice(1).join('/'),
          backgroundColor: '#f87979',
          data: sensorData.sensorData?.get(props.topic) || [],
          fill: false,
          tension: 0.1,
        }
      ]
    },
  });
  //  TODO : REMOVE
  window.addEventListener('resize', resizeChart);
});
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  //  TODO : REMOVE
  window.removeEventListener('resize', resizeChart);
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
canvas {
  display: flex;
  width: 100%;
  height: 50%;
}
</style>
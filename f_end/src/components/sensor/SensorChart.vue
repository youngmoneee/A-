<template>
  <canvas ref="chart"/>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useSensorData } from '@/store/sensor';
import { storeToRefs } from 'pinia';

Chart.register(...registerables);
const { sensorData } = storeToRefs(useSensorData());
const { getLabel } = useSensorData();
const props = defineProps({
  topic: {
    type: String,
    required: true,
  }
});

const chart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  const context = chart.value?.getContext('2d') as CanvasRenderingContext2D;
  chartInstance = new Chart(context, {
    type: 'line',
    data: {
      labels: getLabel(props.topic) || [],
      datasets: [
        {
          label: props.topic?.split('/').slice(1).join('/'),
          backgroundColor: '#f87979',
          data: sensorData.value.get(props.topic) || [],
          fill: false,
          tension: 0.1,
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
    }
  });
});
onUnmounted(() => {
  chartInstance?.destroy();
});
watch(() => sensorData.value?.get(props.topic) as Array<number>,
  (newData : Array<number>) => {
  if (chartInstance) {
    chartInstance.data.labels = getLabel(props.topic);
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
}, {deep: true})

</script>
<style scoped>

</style>
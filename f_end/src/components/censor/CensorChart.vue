<template>
  <canvas :id='topic' ref='chart' />
</template>

<script setup lang='ts'>
import { defineProps, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useCensorData } from '@/store/censor';

const censorData = useCensorData();
const props = defineProps({
  topic: {
    type: String,
    required: true,
  }
})
Chart.register(...registerables);
const chart = ref(null);
let chartInstance = null;

onMounted(() => {
  const ctx = document.getElementById(props.topic).getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: censorData.getAllData().get(props.topic).map((_, idx) => idx - datas?.length + 1 + ' s'),
      datasets: [
        {
          label: props.topic,
          data: censorData.getAllData().get(props.topic),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(255, 255, 255)',
          tension: 1,
        }
      ]
    }
  })
});

watch(() => censorData.getAllData().get(props.topic), (newData) => {
  if (chartInstance) {
    chartInstance.data.labels = newData.map((_, idx) => idx - newData.length + 1 + ' s');
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
}, {deep: true})
</script>

<style scoped>

</style>

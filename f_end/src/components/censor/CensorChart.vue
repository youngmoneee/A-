<template>
  <canvas :id='label' ref='chart' />
</template>

<script setup lang='ts'>
import { defineProps, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }, label: {
    type: String,
    required: true,
  }
})
Chart.register(...registerables);
const chart = ref(null);
let chartInstance = null;

onMounted(() => {
  console.log(props.data);
  const ctx = document.getElementById(props.label).getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((_, idx) => idx - props.data?.length + 1 + ' s'),
      datasets: [
        {
          label: props.label,
          data: props.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(255, 255, 255)',
          tension: 1,
        }
      ]
    }
  })
});

watch(() => props.data, (newData) => {
  if (chartInstance) {
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
}, {deep: true})
</script>

<style scoped>

</style>
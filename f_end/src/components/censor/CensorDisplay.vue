<template>
  <div class='censor-display' @click='click'>
    <div v-for='(key) in censorData.censorData.keys()' :key='key' class='charts'>
      <CensorChart :data='censorData.censorData.get(key)' :label='key' />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCensorData } from '@/store/censor';
import CensorChart from '@/components/censor/CensorChart.vue';

const censorData = useCensorData();

onMounted(async () => {
  await censorData.setAllTopic();
  for (let i = 0; i < 20; ++i) censorData.updateTopic('/test/topic', i);
  for (let i = 20; i != 0; --i) censorData.updateTopic('/test/topic2', i);
  for (let i = 20; i != 0; --i) censorData.updateTopic('/test/topic3', i);
});
const click = () => {
  censorData.updateTopic('/test/topic2', 3);
}
</script>

<style scoped>
.censor-display {
  height: 100%;
  background: lightgray;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  grid-auto-rows: minmax(50%, 1fr);
}
.charts {
}
</style>
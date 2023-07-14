<template>
  <div class='censor-display'>
    <div v-for='(topic) in censorData.censorData.keys()' :key='topic' class='charts'>
      <CensorChart :topic='topic' />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCensorData } from '@/store/censor';
import CensorChart from '@/components/censor/CensorChart.vue';
import { useSocketStore } from '@/store/socket';

const censorData = useCensorData();
const socket = useSocketStore();

onMounted(async () => {
  await censorData.setAllTopic();
  const sock = socket.getSock();
  for (const topic of censorData.getAllData().keys()) {
    sock.on(topic, (data) => {
      censorData.updateTopic(topic, data);
    });
  }
});
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
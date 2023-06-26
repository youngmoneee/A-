<template>
  <div class='censor-display'>
    <div v-for='(topic) in censorData.censorData.keys()' :key='topic' class='charts'>
      <CensorChart :topic='topic' />
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import { useCensorData } from '@/store/censor';
import CensorChart from '@/components/censor/CensorChart.vue';

const censorData = useCensorData();
const socket = inject('socket');

onMounted(async () => {
  //  1. 센서 데이터 표시 창이 렌더링 되면서 BE 서버에 등록된 Topic을 받아옴
  await censorData.setAllTopic();

  //  2. Mosquitto와 같은 Topic으로 Ws 이벤트를 listen함
  for (const topic of censorData.getAllData().keys()) {
    socket.on(topic, (data) => {
      //  3. Topic에 대해 data가 보내지면 업데이트
      censorData.updateTopic(topic, data);
    })
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
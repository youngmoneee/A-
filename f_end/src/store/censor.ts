import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useSocketStore } from '@/store/socket';

export const useCensorData = defineStore('censor', () => {
  /**
   * @key : topic
   * @value : data
   */
  const sensorData = ref(new Map() as Map<string, Array<number>>);
  const dataLength = 20;
  const data = computed((topic) => {
    return sensorData.value.get(topic);
  });

  function deviceSubscribe(device: string) {
    const { socket } = useSocketStore();
    sensorData.value.clear();

    console.log(`subscribe ${device}`);
    socket.on(device, (data) => {
      topicSub(data.topic);
      dataAppend(data.topic, data.value);
      console.log(sensorData.value);
    });
  }

  function deviceUnSubscribe(device: string) {
    const { socket } = useSocketStore();
    socket.off(device);
    sensorData.value.clear();
    console.log(`unsubscribe ${device}`);
  }
  function topicSub(topic: string) {
    if (sensorData.value.has(topic)) return;
    sensorData.value.set(topic, []);
  }

  function dataAppend(topic: string, value: number) {
    const newData: Array<number> = sensorData.value.get(topic)?.slice() || [];
    if (newData.length >= dataLength) newData.shift();
    newData.push(value);

    sensorData.value.set(topic, newData);
  }
  return { deviceSubscribe, deviceUnSubscribe, data };
});

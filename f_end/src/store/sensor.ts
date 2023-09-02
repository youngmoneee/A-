import { defineStore } from 'pinia';
import { useSocketStore } from '@/store/socket';
import { ref } from 'vue';

export const useSensorData = defineStore('sensor', () => {
  const sensorData = ref<Map<string, Array<number>>>(new Map());
  const dataLength = 20;
  function updateTopic(topic: string, data: number) {
    const newData: Array<number> = sensorData.value.get(topic)?.slice() || [];
    if (newData.length >= dataLength) newData.shift();
    newData.push(data);

    sensorData.value?.set(topic, newData);
  }
  function deviceSubscribe(device: string) {
    const { onEvent } = useSocketStore();
    onEvent(device, (obj: any) => updateTopic(obj.topic, obj.value));
  }
  function deviceUnSubscribe(device: string) {
    const { offEvent } = useSocketStore();
    offEvent(device);
    sensorData.value.clear();
  }
  function getLabel(topic: string) {
    const labels: Array<number> = sensorData.value.get(topic)?.slice() || [];
    return labels.map((_, idx) => (idx - labels.length + 1) * 5 + ' s');
  }
  return {
    sensorData,
    dataLength,
    deviceSubscribe,
    deviceUnSubscribe,
    getLabel,
  };
});

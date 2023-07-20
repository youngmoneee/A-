import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useSocketStore } from '@/store/socket';

export const useSensorData = defineStore('sensor', () => {
  /**
   * @key : topic
   * @value : data
   */
  const data = reactive({} as Record<string, number[]>);
  const dataLength = 20;

  function deviceSubscribe(device: string) {
    const { socket } = useSocketStore();

    console.log(`subscribe ${device}`);
    socket.on(device, (obj) => dataAppend(obj.topic, obj.value));
  }

  function deviceUnSubscribe(device: string) {
    const { socket } = useSocketStore();
    socket.off(device);
    for (const key in data) delete data[key];
    console.log(`unsubscribe ${device}`);
  }

  function dataAppend(topic: string, value: number) {
    const topicData = data[topic];
    if (topicData) {
      if (topicData.length >= dataLength) topicData.shift();
      topicData.push(value);
      data[topic] = topicData;
    } else data[topic] = [value];
  }
  return { deviceSubscribe, deviceUnSubscribe, data };
});

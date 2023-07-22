import { defineStore } from 'pinia';
import { useSocketStore } from '@/store/socket';

export const useSensorData = defineStore('sensor', {
  state: () => ({
    /**
     * @key : topic
     * @value : data
     */
    sensorData: new Map() as Map<string, Array<number>>,
    dataLength: 20,
  }),
  actions: {
    deviceSubscribe(device: string) {
      const { socket } = useSocketStore();

      console.log(`subscribe ${device}`);
      socket.on(device, (obj: any) => this.updateTopic(obj.topic, obj.value));
    },
    deviceUnSubscribe(device: string) {
      const { socket } = useSocketStore();

      console.log(`unsubscribe ${device}`);
      socket.off(device);
      this.sensorData.clear();
    },
    updateTopic(topic: string, data: number) {
      const newData: Array<number> = this.sensorData.get(topic)?.slice() || [];
      if (newData.length >= this.dataLength) newData.shift();
      newData.push(data);

      this.sensorData.set(topic, newData);
    },
    getAllData() {
      return this.sensorData;
    },
    getLabel(topic: string) {
      const labels: Array<number> = this.sensorData.get(topic)?.slice() || [];

      return labels.map((_, idx) => (
          idx - labels.length + 1) * 5 + ' s'
        );
    }
  },
});

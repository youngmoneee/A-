import { defineStore } from 'pinia';
import axios from 'axios';

export const useCensorData = defineStore('censor', {
  state: () => ({
    /**
     * @key : topic
     * @value : data
     */
    censorData: new Map() as Map<string, Array<string | number>>,
    dataLength: 20,
  }),
  actions: {
    addNewTopic(topic: string) {
      if (this.censorData.has(topic)) return;
      this.censorData.set(topic, []);
    },
    async setAllTopic() {
      try {
        const response = await axios.get('/api/mqtt/topic');
        response.data.forEach((topic: string) => {
          this.addNewTopic(topic);
        });
      } catch (e) {
        console.error(e);
      }
    },
    updateTopic(topic: string, data: string | number) {
      const newData: Array<string | number> =
        this.censorData.get(topic)?.slice() || [];
      if (newData.length >= this.dataLength) newData.shift();
      newData.push(data);

      this.censorData.set(topic, newData);
    },
    getAllData() {
      return this.censorData;
    },
  },
});

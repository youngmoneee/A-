import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttGateway } from './mqtt.gateway';

@Module({
  imports: [
    /*
    ClientsModule.register([
      {
        name: 'MqttClient', //  Mqtt 클라이언트 이름
        transport: Transport.MQTT, // enum, RMQ, Redis, gRpc, Kafka 등등
        options: {
          url: `mqtt:localhost:1883`, //  브로커 url
          //  protocolId: 프로토콜 id, 버전
          //  will : 클라이언트 비정상 종료 시 발행할 topic, payload, qos 등
        },
      },
    ]),
    */
  ],
  controllers: [MqttController],
  providers: [MqttService, MqttGateway],
})
export class MqttModule {}

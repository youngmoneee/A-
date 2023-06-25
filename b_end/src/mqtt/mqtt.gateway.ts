import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MqttGateway {
  @WebSocketServer()
  server: Server;

  publish(topic: string, data: string | number) {
    this.server.emit(topic, data);
  }
}

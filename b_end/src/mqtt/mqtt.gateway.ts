import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MqttGateway {
  @WebSocketServer()
  server: Server;

  publish(device: string, data: object) {
    this.server.emit(device, data);
  }
}

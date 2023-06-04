import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser } from '../user/user.decorator';
import { UserDto } from '../dto/user.dto';
import { CreateChatDto } from '../dto/createChatDto';

export enum eContent {
  TEXT,
  IMAGE,
}
interface IChat {
  userName?: string;
  userImg?: string;
  data: string;
  chatType: eContent;
}
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, @GetUser() user: UserDto) {
    const chat: IChat = {
      //  data: `Hi ${user.userName}`,
      data: 'hi',
      chatType: eContent.TEXT,
    };
    client.emit('chat', { chat });
  }

  publish(chatDto: CreateChatDto) {
    const chat: IChat = {
      userName: chatDto.user.userName,
      userImg: chatDto.user.userImage,
      data: chatDto.msg !== null ? chatDto.msg : chatDto.imgUrl,
      chatType: chatDto.msg !== null ? eContent.TEXT : eContent.IMAGE,
    };
    this.server.emit('chat', { chat });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('hello');
    return 'Hello world!';
  }
}

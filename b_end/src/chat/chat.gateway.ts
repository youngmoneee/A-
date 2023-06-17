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
import { Chat } from '../entity/chat.schema';

export enum eContent {
  TEXT,
  IMAGE,
}
export interface IChat {
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

  publish(chat: Chat) {
    const newChat: IChat = {
      userName: chat.user?.userName,
      userImg: chat.user?.userImage,
      data: chat.msg === null ? chat.imgUrl : chat.msg,
      chatType: chat.msg === null ? eContent.IMAGE : eContent.TEXT,
    };
    this.server.emit('chat', { newChat });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('hello');
    return 'Hello world!';
  }
}

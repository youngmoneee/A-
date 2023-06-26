import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser } from '../user/user.decorator';
import { UserDto } from '../dto/user.dto';
import { Chat, IChat } from '../dto/createChatDto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'localhost',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  handleConnection(client: Socket, @GetUser() user: UserDto) {
    const msg = `Hi ${user?.userName}`;
    client.emit('hello', msg);
  }

  publish(chatSchema: Chat) {
    const chat: IChat = {
      userName: chatSchema.user.userName,
      userImg: chatSchema.user.userImage,
      fileUrl: chatSchema.fileUrl,
      msg: chatSchema.msg,
    };
    this.logger.debug(`Called ${this.publish.name}`);
    this.server.emit('chat', chat);
  }
}

import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat, IChat } from '../dto/createChatDto';
import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDetailDto } from '../dto/userDetail.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@WebSocketGateway({
  cors: {
    origin: 'localhost',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  handleConnection(client: Socket) {
    const token = client.handshake.query?.token as string;
    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
    } catch (e) {
      client.disconnect();
      throw new WsException('UnAuthorization');
    }
  }

  async publish(chatSchema: Chat) {
    const userDetail: UserDetailDto = await this.userService.getUserDetailById(
      chatSchema.user.id,
    );
    const chat: IChat = {
      userName: userDetail.userName,
      userImg: userDetail.userImage,
      fileUrl: chatSchema.fileUrl,
      msg: chatSchema.msg,
    };
    this.logger.debug(`Called ${this.publish.name}`);
    this.server.emit('chat', chat);
  }
}

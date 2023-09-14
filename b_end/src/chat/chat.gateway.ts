import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat, IChat } from '../dto/createChatDto';
import { Inject } from '@nestjs/common';
import { UserDetailDto } from '../dto/userDetail.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '../user/repository/interface';
@WebSocketGateway({
  cors: {
    origin: 'localhost',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject('Repository') private readonly repository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}
  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token as string;
    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
    } catch (e) {
      client.disconnect();
    }
  }

  async publish(chatSchema: Chat) {
    //  TODO: Redis로 유저명, 유저 이미지 캐싱하여 최적화 가능
    const userDetail: UserDetailDto = await this.repository.findUserDetailById(
      chatSchema.user.id,
    );
    const chat: IChat = {
      userName: userDetail.userName,
      userImg: userDetail.userImage,
      fileUrl: chatSchema.fileUrl,
      msg: chatSchema.msg,
    };
    this.server.emit('chat', chat);
  }
}

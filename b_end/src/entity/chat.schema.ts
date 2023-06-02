import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ collection: 'Chattings' })
export class Chat {
  @Prop()
  user: UserDto;

  @Prop()
  msg?: string;

  @Prop()
  imgUrl?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

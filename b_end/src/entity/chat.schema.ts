import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ collection: 'Chattings' })
export class Chat {
  @Prop()
  user: string;

  @Prop()
  msg?: string;

  @Prop()
  imgUrl?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

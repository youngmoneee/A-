import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  user: UserDto;

  @Prop()
  msg?: string;

  @Prop()
  img?: Express.Multer.File;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

import { IsDataURI, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export interface IChat {
  userName: string;
  userImg: string;
  fileUrl?: string;
  msg?: string;
}
export class CreateChatDto {
  @IsNotEmpty()
  user: UserDto;

  @IsString()
  @IsOptional()
  @IsDataURI()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  msg?: string;
}

export type ChatDocument = Chat & Document;

@Schema({ collection: 'Chattings' })
export class Chat {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Object })
  user: UserDto;

  @Prop({ type: String, required: false })
  msg?: string;

  @Prop({ type: String, required: false })
  fileUrl?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

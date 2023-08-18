import { IsDataURI, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ type: Object })
  user: UserDto;

  @ApiProperty()
  @Prop({ type: String, required: false })
  msg?: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  fileUrl?: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

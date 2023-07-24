import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

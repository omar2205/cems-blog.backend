import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  // @Prop()
  // author: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
class User {
  @Prop({ required: true, index: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ default: Date.now() })
  updatedAt: Date;
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<User>;

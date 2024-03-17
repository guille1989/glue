import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GlueDocument = HydratedDocument<Glue>;

@Schema()
export class Glue {
  @Prop()
  url: string;
  @Prop()
  title: string;
  @Prop()
  image: string;
  @Prop()
  text: string;
}

export const GlueSchema = SchemaFactory.createForClass(Glue);

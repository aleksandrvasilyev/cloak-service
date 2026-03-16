import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  isBot: boolean;

  @Prop({ type: [String], default: [] })
  reasons: string[];

  @Prop({ required: true })
  processingTimeMs: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);

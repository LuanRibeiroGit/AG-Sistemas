import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'


export type CtaDocument = Cta & Document

@Schema({ timestamps: true })
export class Cta {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    company: string

    @Prop({ required: true })
    intention: string
}

export const CtaSchema = SchemaFactory.createForClass(Cta)
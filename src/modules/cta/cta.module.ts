import { Module } from '@nestjs/common';
import { CtaService } from './cta.service';
import { CtaController } from './cta.controller';
import { Cta, CtaSchema } from './schema/cta.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: Cta.name, schema: CtaSchema }]),
    ],
  controllers: [CtaController],
  providers: [CtaService],
})
export class CtaModule {}

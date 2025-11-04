import { Module } from '@nestjs/common';
import { CtaService } from './cta.service';
import { CtaController } from './cta.controller';
import { Cta, CtaSchema } from './schema/cta.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: Cta.name, schema: CtaSchema }]),
        AuthModule
    ],
  controllers: [CtaController],
  providers: [CtaService],
})
export class CtaModule {}

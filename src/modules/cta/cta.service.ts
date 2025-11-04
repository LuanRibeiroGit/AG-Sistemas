import { Injectable, ConflictException } from '@nestjs/common';
import { CreateCtaDto } from './dto/create-cta.dto';
import { UpdateCtaDto } from './dto/update-cta.dto';
import { Cta, CtaDocument } from './schema/cta.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CtaService {
    constructor (
        @InjectModel(Cta.name) private readonly ctaModel: Model<CtaDocument>
    ) {}

    async create(createCtaDto: CreateCtaDto) {
        try {
            return await new this.ctaModel(createCtaDto).save()
        } catch {
            throw new ConflictException(`The email '${createCtaDto.email}' is already in use`)
        }
    }

    findAll() {
        return `This action returns all cta`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cta`;
    }

    update(id: number, updateCtaDto: UpdateCtaDto) {
        return `This action updates a #${id} cta`;
    }

    remove(id: number) {
        return `This action removes a #${id} cta`;
    }
}

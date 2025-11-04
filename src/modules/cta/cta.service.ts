import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCtaDto } from './dto/create-cta.dto';
import { Cta, CtaDocument } from './schema/cta.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCtaDto } from './dto/update-cta.dto';

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

    async findAll() {
        return await this.ctaModel.find()
    }

    async findOne(_id: string) {
        try {
            const find = await this.ctaModel.findOne({_id}).exec()
            if(!find) throw new NotFoundException(`Cta with ID "${_id}" not found`)
            return find
        } catch {
            throw new NotFoundException(`Cta with ID "${_id}" not found`)
        }
    }

    async update(id: string, updateCtaDto: UpdateCtaDto) {
        try {
            const updatedCta = await this.ctaModel.findByIdAndUpdate(
                id,
                updateCtaDto,
                { new: true }
            ).exec()
            if (!updatedCta) throw new NotFoundException(`Cta with ID "${id}" not found`)
            return updatedCta
        } catch {
            throw new NotFoundException(`Cta with ID "${id}" not found`)
        }
    }

    async remove(id: string) {
        try {
            await this.ctaModel.findByIdAndDelete(id)
        } catch {
            throw new NotFoundException(`Cta with ID "${id}" not found`)
        }
    }
}

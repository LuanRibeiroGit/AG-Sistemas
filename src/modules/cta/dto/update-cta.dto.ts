import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCtaDto } from './create-cta.dto';
import { IsString } from 'class-validator';

class CreateCtaDtoWithout extends OmitType(CreateCtaDto, [
    'name',
    'email',
    'intention'
] as const) {}

export class UpdateCtaDto extends PartialType(CreateCtaDtoWithout) {
    @IsString()
    status: string
}

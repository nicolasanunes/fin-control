import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDTO } from './CreateIncome.dto';

export class UpdateIncomeDTO extends PartialType(CreateIncomeDTO) {}

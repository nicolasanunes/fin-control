import { Injectable } from '@nestjs/common';
import { CreateIncomeDTO } from './dto/CreateIncome.dto';
// import { UpdateIncomeDTO } from './dto/UpdateIncome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeEntity } from './income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  createIncome(incomeData: CreateIncomeDTO) {
    const incomeEntity = new IncomeEntity();

    Object.assign(incomeEntity, incomeData as IncomeEntity);

    return this.incomeRepository.save(incomeEntity);
  }

  findAll() {
    return `This action returns all income`;
  }

  findOne(id: number) {
    return `This action returns a #${id} income`;
  }

  // update(id: number, updateIncomeDTO: UpdateIncomeDTO) {
  //   return `This action updates a #${id} income`;
  // }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}

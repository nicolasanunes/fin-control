import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncomeDTO } from './dto/CreateIncome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeEntity } from './income.entity';
import { ListIncomeDTO } from './dto/ListIncome.dto';
import { UpdateIncomeDTO } from './dto/UpdateIncome.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,
  ) {}

  private async checkDuplicatedIncome(
    subStringDateIncome: string,
    descriptionIncome: string,
  ) {
    const savedIncomes = await this.listIncome();
    let duplicatedIncome = false;

    for (let i = 0; i < savedIncomes.length; i++) {
      if (savedIncomes[i].date.substring(3, 5) === subStringDateIncome) {
        if (savedIncomes[i].description === descriptionIncome) {
          duplicatedIncome = true;
        }
      }
    }

    return duplicatedIncome;
  }

  async createIncome(incomeData: CreateIncomeDTO) {
    const income = new IncomeEntity();

    const subStringDateIncome = incomeData.date.substring(3, 5);
    const descriptionIncome = incomeData.description;

    const duplicatedIncome = await this.checkDuplicatedIncome(
      subStringDateIncome,
      descriptionIncome,
    );

    if (duplicatedIncome === false) {
      Object.assign(income, incomeData as IncomeEntity);
    } else {
      throw new Error('Esta receita já foi lançada esse mês!');
    }

    await this.incomeRepository.save(income);

    const createdIncome = new ListIncomeDTO(
      income.id,
      income.description,
      income.value,
      income.date,
    );

    return createdIncome;
  }

  async listIncome() {
    const savedIncomes = await this.incomeRepository.find();

    const listIncomes = savedIncomes.map(
      (income) =>
        new ListIncomeDTO(
          income.id,
          income.description,
          income.value,
          income.date,
        ),
    );

    return listIncomes;
  }

  async listDetalhedIncome(id: string) {
    const possibleIncome = await this.incomeRepository.findOneBy({ id });

    if (possibleIncome === null) {
      throw new NotFoundException('A receita não foi encontrada!');
    }

    const detalhedIncome = new ListIncomeDTO(
      possibleIncome.id,
      possibleIncome.description,
      possibleIncome.value,
      possibleIncome.date,
    );

    return detalhedIncome;
  }

  async updateIncome(id: string, newData: UpdateIncomeDTO) {
    const income = await this.incomeRepository.findOneBy({ id });

    if (income === null) {
      throw new NotFoundException('A receita não foi encontrada!');
    }

    const subStringDateIncome = newData.date.substring(3, 5);
    const descriptionIncome = newData.description;

    const duplicatedIncome = await this.checkDuplicatedIncome(
      subStringDateIncome,
      descriptionIncome,
    );

    if (duplicatedIncome === false) {
      Object.assign(income, newData as IncomeEntity);
    } else {
      throw new Error('Esta receita já foi lançada esse mês!');
    }

    await this.incomeRepository.save(income);

    const updatedIncome = new ListIncomeDTO(
      income.id,
      income.description,
      income.value,
      income.date,
    );

    return updatedIncome;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }
}

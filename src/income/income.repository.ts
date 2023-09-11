import { Injectable } from '@nestjs/common';
import { IncomeEntity } from './income.entity';

@Injectable()
export class IncomeRepository {
  private incomes: IncomeEntity[] = [];

  async save(income: IncomeEntity) {
    this.incomes.push(income);
  }
}

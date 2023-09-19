import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from 'src/expense/expense.entity';
import { IncomeEntity } from 'src/income/income.entity';
import { Like, Repository } from 'typeorm';
import { ListAmountSpentPerCategoryDTO } from './dto/ListAmountSpentPerCategory.dto';
import { ListSummaryDTO } from './dto/ListSummary.dto';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly incomeRepository: Repository<IncomeEntity>,

    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  private async totalIncome(year, month) {
    const savedIncomes = await this.incomeRepository.findBy({
      date: Like(`%${month}/${year}`),
    });

    let totalIncome = 0;

    for (let i = 0; i < savedIncomes.length; i++) {
      totalIncome += savedIncomes[i].value;
    }

    return totalIncome;
  }

  private async totalExpense(year, month) {
    const savedExpenses = await this.expenseRepository.findBy({
      date: Like(`%${month}/${year}`),
    });

    let totalExpense = 0;

    for (let i = 0; i < savedExpenses.length; i++) {
      totalExpense += savedExpenses[i].value;
    }

    return totalExpense;
  }

  private async finalBalance(year, month) {
    const finalBalance =
      (await this.totalIncome(year, month)) -
      (await this.totalExpense(year, month));
    return finalBalance;
  }

  private async amountSpentPerCategory(year, month) {
    const savedExpenses = await this.expenseRepository.findBy({
      date: Like(`%${month}/${year}`),
    });

    let alimentation = 0,
      health = 0,
      home = 0,
      transport = 0,
      education = 0,
      leisure = 0,
      unforeseenEvents = 0,
      others = 0;

    for (let i = 0; i < savedExpenses.length; i++) {
      if (savedExpenses[i].category === 'Alimentação') {
        alimentation += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Saúde') {
        health += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Moradia') {
        home += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Transporte') {
        transport += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Educação') {
        education += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Lazer') {
        leisure += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Imprevistos') {
        unforeseenEvents += savedExpenses[i].value;
      } else if (savedExpenses[i].category === 'Outras') {
        others += savedExpenses[i].value;
      }
    }

    const listAmountSpentPerCategory = new ListAmountSpentPerCategoryDTO(
      alimentation,
      health,
      home,
      transport,
      education,
      leisure,
      unforeseenEvents,
      others,
    );

    return listAmountSpentPerCategory;
  }

  async listSummary(year, month) {
    const totalIncome = await this.totalIncome(year, month);
    const totalExpense = await this.totalExpense(year, month);
    const finalBalance = await this.finalBalance(year, month);
    const amountSpentPerCategory = await this.amountSpentPerCategory(
      year,
      month,
    );

    const listSummary = new ListSummaryDTO(
      totalIncome,
      totalExpense,
      finalBalance,
      amountSpentPerCategory,
    );

    return listSummary;
  }
}

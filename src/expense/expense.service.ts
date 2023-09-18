import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDTO } from './dto/CreateExpense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { ListExpenseDTO } from './dto/ListExpense.dto';
import { UpdateExpenseDTO } from './dto/UpdateExpense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  private async checkDuplicatedExpense(
    subStringDateExpense: string,
    descriptionExpense: string,
  ) {
    const savedExpenses = await this.listExpense();
    let duplicatedExpense = false;

    for (let i = 0; i < savedExpenses.length; i++) {
      if (savedExpenses[i].date.substring(3, 5) === subStringDateExpense) {
        if (savedExpenses[i].description === descriptionExpense) {
          duplicatedExpense = true;
        }
      }
    }

    return duplicatedExpense;
  }

  async createExpense(expenseData: CreateExpenseDTO) {
    const expense = new ExpenseEntity();

    const subStringDateExpense = expenseData.date.substring(3, 5);
    const descriptionExpense = expenseData.description;

    const duplicatedExpense = await this.checkDuplicatedExpense(
      subStringDateExpense,
      descriptionExpense,
    );

    if (duplicatedExpense === false) {
      Object.assign(expense, expenseData as ExpenseEntity);
    } else {
      throw new Error('Esta despesa já foi lançada esse mês!');
    }

    await this.expenseRepository.save(expense);

    const createdExpense = new ListExpenseDTO(
      expense.id,
      expense.description,
      expense.value,
      expense.date,
      expense.category,
    );

    return createdExpense;
  }

  async listExpense() {
    const savedExpenses = await this.expenseRepository.find();

    const listExpenses = savedExpenses.map(
      (expense) =>
        new ListExpenseDTO(
          expense.id,
          expense.description,
          expense.value,
          expense.date,
          expense.category,
        ),
    );

    return listExpenses;
  }

  async listDetalhedExpense(id: string) {
    const possibleExpense = await this.expenseRepository.findOneBy({ id });

    if (possibleExpense === null) {
      throw new NotFoundException('A despesa não foi encontrada!');
    }

    const detalhedExpense = new ListExpenseDTO(
      possibleExpense.id,
      possibleExpense.description,
      possibleExpense.value,
      possibleExpense.date,
      possibleExpense.category,
    );

    return detalhedExpense;
  }

  async listExpenseByDescription(description: string) {
    const savedExpenses = await this.expenseRepository.findBy({
      description: Like(`%${description}%`),
    });

    if (savedExpenses.length === 0) {
      throw new NotFoundException('Nenhuma despesa foi encontrada!');
    }

    const expenseByDescription = savedExpenses.map(
      (expense) =>
        new ListExpenseDTO(
          expense.id,
          expense.description,
          expense.value,
          expense.date,
          expense.category,
        ),
    );

    return expenseByDescription;
  }

  async updateExpense(id: string, newData: UpdateExpenseDTO) {
    const expense = await this.expenseRepository.findOneBy({ id });

    if (expense === null) {
      throw new NotFoundException('A despesa não foi encontrada!');
    }

    const subStringDateExpense = newData.date.substring(3, 5);
    const descriptionExpense = newData.description;

    const duplicatedExpense = await this.checkDuplicatedExpense(
      subStringDateExpense,
      descriptionExpense,
    );

    if (duplicatedExpense === false) {
      Object.assign(expense, newData as ExpenseEntity);
    } else {
      throw new Error('Esta despesa já foi lançada esse mês!');
    }

    await this.expenseRepository.save(expense);

    const updatedExpense = new ListExpenseDTO(
      expense.id,
      expense.description,
      expense.value,
      expense.date,
      expense.category,
    );

    return updatedExpense;
  }

  async removeExpense(id: string) {
    const expense = await this.expenseRepository.findOneBy({ id });

    if (expense === null) {
      throw new NotFoundException('A despesa não foi encontrada!');
    }

    const deletedExpense = new ListExpenseDTO(
      expense.id,
      expense.description,
      expense.value,
      expense.date,
      expense.category,
    );

    await this.expenseRepository.delete(id);

    return deletedExpense;
  }
}

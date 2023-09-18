import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDTO } from './dto/CreateExpense.dto';
import { UpdateExpenseDTO } from './dto/UpdateExpense.dto';

@Controller('/expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  async createExpense(@Body() expenseData: CreateExpenseDTO) {
    const createdExpense = await this.expenseService.createExpense(expenseData);

    return {
      expense: createdExpense,
      message: 'Despesa criada com sucesso!',
    };
  }

  @Get()
  async listExpense(@Query('description') description: string) {
    if (description === undefined) {
      const savedExpenses = await this.expenseService.listExpense();
      return savedExpenses;
    } else {
      const listExpenseByDescription =
        await this.expenseService.listExpenseByDescription(description);
      return listExpenseByDescription;
    }
  }

  @Get('/:id')
  async listDetalhedExpense(@Param('id') id: string) {
    const detalhedExpense = await this.expenseService.listDetalhedExpense(id);
    return detalhedExpense;
  }

  @Get('/:year/:month')
  async listExpenseByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const expenseByMonth = await this.expenseService.listExpenseByMonth(
      year,
      month,
    );
    return expenseByMonth;
  }

  @Put('/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body() newData: UpdateExpenseDTO,
  ) {
    const updatedExpense = await this.expenseService.updateExpense(id, newData);

    return {
      expense: updatedExpense,
      message: 'Despesa atualizada com sucesso!',
    };
  }

  @Delete(':id')
  async removeExpense(@Param('id') id: string) {
    const removedExpense = await this.expenseService.removeExpense(id);

    return {
      expense: removedExpense,
      message: 'Despesa removida com sucesso!',
    };
  }
}

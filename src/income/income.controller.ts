import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDTO } from './dto/CreateIncome.dto';
import { UpdateIncomeDTO } from './dto/UpdateIncome.dto';

@Controller('/incomes')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  async createIncome(@Body() incomeData: CreateIncomeDTO) {
    const createdIncome = await this.incomeService.createIncome(incomeData);

    return {
      income: createdIncome,
      message: 'Receita criada com sucesso!',
    };
  }

  @Get()
  async listIncome() {
    const savedIncomes = await this.incomeService.listIncome();
    return savedIncomes;
  }

  @Get('/:id')
  async listDetalhedIncome(@Param('id') id: string) {
    const detalhedIncome = await this.incomeService.listDetalhedIncome(id);
    return detalhedIncome;
  }

  @Put('/:id')
  async updateIncome(
    @Param('id') id: string,
    @Body() newData: UpdateIncomeDTO,
  ) {
    const updatedIncome = await this.incomeService.updateIncome(id, newData);

    return {
      income: updatedIncome,
      message: 'Receita atualizada com sucesso!',
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
  //   return this.incomeService.update(+id, updateIncomeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incomeService.remove(+id);
  // }
}

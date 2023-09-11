import { Controller, Post, Body } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDTO } from './dto/CreateIncome.dto';
import { IncomeRepository } from './income.repository';
import { ListIncomeDTO } from './dto/ListIncome.dto';

@Controller('/incomes')
export class IncomeController {
  constructor(
    private incomeRepository: IncomeRepository,
    private incomeService: IncomeService,
  ) {}

  @Post()
  async createIncome(@Body() incomeData: CreateIncomeDTO) {
    const createdIncome = await this.incomeService.createIncome(incomeData);

    return {
      income: new ListIncomeDTO(createdIncome.id, createdIncome.description),
      message: 'Receita criada com sucesso!',
    };
  }

  // @Get()
  // findAll() {
  //   return this.incomeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.incomeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
  //   return this.incomeService.update(+id, updateIncomeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.incomeService.remove(+id);
  // }
}

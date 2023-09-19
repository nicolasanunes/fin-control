import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeEntity } from 'src/income/income.entity';
import { ExpenseEntity } from 'src/expense/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity, ExpenseEntity])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}

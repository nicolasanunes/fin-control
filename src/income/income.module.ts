import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeEntity } from './income.entity';
import { IncomeRepository } from './income.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity])],
  controllers: [IncomeController],
  providers: [IncomeService, IncomeRepository],
})
export class IncomeModule {}

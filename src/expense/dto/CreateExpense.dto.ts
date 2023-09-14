import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  IsOptional,
  IsIn,
} from '@nestjs/class-validator';

export class CreateExpenseDTO {
  @IsNotEmpty({ message: 'A descrição não pode ser vazia!' })
  @MaxLength(1000)
  description: string;

  @IsNotEmpty({ message: 'O valor não pode ser vazio!' })
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsNotEmpty({ message: 'A data não pode ser vazia!' })
  date: string;

  @IsOptional()
  @IsIn([
    'Alimentação',
    'Saúde',
    'Moradia',
    'Transporte',
    'Educação',
    'Lazer',
    'Imprevistos',
    'Outras',
  ])
  category: string;
}

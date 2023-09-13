import { IsNotEmpty, MaxLength, IsPositive, IsNumber } from 'class-validator';

export class UpdateExpenseDTO {
  @IsNotEmpty({ message: 'A descrição não pode ser vazia!' })
  @MaxLength(1000)
  description: string;

  @IsNotEmpty({ message: 'O valor não pode ser vazio!' })
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsNotEmpty({ message: 'A data não pode ser vazia!' })
  date: string;
}

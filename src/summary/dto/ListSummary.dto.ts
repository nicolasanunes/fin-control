import { ListAmountSpentPerCategoryDTO } from './ListAmountSpentPerCategory.dto';

export class ListSummaryDTO {
  constructor(
    readonly totalIncome: number,
    readonly totalExpense: number,
    readonly finalBalance: number,
    readonly amountSpentPerCategory: ListAmountSpentPerCategoryDTO,
  ) {}
}

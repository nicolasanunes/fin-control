export class ListIncomeDTO {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly value: number,
    readonly date: string,
  ) {}
}

export class ListAmountSpentPerCategoryDTO {
  constructor(
    readonly alimentation: number,
    readonly health: number,
    readonly home: number,
    readonly transport: number,
    readonly education: number,
    readonly leisure: number,
    readonly unforeseenEvents: number,
    readonly others: number,
  ) {}
}

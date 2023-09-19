import { Controller, Get, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('/summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @Get('/:year/:month')
  async listSummary(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const summary = await this.summaryService.listSummary(year, month);
    return summary;
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { TravelService } from '~/travel/travel.service';


@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService
  ) {}

  @Get('plan')
async getTravelPlan(
  @Query('destination') destination: string,
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
) {
  return this.travelService.getTravelPlan(destination, startDate, endDate);
}

  @Get('location/details')
  async getLocationDetails(@Query('destination') destination: string) {
    return this.travelService.getLocationDetails(destination);
  }
}

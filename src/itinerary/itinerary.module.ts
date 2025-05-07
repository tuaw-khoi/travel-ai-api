import { Module } from '@nestjs/common';
import { ItineraryController } from '~/itinerary/itinerary.controller';
import { ItineraryService } from '~/itinerary/itinerary.service';

@Module({
  controllers: [ItineraryController],
  providers: [ItineraryService],
    exports: [ItineraryService], 
})
export class ItineraryModule {}
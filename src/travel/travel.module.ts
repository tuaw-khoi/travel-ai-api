import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { LocationModule } from '~/location/location.module';
import { ItineraryModule } from '~/itinerary/itinerary.module';
import { TravelService } from './travel.service';
import { UnsplashModule } from '~/unsplash/unsplash.module';

@Module({
  imports:[LocationModule,ItineraryModule,UnsplashModule],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}

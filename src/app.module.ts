import { Module } from '@nestjs/common';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { LocationModule } from '~/location/location.module';
import { ItineraryModule } from '~/itinerary/itinerary.module';
import { TravelService } from '~/travel/travel.service';
import { TravelModule } from '~/travel/travel.module';
import { UnsplashModule } from '~/unsplash/unsplash.module';

@Module({
  imports: [LocationModule, ItineraryModule, TravelModule, UnsplashModule],
  controllers: [AppController],
  providers: [AppService, TravelService],
})
export class AppModule {}

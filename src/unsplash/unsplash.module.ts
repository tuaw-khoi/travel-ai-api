import { Module } from '@nestjs/common';
import { UnsplashController } from '~/unsplash/unsplash.controller';
import { UnsplashService } from '~/unsplash/unsplash.service';

@Module({
  controllers: [UnsplashController],
  providers: [UnsplashService],
  exports: [UnsplashService],
})
export class UnsplashModule {}

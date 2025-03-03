import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  @Get('search')
  async searchPhotos(@Query('query') query: string): Promise<string[]> {
    return this.unsplashService.searchPhotos(query);
  }
}

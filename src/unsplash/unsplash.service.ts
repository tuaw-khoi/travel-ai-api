import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { env } from '~/config/env.config';

@Injectable()
export class UnsplashService {
  private readonly accessKey = env.UNSPLASH_ACCESS_KEY;
  private readonly baseUrl = 'https://api.unsplash.com';

  async searchPhotos(
    query: string,
    perPage = 10,
    options?: {
      orientation?: 'landscape' | 'portrait' | 'squarish';
      color?: string;
      sort?: 'relevant' | 'latest' | 'popular';
    }
  ): Promise<string[]> {
    if (!this.accessKey || this.accessKey.startsWith('your_')) {
      throw new InternalServerErrorException('UNSPLASH_ACCESS_KEY chưa được cấu hình!');
    }

    try {
      const formattedQuery = query.trim().replace(/\s+/g, ',');
  
      const response = await axios.get(`${this.baseUrl}/search/photos`, {
        headers: { 
          Authorization: `Client-ID ${this.accessKey}`,
          'Accept-Version': 'v1'
        },
        params: {
          query: formattedQuery,
          per_page: perPage,
          orientation: options?.orientation,
          color: options?.color,
          order_by: options?.sort || 'popular', // Sắp xếp theo ảnh nổi bật
          content_filter: 'high'
        },
      });
  
      // Lọc ảnh có lượt thích cao (ví dụ: trên 100 likes)
      return response.data.results
        .filter(photo => photo.urls?.regular && photo.likes > 100)
        .map(photo => photo.urls.regular);
    } catch (error) {
      console.error('Unsplash API Error:', error.response?.data);
      throw new Error('Failed to fetch photos from Unsplash');
    }
  }
  

}

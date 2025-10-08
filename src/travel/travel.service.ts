import { Injectable } from '@nestjs/common';
import { ItineraryService } from '~/itinerary/itinerary.service';
import { LocationService } from '~/location/location.service';
import { UnsplashService } from '~/unsplash/unsplash.service';

@Injectable()
export class TravelService {
    constructor(
        private readonly locationService: LocationService,
        private readonly itineraryService: ItineraryService,
        private readonly unsplashService: UnsplashService,
    ) {}
    async getTravelPlan(destination: string, startDate?: string, endDate?: string) {
        if (!destination) {
            return { message: 'Vui lòng nhập địa điểm du lịch!' };
        }
        
    
        try {
            // Xác nhận địa điểm
            // const locationInformation = await this.locationService.validateLocation(destination);
            // if (!locationInformation) {
            //     return { message: 'Địa điểm không hợp lệ!' };
            // }

            
            // Tạo query tối ưu cho ảnh
            // const photoQuery = this.buildPhotoQuery(locationInformation);
            
            // Tạo options tìm kiếm dựa trên loại địa điểm
            // const searchOptions = this.getSearchOptions(locationInformation.type);
    
            // Gọi API Unsplash với các tham số đã tối ưu
            // const photos = await this.unsplashService.searchPhotos(
            //     photoQuery,
            //     5, // Lấy 12 ảnh để có nhiều lựa chọn
            //     searchOptions
            // );
    
            // Tạo lộ trình
            const itinerary = await this.itineraryService.generateItinerary({name:destination, startDate, endDate});
    
            return { 
                destination,
                itinerary,
            };
        } catch (error) {
            console.error('Lỗi trong quá trình tạo kế hoạch:', error);
            return {
                message: 'Có lỗi xảy ra khi tạo kế hoạch du lịch',
            };
        }
    }
    
    // Hàm hỗ trợ tạo query tìm kiếm
    private buildPhotoQuery(locationInfo: any): string {
        const baseQuery = [locationInfo.name];
    
        const typeKeywords = {
            beach: ['sunset', 'ocean', 'waves', 'paradise'],
            mountain: ['hiking', 'landscape', 'nature', 'sunrise'],
            city: ['nightlife', 'skyline', 'downtown', 'architecture']
        };
    
        if (locationInfo.type && typeKeywords[locationInfo.type]) {
            baseQuery.push(...typeKeywords[locationInfo.type]);
        }
    
        return baseQuery.join(',');
    }
    
    // Hàm hỗ trợ tạo search options
    private getSearchOptions(locationType?: string) {
        const options: any = {
            content_filter: 'high',
            sort: 'popular'
        };
    
        const orientationMap = {
            beach: 'landscape',
            mountain: 'landscape',
            city: 'squarish',
            temple: 'portrait'
        };
    
        if (locationType && orientationMap[locationType]) {
            options.orientation = orientationMap[locationType];
        }
    
        return options;
    }
    
    async getLocationDetails(destination: string) {
        if (!destination) {
            return { message: 'Vui lòng nhập địa điểm du lịch!' };
        }

        // Xác nhận địa điểm có thật
        const locationInformation = await this.locationService.getLocationByAddress(destination);

        if (!locationInformation) {
            return { message: 'Địa điểm không hợp lệ!' };
        }   
        
        const locationDetails = await this.itineraryService.getLocationDetails(locationInformation);

        return locationDetails;
    }
}

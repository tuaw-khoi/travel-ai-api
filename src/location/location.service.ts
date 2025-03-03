import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LocationService {
  constructor() {}

  async validateLocation(location: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response?.data;

      if (!data || data.length === 0) {
        throw new BadRequestException('Địa điểm không hợp lệ hoặc không tồn tại.');
      }

      const place = data[0];

      if (!place.lat || !place.lon || !place.display_name) {
        throw new BadRequestException('Dữ liệu địa điểm không đầy đủ.');
      }

      const validTypes = ['city', 'town', 'village', 'attraction', 'administrative'];
      if (!validTypes.includes(place.type)) {
        throw new BadRequestException('Loại địa điểm không phù hợp.');
      }

      return {
        name: place.display_name,
        latitude: place.lat,
        longitude: place.lon,
        type: place.type,
        place_id: place.place_id,
      };
    } catch (error) {
      throw new BadRequestException(error.response?.data || 'Lỗi khi xác thực địa điểm.');
    }
  }

  async getLocationByAddress(address: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response?.data;

      if (!data || data.length === 0) {
        throw new BadRequestException('Không tìm thấy địa chỉ này.');
      }

      // Ưu tiên kết quả có số nhà (house_number)
      const place = data.find((p) => p.address && p.address.house_number) || data[0];

      return {
        name: place.display_name,
        house_number: place.address?.house_number || 'Không xác định',
        road: place.address?.road || 'Không xác định',
        city: place.address?.city || place.address?.town || place.address?.village || 'Không xác định',
        country: place.address?.country || 'Không xác định',
        type: place.type,
        latitude: place.lat,
        longitude: place.lon,
      };
    } catch (error) {
      throw new BadRequestException(error.response?.data || 'Lỗi khi tìm địa chỉ.');
    }
  }    
}

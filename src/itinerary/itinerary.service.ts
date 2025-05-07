import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '~/config/env.config';
import { LocationDto } from '~/core/dtos/location.dto';
import axios from 'axios';

@Injectable()
export class ItineraryService {
  private genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

  async generateItinerary(location: LocationDto): Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Bạn là một trợ lý du lịch chuyên nghiệp, hãy tạo lộ trình du lịch dưới dạng JSON hợp lệ với format:
{
  "destination": "<Tên địa điểm>",
  "startDate": "<Ngày bắt đầu>",
  "endDate": "<Ngày kết thúc>",
  "itinerary": [
    {
      "day": <Ngày thứ tự>,
      "date": "<Ngày tháng năm>",
      "activities": [
        {
          "timeOfDay": "<Buổi sáng, trưa, chiều, tối>",
          "description": "<Mô tả hoạt động>",
          "location": "<Địa điểm hoạt động>",
          "transportation": "<Phương tiện di chuyển>"
        }
      ]
    }
  ],
  "transportation": ["<Phương tiện di chuyển>"],
  "specialties": ["<Món ăn đặc sản>"]
}

### Thông tin địa điểm:
- Tên địa điểm: ${location.name}
- Vĩ độ: ${location.latitude}
- Kinh độ: ${location.longitude}
- Loại địa điểm: ${location.type ?? "Không xác định"}
- Ngày bắt đầu: ${location.startDate ?? "Không xác định"}
- Ngày kết thúc: ${location.endDate ?? "Không xác định"}

**LƯU Ý:** Trả về dữ liệu dưới dạng JSON hợp lệ, không có markdown hoặc mô tả thêm.
`;

    try {
      const result = await model.generateContent(prompt);
      let responseText = result.response.text().trim();

      // Loại bỏ các phần dư thừa có thể xuất hiện từ Gemini
      responseText = responseText.replace(/^```json/, '').replace(/```$/, '').trim();

      // Xử lý lỗi dấu phẩy cuối cùng trong JSON
      responseText = responseText.replace(/,\s*([\]}])/g, '$1');

      // Kiểm tra JSON hợp lệ
      const itineraryObject = JSON.parse(responseText);
      return itineraryObject;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ Gemini:", error);
      console.error("Dữ liệu nhận được:", error.response?.text ?? "Không có dữ liệu");
      throw new HttpException('Lỗi khi tạo lộ trình!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getLocationDetails(location: { name: string; latitude: string; longitude: string }) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
Bạn là một trợ lý du lịch thông minh. Hãy cung cấp thông tin chi tiết về địa điểm dưới dạng JSON:
{
  "name": "<Tên địa điểm>",
  "description": "<Mô tả chi tiết về địa điểm>",
  "history": "<Lịch sử của địa điểm>",
}

### Thông tin địa điểm:
- Tên địa điểm: ${location.name}
- Vĩ độ: ${location.latitude}
- Kinh độ: ${location.longitude}

**LƯU Ý:** Trả về dữ liệu dưới dạng JSON hợp lệ, không có markdown hoặc mô tả thêm.
`;

    try {
      const result = await model.generateContent(prompt);
      let responseText = result.response.text().trim();
      responseText = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
      responseText = responseText.replace(/,\s*([\]}])/g, '$1');

      return JSON.parse(responseText);
    } catch (error) {
      console.error("Lỗi khi parse JSON từ Gemini:", error);
      throw new HttpException('Lỗi khi lấy thông tin địa điểm!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

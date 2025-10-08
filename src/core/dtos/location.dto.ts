import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, IsNumber, IsDate } from 'class-validator';

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsOptional()
    startDate?: string ;

    @IsDate()
    @IsOptional()
    endDate?: string;
}
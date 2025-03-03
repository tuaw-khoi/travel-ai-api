import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, IsNumber, IsDate } from 'class-validator';

export class LocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    place_id?: string;

    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;
}
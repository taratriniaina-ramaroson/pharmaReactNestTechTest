import { IsString, IsNumber, IsPositive, IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsInt()
    @Min(0)
    stock: number;
}
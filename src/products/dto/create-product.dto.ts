import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductsDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  description: string;
}

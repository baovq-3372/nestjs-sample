import { IsNotEmpty } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}

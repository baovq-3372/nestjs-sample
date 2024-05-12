import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
export class CreateOrderDetailDto {
  @IsNotEmpty()
  orderId: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}

import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ProductOrderDto } from './product-order.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  totalBill: number;

  note: string;

  @IsArray()
  products: ProductOrderDto[];
}

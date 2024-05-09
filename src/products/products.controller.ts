import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: ProductsDTO) {
    return this.productService.create(createProductDto);
  }
}

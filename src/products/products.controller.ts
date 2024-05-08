import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductsDTO } from './dto/create-product.dto';

@ApiTags('products')
@Controller({
  version: '1',
  path: 'products',
})
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: ProductsDTO) {
    return this.productService.create(createProductDto);
  }
}

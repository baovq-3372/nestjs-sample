import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDTO } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: ProductsDTO): Promise<Product> {
    const product = new Product();

    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.description = createProductDto.description;

    return this.productsRepository.save(product);
  }
}

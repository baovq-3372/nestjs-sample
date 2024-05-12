import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductOrderDto } from './dto/product-order.dto';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Status } from './enums/order.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user: User = await this.usersRepository.findOne({
      where: { id: createOrderDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const order = new Order({
      user: user,
      note: createOrderDto.note,
      totalBill: createOrderDto.totalBill,
      status: Status.pending,
    });
    try {
      await this.dataSource.transaction(async (manager) => {
        await this.createOrderTransaction(
          manager,
          order,
          createOrderDto.products,
        );
      });
      return {
        statusCode: 201,
        message: 'Create order successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  private createOrderTransaction = async (
    manager,
    order: Order,
    products: ProductOrderDto[],
  ) => {
    const newOrder = await manager.getRepository(Order).save(order);
    for (const product of products) {
      const newProduct = await manager.getRepository(Product).findOne({
        where: { id: product.id },
      });
      if (!newProduct) {
        throw new NotFoundException('Product not found');
      }
      await manager.getRepository(OrderDetail).save({
        product: newProduct,
        order: newOrder,
        price: product.price,
        quantity: product.quantity,
      });
    }
  };
}

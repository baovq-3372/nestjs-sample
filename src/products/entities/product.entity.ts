import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../base/entities/base.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
@Entity()
export class Product extends BaseEntity {
  constructor(data?: Partial<Product>) {
    super();
    data && Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
    cascade: true,
  })
  orderDetails: OrderDetail[];
}

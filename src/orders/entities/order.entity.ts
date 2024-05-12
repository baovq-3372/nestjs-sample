import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../base/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';

@Entity()
export class Order extends BaseEntity {
  constructor(data?: Partial<Order>) {
    super();
    data && Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalBill: number;

  @Column()
  status: string;

  @Column()
  note: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetail[];
}

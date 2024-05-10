import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  constructor(data?: Partial<User>) {
    super();
    data && Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];
}

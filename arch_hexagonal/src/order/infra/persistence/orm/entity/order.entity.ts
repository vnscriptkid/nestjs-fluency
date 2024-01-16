import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  customerId: string;

  @Column()
  status: string;
}

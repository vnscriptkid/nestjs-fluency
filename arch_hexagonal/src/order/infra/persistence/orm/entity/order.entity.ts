import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryColumn('int', { generated: true })
  id: number;

  @Column()
  customerId: string;

  @Column()
  status: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Outbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @Column()
  type: string;

  @Column()
  target: string;

  @Column()
  isProcessed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

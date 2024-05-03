import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  messageId: string;

  @Column()
  pattern: string;

  @Column({ type: 'json' })
  payload: Record<string, any>;

  @Column({ enum: ['pending', 'processed'] })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}

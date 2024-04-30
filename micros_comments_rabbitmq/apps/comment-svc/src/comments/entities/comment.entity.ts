import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CommentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  userId: number;

  @Column()
  status: CommentStatus;
}

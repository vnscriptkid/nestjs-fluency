import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workflow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    todoId: number;
}

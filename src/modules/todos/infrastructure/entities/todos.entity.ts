import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @AutoMap()
  title: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}

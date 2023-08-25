import { User } from 'src/infra/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  brand: String;

  @Column({ length: 500 })
  model: String;

  @Column('int')
  year: Number;

  @Column({ length: 500 })
  fuel: String;

  @Column('int')
  mileage: Number;

  @Column({ length: 500 })
  color: String;

  @Column({ length: 500 })
  plate: String;

  // Relacionamento muitos-para-um com a entidade User
  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: 'ownerId' }) // Coluna usada como chave estrangeira
  owner: User;
}

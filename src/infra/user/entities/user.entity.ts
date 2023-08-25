import { Vehicle } from 'src/infra/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  // Relacionamento um-para-muitos com a entidade Vehicle
  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles?: Vehicle[];
}

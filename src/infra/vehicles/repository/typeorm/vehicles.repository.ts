import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicle } from '../../entities/vehicle.entity';

export default class VehiclesRepository {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  public async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehiclesRepository.create(vehicle);
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehiclesRepository.save(vehicle);
  }

  public async findById(id: number): Promise<Vehicle | null> {
    const findVehicle = this.vehiclesRepository.findOne({
      where: {
        id,
      },
    });
    return findVehicle;
  }

  public async remove(id: number): Promise<void> {
    await this.vehiclesRepository.delete(id);
  }
}

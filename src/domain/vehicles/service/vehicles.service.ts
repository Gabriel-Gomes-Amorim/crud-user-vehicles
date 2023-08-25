import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import VehiclesRepository from 'src/infra/vehicles/repository/typeorm/vehicles.repository';
import UserRepository from 'src/infra/user/repository/vehicles.repository';
import { IdNotFoundException } from 'src/domain/user/utils/error/idnotfound';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly userReposiotory: UserRepository,
  ) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const { ownerId } = createVehicleDto;

    // verificar se o user que esta cadastrando veiculo existe
    const isUserAlreadyExists = await this.userReposiotory.findById(ownerId);

    // se o user nao existe retorna erro
    if (!isUserAlreadyExists) {
      throw new IdNotFoundException(ownerId);
    }

    const createVehicle = {
      brand: createVehicleDto.brand,
      model: createVehicleDto.model,
      year: createVehicleDto.year,
      fuel: createVehicleDto.fuel,
      mileage: createVehicleDto.mileage,
      color: createVehicleDto.color,
      plate: createVehicleDto.plate,
      owner: isUserAlreadyExists,
    };

    const newVehicle = await this.vehiclesRepository.create(createVehicle);

    const createdVehicle = await this.vehiclesRepository.save(newVehicle);

    return { ...createVehicle };
  }

  findById(id: number) {
    return this.vehiclesRepository.findById(id);
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const findVehicle = await this.vehiclesRepository.findById(id);

    if (!findVehicle) {
      throw new IdNotFoundException(id);
    }

    const updateVehicle = {
      ...findVehicle,
      brand: updateVehicleDto.brand,
      model: updateVehicleDto.model,
      year: updateVehicleDto.year,
      fuel: updateVehicleDto.fuel,
      mileage: updateVehicleDto.mileage,
      color: updateVehicleDto.color,
      plate: updateVehicleDto.plate,
    };

    const updatedVehicle = await this.vehiclesRepository.save(updateVehicle);

    return {
      ...updateVehicle,
    };
  }

  remove(id: number) {
    return this.vehiclesRepository.remove(id);
  }
}

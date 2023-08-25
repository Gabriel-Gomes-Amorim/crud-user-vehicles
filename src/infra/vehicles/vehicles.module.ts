import { Module } from '@nestjs/common';
import { VehiclesService } from '../../domain/vehicles/service/vehicles.service';
import { VehiclesController } from './http/vehicles.controller';
import { VehicleProviders } from './repository/typeorm/vehicles.providers';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import VehiclesRepository from './repository/typeorm/vehicles.repository';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [VehiclesController],
  providers: [VehiclesService, ...VehicleProviders, VehiclesRepository],
  exports: [VehiclesService, VehiclesRepository],
})
export class VehiclesModule {}

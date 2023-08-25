import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/services/user.service';
import { UserController } from './http/user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserProviders } from './repository/user.providers';
import UserRepository from './repository/user.repository';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}

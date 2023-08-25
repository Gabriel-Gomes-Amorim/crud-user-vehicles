import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './infra/user/user.module';
import { VehiclesModule } from './infra/vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

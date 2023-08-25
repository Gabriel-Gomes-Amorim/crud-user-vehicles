import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from '../../../domain/vehicles/service/vehicles.service';
import { CreateVehicleDto } from 'src/domain/vehicles/dto/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/domain/vehicles/dto/update-vehicle.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('vehicles')
// swagger
@ApiTags('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('create')
  async create(
    @Body() createVehicleDto: CreateVehicleDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const vehicle = await this.vehiclesService.create(createVehicleDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Veículo cadastrado com sucesso!', vehicle });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao criar veículo!', error: error });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const vehicle = await this.vehiclesService.findById(id);

      return res.status(HttpStatus.OK).json(vehicle);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'erro ao buscar veículo!', error: error });
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    try {
      const vehicle = await this.vehiclesService.update(id, updateVehicleDto);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Veículo atualizado com sucesso!', vehicle });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'erro ao atualizar o veículo!', error: error });
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.vehiclesService.remove(+id);
  }
}

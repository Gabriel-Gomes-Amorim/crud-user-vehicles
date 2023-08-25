import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({ description: 'Marca do veículo' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Ano do veículo' })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Tipo de combustível do veículo' })
  @IsString()
  fuel: string;

  @ApiProperty({ description: 'Quilometragem do veículo' })
  @IsNumber()
  mileage: number;

  @ApiProperty({ description: 'Cor do veículo' })
  @IsString()
  color: string;

  @ApiProperty({ description: 'Placa do veículo' })
  @IsString()
  plate: string;
}

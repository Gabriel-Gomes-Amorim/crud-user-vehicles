import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Marca do veículo' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ description: 'Ano do veículo' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Tipo de combustível do veículo' })
  @IsNotEmpty()
  @IsString()
  fuel: string;

  @ApiProperty({ description: 'Quilometragem do veículo' })
  @IsNotEmpty()
  @IsNumber()
  mileage: number;

  @ApiProperty({ description: 'Cor do veículo' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ description: 'Placa do veículo' })
  @IsNotEmpty()
  @IsString()
  plate: string;

  @ApiProperty({ description: 'ID do proprietário do veículo' })
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;
}

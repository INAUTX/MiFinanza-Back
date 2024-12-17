import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoDto } from './create-gasto.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {
  @ApiPropertyOptional({ description: 'Nueva fecha del gasto', example: '2024-04-20' })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiPropertyOptional({ description: 'Nueva cantidad del gasto', example: 250.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad?: number;

  @ApiPropertyOptional({ description: 'Nuevo ID de la categoría del gasto', example: 3 })
  @IsOptional()
  @IsNumber()
  categoria_id?: number;

  @ApiPropertyOptional({ description: 'Nueva etiqueta del gasto', example: 'Extraordinario' })
  @IsOptional()
  @IsString()
  etiqueta?: string;

  @ApiPropertyOptional({ description: 'Nuevo comentario sobre el gasto', example: 'Reparación del coche' })
  @IsOptional()
  @IsString()
  comentario?: string;

  @ApiPropertyOptional({ description: 'Nueva foto del recibo o comprobante', example: 'ruta/a/nueva_foto.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional({ description: 'Nuevo ID del presupuesto asociado', example: 2 })
  @IsOptional()
  @IsNumber()
  presupuesto_id?: number;
}

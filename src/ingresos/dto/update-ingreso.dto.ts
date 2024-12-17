// src/ingresos/dto/update-ingreso.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateIngresoDto } from './create-ingreso.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsNumber, IsString, IsPositive } from 'class-validator';

export class UpdateIngresoDto extends PartialType(CreateIngresoDto) {
  @ApiPropertyOptional({ description: 'Nueva fecha del ingreso', example: '2024-04-20' })
  @IsOptional()
  @IsDateString()
  fecha?: Date;

  @ApiPropertyOptional({ description: 'Nueva cantidad del ingreso', example: 600.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad?: number;

  @ApiPropertyOptional({ description: 'Nuevo ID de la categoría del ingreso', example: 2 })
  @IsOptional()
  @IsNumber()
  categoria_id?: number;

  @ApiPropertyOptional({ description: 'Nueva etiqueta del ingreso', example: 'Extraordinario' })
  @IsOptional()
  @IsString()
  etiqueta?: string;

  @ApiPropertyOptional({ description: 'Nuevo comentario sobre el ingreso', example: 'Bonificación de desempeño' })
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

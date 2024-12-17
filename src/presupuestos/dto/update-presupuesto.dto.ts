import { PartialType } from '@nestjs/mapped-types';
import { CreatePresupuestoDto } from './create-presupuesto.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePresupuestoDto extends PartialType(CreatePresupuestoDto) {
  @ApiPropertyOptional({ description: 'Nuevo nombre del presupuesto', example: 'Comida' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Nuevo icono del presupuesto', example: 'https://icongr.am/clarity/auto.svg?size=77&color=6a1653' })
  @IsOptional()
  @IsString()
  icono?: string;

  @ApiPropertyOptional({ description: 'Nuevo presupuesto inicial', example: 1200.00 })
  @IsOptional()
  @IsNumber()
  presupuesto_inicial?: number;
}

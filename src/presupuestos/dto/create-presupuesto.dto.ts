import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePresupuestoDto {
  @ApiProperty({ description: 'Nombre del presupuesto', example: 'Comida' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ description: 'Icono del presupuesto', example: 'https://icongr.am/clarity/airplane.svg?size=88&color=166a68' })
  @IsString()
  @IsOptional()
  icono?: string;

  @ApiProperty({ description: 'Presupuesto inicial', example: 1000.00 })
  @IsNumber()
  presupuesto_inicial: number;
}


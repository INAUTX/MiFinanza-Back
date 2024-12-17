// src/ingresos/dto/create-ingreso.dto.ts
import { IsDateString, IsNumber, IsOptional, IsString, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIngresoDto {
  @ApiProperty({ description: 'Fecha del ingreso', example: '2024-04-15' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ description: 'Cantidad del ingreso', example: 500.00 })
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @ApiProperty({ description: 'ID de la categoría del ingreso', example: 1 })
  @IsNumber()
  categoria_id: number;

  @ApiPropertyOptional({ description: 'Etiqueta del ingreso', example: 'Mensual' })
  @IsString()
  @IsOptional()
  etiqueta?: string;

  @ApiPropertyOptional({ description: 'Comentario sobre el ingreso', example: 'Ingreso mensual de salario' })
  @IsString()
  @IsOptional()
  comentario?: string;

  @ApiPropertyOptional({ description: 'Foto del recibo o comprobante', example: 'ruta/a/foto.jpg' })
  @IsString()
  @IsOptional()
  foto?: string;

  @ApiProperty({ description: 'ID del presupuesto asociado', example: 1 })
  @IsNumber()
  presupuesto_id: number;
}

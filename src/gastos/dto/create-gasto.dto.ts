import { IsDateString, IsNumber, IsOptional, IsString, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGastoDto {
  @ApiProperty({ description: 'Fecha del gasto', example: '2024-04-15' })
  @IsDateString()
  fecha: Date;

  @ApiProperty({ description: 'Cantidad del gasto', example: 200.00 })
  @IsNumber()
  @IsPositive()
  cantidad: number;

  @ApiProperty({ description: 'ID de la categoría del gasto', example: 2 })
  @IsNumber()
  categoria_id: number;

  @ApiPropertyOptional({ description: 'Etiqueta del gasto', example: 'Alimentación' })
  @IsString()
  @IsOptional()
  etiqueta?: string;

  @ApiPropertyOptional({ description: 'Comentario sobre el gasto', example: 'Compra en supermercado' })
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

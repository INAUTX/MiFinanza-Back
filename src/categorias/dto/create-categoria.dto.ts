import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CategoriaTipo } from '../entities/categoria.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Salario' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Icono representativo de la categoría', example: '💰', required: false })
  @IsString()
  @IsOptional()
  icono?: string;

  @ApiProperty({ description: 'Color asociado a la categoría', example: '#FF5733', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Tipo de la categoría', enum: CategoriaTipo, example: CategoriaTipo.INGRESO })
  @IsEnum(CategoriaTipo)
  tipo: CategoriaTipo;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CategoriaTipo } from '../entities/categoria.entity';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiPropertyOptional({ description: 'Nombre de la categoría', example: 'Salario' })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Icono representativo de la categoría', example: 'health' })
  icono?: string;

  @ApiPropertyOptional({ description: 'Color asociado a la categoría', example: '#FF5733' })
  color?: string;

  @ApiPropertyOptional({ description: 'Tipo de la categoría', enum: CategoriaTipo, example: CategoriaTipo.GASTO })
  tipo?: CategoriaTipo;
}

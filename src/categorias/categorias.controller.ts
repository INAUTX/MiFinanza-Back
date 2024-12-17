// categorias.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categorias } from './entities/categoria.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente.', type: Categorias })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categorias> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Listado de categorías.', type: [Categorias] })
  findAll(): Promise<Categorias[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoría encontrada.', type: Categorias })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('id') id: string): Promise<Categorias> {
    return this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría existente' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoría actualizada.', type: Categorias })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categorias> {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriasService.remove(+id);
  }
}

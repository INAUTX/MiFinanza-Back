import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Gastos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gasto' })
  @ApiResponse({ status: 201, description: 'Gasto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async create(@Body() createGastoDto: CreateGastoDto, @Req() req) {
    return this.gastosService.create(createGastoDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gastos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Listado de gastos.' })
  async findAll(@Req() req) {
    return this.gastosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gasto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
  @ApiResponse({ status: 200, description: 'Gasto encontrado.' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado.' })
  async findOne(@Param('id') id: string, @Req() req) {
    const gasto = await this.gastosService.findOne(+id, req.user);
    if (!gasto) {
      throw new HttpException(`Gasto con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return { success: true, gasto };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gasto existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
  @ApiResponse({ status: 200, description: 'Gasto actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado.' })
  async update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto, @Req() req) {
    const updatedGasto = await this.gastosService.update(+id, updateGastoDto, req.user);
    return { success: true, gasto: updatedGasto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gasto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del gasto' })
  @ApiResponse({ status: 200, description: 'Gasto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Gasto no encontrado.' })
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.gastosService.remove(+id, req.user);
    return { success: true, message: 'Gasto eliminado correctamente' };
  }
}

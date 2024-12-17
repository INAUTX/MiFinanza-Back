import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PresupuestosService } from './presupuestos.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Presupuestos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('presupuestos')
export class PresupuestosController {
  constructor(private readonly presupuestosService: PresupuestosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo presupuesto' })
  @ApiResponse({ status: 201, description: 'Presupuesto creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  
  async create(@Body() createPresupuestoDto: CreatePresupuestoDto, @Req() req) {
    try {
      const presupuesto = await this.presupuestosService.create(createPresupuestoDto, req.user.id);
      return { success: true, presupuesto };
    } catch (error) {
      throw error;
    }
  // async create(@Body() createPresupuestoDto: CreatePresupuestoDto, @Req() req) {
  //   return this.presupuestosService.create(createPresupuestoDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los presupuestos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Listado de presupuestos.' })
  async findAll(@Req() req) {
    return this.presupuestosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un presupuesto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del presupuesto' })
  @ApiResponse({ status: 200, description: 'Presupuesto encontrado.' })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado.' })
  async findOne(@Param('id') id: string, @Req() req) {
    const presupuesto = await this.presupuestosService.findOne(+id, req.user);
    if (!presupuesto) {
      throw new HttpException(`Presupuesto con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return { success: true, presupuesto };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un presupuesto existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del presupuesto' })
  @ApiResponse({ status: 200, description: 'Presupuesto actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado.' })
  async update(@Param('id') id: string, @Body() updatePresupuestoDto: UpdatePresupuestoDto, @Req() req) {
    const updatedPresupuesto = await this.presupuestosService.update(+id, updatePresupuestoDto, req.user);
    return { success: true, presupuesto: updatedPresupuesto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un presupuesto' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del presupuesto' })
  @ApiResponse({ status: 200, description: 'Presupuesto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Presupuesto no encontrado.' })
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.presupuestosService.remove(+id, req.user);
    return { success: true, message: 'Presupuesto eliminado correctamente' };
  }
}

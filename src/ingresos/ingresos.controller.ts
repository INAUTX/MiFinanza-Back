import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Ingresos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ingreso' })
  @ApiResponse({ status: 201, description: 'Ingreso creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async create(@Body() createIngresoDto: CreateIngresoDto, @Req() req) {
    return this.ingresosService.create(createIngresoDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ingresos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Listado de ingresos.' })
  async findAll(@Req() req) {
    return this.ingresosService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ingreso por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del ingreso' })
  @ApiResponse({ status: 200, description: 'Ingreso encontrado.' })
  @ApiResponse({ status: 404, description: 'Ingreso no encontrado.' })
  async findOne(@Param('id') id: string, @Req() req) {
    const ingreso = await this.ingresosService.findOne(+id, req.user);
    if (!ingreso) {
      throw new HttpException(`Ingreso con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return { success: true, ingreso };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ingreso existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del ingreso' })
  @ApiResponse({ status: 200, description: 'Ingreso actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Ingreso no encontrado.' })
  async update(@Param('id') id: string, @Body() updateIngresoDto: UpdateIngresoDto, @Req() req) {
    const updatedIngreso = await this.ingresosService.update(+id, updateIngresoDto, req.user);
    return { success: true, ingreso: updatedIngreso };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ingreso' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del ingreso' })
  @ApiResponse({ status: 200, description: 'Ingreso eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Ingreso no encontrado.' })
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.ingresosService.remove(+id, req.user);
    return { success: true, message: 'Ingreso eliminado correctamente' };
  }
}

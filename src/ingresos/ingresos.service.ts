import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingresos } from './ingresos.entity';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { Categorias } from 'src/categorias/entities/categoria.entity';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';

@Injectable()
export class IngresosService {
  constructor(
    @InjectRepository(Ingresos)
    private ingresosRepository: Repository<Ingresos>,
    @InjectRepository(Presupuestos)
    private presupuestosRepository: Repository<Presupuestos>,
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,

  ) {}

  async create(createIngresoDto: CreateIngresoDto, usuario: Usuarios): Promise<{ success: boolean }> {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: { id: createIngresoDto.presupuesto_id, usuario },
    });
    const categoria = await this.categoriasRepository.findOne({
      where: { id: createIngresoDto.categoria_id },
    })

    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con ID ${createIngresoDto.presupuesto_id} no encontrado`);
    }

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${createIngresoDto.categoria_id} no encontrada`);
    }

    if (categoria.tipo !== 'INGRESO') {
      throw new NotFoundException(`Categoría con ID ${createIngresoDto.categoria_id} no encontrada o no es de tipo INGRESO`);
    }

    
    const ingreso = this.ingresosRepository.create({
      ...createIngresoDto,
      presupuesto,
      categoria
    });
    await this.ingresosRepository.save(ingreso);
    return { success: true };
  }

  async findAll(usuario: Usuarios): Promise<Ingresos[]> {
    return this.ingresosRepository.find({
      relations: ['presupuesto'],
      where: { presupuesto: { usuario } },
    });
  }

  async findOne(id: number, usuario: Usuarios): Promise<Ingresos> {
    const ingreso = await this.ingresosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!ingreso || ingreso.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Ingreso con ID ${id} no encontrado`);
    }
    return ingreso;
  }

  async update(id: number, updateIngresoDto: UpdateIngresoDto, usuario: Usuarios): Promise<{ success: boolean }> {
    const ingreso = await this.ingresosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!ingreso || ingreso.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Ingreso con ID ${id} no encontrado`);
    }

    if (updateIngresoDto.presupuesto_id && updateIngresoDto.presupuesto_id !== ingreso.presupuesto.id) {
      const presupuesto = await this.presupuestosRepository.findOne({
        where: { id: updateIngresoDto.presupuesto_id, usuario },
      });
      if (!presupuesto) {
        throw new NotFoundException(`Presupuesto con ID ${updateIngresoDto.presupuesto_id} no encontrado`);
      }
      ingreso.presupuesto = presupuesto;
    }

    if (updateIngresoDto.categoria_id && updateIngresoDto.categoria_id !== ingreso.categoria.id) {
      const categoria = await this.categoriasRepository.findOne({
        where: { id: updateIngresoDto.categoria_id },
      });

      if (!categoria) {
        throw new NotFoundException(`Categoría con ID ${updateIngresoDto.categoria_id} no encontrada`);
      }

      if (categoria.tipo !== 'INGRESO') {
        throw new BadRequestException(`La categoría con ID ${updateIngresoDto.categoria_id} no es de tipo INGRESO`);
      }

      ingreso.categoria = categoria;
    }

    Object.assign(ingreso, updateIngresoDto);
    await this.ingresosRepository.save(ingreso);
    return { success: true };
  }

  async remove(id: number, usuario: Usuarios): Promise<{ success: boolean }> {
    const ingreso = await this.ingresosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!ingreso || ingreso.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Ingreso con ID ${id} no encontrado`);
    }
    await this.ingresosRepository.remove(ingreso);
    return { success: true };
  }
}

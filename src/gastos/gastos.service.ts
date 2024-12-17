import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gastos } from './gastos.entity';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Usuarios } from '../usuarios/usuarios.entity';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { Categorias } from 'src/categorias/entities/categoria.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gastos)
    private gastosRepository: Repository<Gastos>,
    @InjectRepository(Presupuestos)
    private presupuestosRepository: Repository<Presupuestos>,
    @InjectRepository(Categorias)
    private categoriasRepository: Repository<Categorias>,

  ) {}

  async create(createGastoDto: CreateGastoDto, usuario: Usuarios): Promise<{ success: boolean }> {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: { id: createGastoDto.presupuesto_id, usuario },
    });

    const categoria = await this.categoriasRepository.findOne({
      where: { id: createGastoDto.categoria_id },
    });

    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con ID ${createGastoDto.presupuesto_id} no encontrado`);
    }

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${createGastoDto.categoria_id} no encontrada`);
    }

    if (categoria.tipo !== 'GASTO') {
      throw new BadRequestException(`La categoría con ID ${createGastoDto.categoria_id} no es de tipo GASTO`);
    }

    const gasto = this.gastosRepository.create({
      ...createGastoDto,
      presupuesto,
      categoria
    });
    await this.gastosRepository.save(gasto);
    return { success: true };
  }

  async findAll(usuario: Usuarios): Promise<Gastos[]> {
    return this.gastosRepository.find({
      relations: ['presupuesto'],
      where: { presupuesto: { usuario } },
    });
  }

  async findOne(id: number, usuario: Usuarios): Promise<Gastos> {
    const gasto = await this.gastosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!gasto || gasto.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Gasto con ID ${id} no encontrado`);
    }
    return gasto;
  }

  async update(id: number, updateGastoDto: UpdateGastoDto, usuario: Usuarios): Promise<{ success: boolean }> {
    const gasto = await this.gastosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!gasto || gasto.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Gasto con ID ${id} no encontrado`);
    }

    if (updateGastoDto.presupuesto_id && updateGastoDto.presupuesto_id !== gasto.presupuesto.id) {
      const presupuesto = await this.presupuestosRepository.findOne({
        where: { id: updateGastoDto.presupuesto_id, usuario },
      });
      if (!presupuesto) {
        throw new NotFoundException(`Presupuesto con ID ${updateGastoDto.presupuesto_id} no encontrado`);
      }
      gasto.presupuesto = presupuesto;
    }

    Object.assign(gasto, updateGastoDto);
    await this.gastosRepository.save(gasto);
    return { success: true };
  }

  async remove(id: number, usuario: Usuarios): Promise<{ success: boolean }> {
    const gasto = await this.gastosRepository.findOne({
      where: { id },
      relations: ['presupuesto'],
    });
    if (!gasto || gasto.presupuesto.usuario.id !== usuario.id) {
      throw new NotFoundException(`Gasto con ID ${id} no encontrado`);
    }
    await this.gastosRepository.remove(gasto);
    return { success: true };
  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presupuestos } from './presupuestos.entity';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { Usuarios } from '../usuarios/usuarios.entity';

@Injectable()
export class PresupuestosService {
  constructor(
    @InjectRepository(Presupuestos)
    private presupuestosRepository: Repository<Presupuestos>,
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  // async create(createPresupuestoDto: CreatePresupuestoDto, usuario: Usuarios): Promise<{ success: boolean }> {
  //   const presupuesto = this.presupuestosRepository.create({
  //     ...createPresupuestoDto,
  //     usuario,
  //   });
  //   await this.presupuestosRepository.save(presupuesto);
  //   return { success: true };
  // }

  async create(createPresupuestoDto: CreatePresupuestoDto, usuarioId: number): Promise<Presupuestos> {
    try {
      
      const usuario = await this.usuariosRepository.findOne({ 
        where: { id: usuarioId } 
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }  

      const presupuesto = this.presupuestosRepository.create({
        ...createPresupuestoDto,
        usuario,
      });
      console.log('Presupuesto a guardar:', presupuesto, usuario);
      return await this.presupuestosRepository.save(presupuesto);
    } catch (error) {
      console.error('Error al crear presupuesto:', error);
      throw new InternalServerErrorException('Error al crear presupuesto');
    }
  }

  async findAll(usuario: Usuarios): Promise<Presupuestos[]> {
    try {
      return await this.presupuestosRepository.find({
        where: { usuario: { id: usuario.id } },
        relations: ['ingresos', 'gastos'],
      });
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
      throw new InternalServerErrorException('Error al obtener presupuestos');
    }
  }

  async findOne(id: number, usuario: Usuarios): Promise<Presupuestos> {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: { id, usuario },
      relations: ['ingresos', 'gastos'],
    });
    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con ID ${id} no encontrado`);
    }
    return presupuesto;
  }

  async update(id: number, updatePresupuestoDto: UpdatePresupuestoDto, usuario: Usuarios): Promise<{ success: boolean }> {
    const presupuesto = await this.presupuestosRepository.preload({
      id: id,
      ...updatePresupuestoDto,
      usuario,
    });
    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con ID ${id} no encontrado`);
    }
    await this.presupuestosRepository.save(presupuesto);
    return { success: true };
  }

  async remove(id: number, usuario: Usuarios): Promise<{ success: boolean }> {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: { id, usuario },
    });
    if (!presupuesto) {
      throw new NotFoundException(`Presupuesto con ID ${id} no encontrado`);
    }
    await this.presupuestosRepository.remove(presupuesto);
    return { success: true };
  }
}

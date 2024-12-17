import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
  ) {}

  async findOneByCorreo(correo: string): Promise<Usuarios | undefined> {
    return this.usuariosRepository.findOne({ where: { correo } });
  }

  async createUsuario(correo: string, contraseña: string): Promise<Usuarios> {
    const usuario = this.usuariosRepository.create({ correo, contraseña });
    return this.usuariosRepository.save(usuario);
  }

  async findOneById(id: number): Promise<Usuarios | undefined> {
    return this.usuariosRepository.findOne({ 
      where: { id },
    });
}
}

import { Controller, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get(':correo')
  async getUsuario(@Param('correo') correo: string): Promise<Usuarios | undefined> {
    return this.usuariosService.findOneByCorreo(correo);
  }
}

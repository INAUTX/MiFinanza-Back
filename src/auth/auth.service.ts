import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuarios } from '../usuarios/usuarios.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Usuarios> {
    const { correo, contraseña } = createUserDto;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    return this.usuariosService.createUsuario(correo, hashedPassword);
  }

  async validateUser(correo: string, contraseña: string): Promise<Usuarios> {
    const usuario = await this.usuariosService.findOneByCorreo(correo);
    if (usuario && await bcrypt.compare(contraseña, usuario.contraseña)) {
      return usuario;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const { correo, contraseña } = loginUserDto;
    const usuario = await this.validateUser(correo, contraseña);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { sub: usuario.id, correo: usuario.correo };
    return this.jwtService.sign(payload);
  }
}

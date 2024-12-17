import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usuariosService: UsuariosService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '2024d123', //organizae n .env
    });
  }
  // async validate(payload: any) {
  //   console.log(payload);
    
  //   return { userId: payload.sub, correo: payload.correo };
  // }
  async validate(payload: any) {
  console.log('Payload recibido:', payload);

  const usuario = await this.usuariosService.findOneById(payload.sub);
    
  if (!usuario) {
    throw new UnauthorizedException('Usuario no encontrado');
  }

  return usuario; 
}
}

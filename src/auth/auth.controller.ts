import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return { success: true, user };
    } catch (error) {
      throw new HttpException('Error al registrar el usuario', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado exitosamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.authService.login(loginUserDto);
      return { success: true, token };
    } catch (error) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
  }
}

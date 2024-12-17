import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@example.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'contraseña123' })
  @IsString()
  contraseña: string;
}

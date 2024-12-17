import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'usuario@example.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @IsString()
  @MinLength(6)
  contraseña: string;
}

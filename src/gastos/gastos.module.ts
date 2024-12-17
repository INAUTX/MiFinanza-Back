import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { Gastos } from './gastos.entity';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Categorias } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gastos, Presupuestos, Categorias]),
    UsuariosModule,
  ],
  providers: [GastosService],
  controllers: [GastosController],
})
export class GastosModule {}

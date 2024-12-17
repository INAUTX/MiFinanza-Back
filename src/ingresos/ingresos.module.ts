import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { Ingresos } from './ingresos.entity';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Categorias } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingresos, Presupuestos, Categorias]),
    UsuariosModule,
  ],
  providers: [IngresosService],
  controllers: [IngresosController],
})
export class IngresosModule {}

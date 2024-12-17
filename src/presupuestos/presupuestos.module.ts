import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresupuestosService } from './presupuestos.service';
import { PresupuestosController } from './presupuestos.controller';
import { Presupuestos } from './presupuestos.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Ingresos } from '../ingresos/ingresos.entity';
import { Gastos } from '../gastos/gastos.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presupuestos, Ingresos, Gastos, Usuarios]),
    UsuariosModule,
  ],
  providers: [PresupuestosService],
  controllers: [PresupuestosController],
})
export class PresupuestosModule {}

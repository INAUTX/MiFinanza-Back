import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Categorias } from './categorias/entities/categoria.entity';
import { Presupuestos } from './presupuestos/presupuestos.entity';
import { Usuarios } from './usuarios/usuarios.entity';
import { Ingresos } from './ingresos/ingresos.entity';
import { Gastos } from './gastos/gastos.entity';

import { PresupuestosModule } from './presupuestos/presupuestos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { IngresosModule } from './ingresos/ingresos.module';
import { GastosModule } from './gastos/gastos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        // host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_NAME'),
        entities: [Usuarios, Presupuestos, Ingresos, Gastos, Categorias],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    AuthModule,
    PresupuestosModule,
    IngresosModule,
    GastosModule,
    CategoriasModule,
  ],
})
export class AppModule {}

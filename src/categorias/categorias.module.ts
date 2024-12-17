import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categorias } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])], 
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService], 
})
export class CategoriasModule {}

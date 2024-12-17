import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingresos } from '../../ingresos/ingresos.entity';
import { Gastos } from '../../gastos/gastos.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum CategoriaTipo {
  INGRESO = 'INGRESO',
  GASTO = 'GASTO',
}

@Entity()
export class Categorias {
  @ApiProperty({ description: 'Identificador único de la categoría', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre de la categoría', example: 'Salario' })
  @Column()
  nombre: string;

  @ApiProperty({ description: 'Icono representativo de la categoría', example: '💰', required: false })
  @Column({ nullable: true })
  icono: string;

  @ApiProperty({ description: 'Color asociado a la categoría', example: '#FF5733', required: false })
  @Column({ nullable: true })
  color: string;

  @ApiProperty({ description: 'Tipo de la categoría', enum: CategoriaTipo, example: CategoriaTipo.INGRESO })
  @Column({
    type: 'enum',
    enum: CategoriaTipo,
  })
  tipo: CategoriaTipo;

  @ApiProperty({ description: 'Ingresos asociados a la categoría' })
  @OneToMany(() => Ingresos, ingreso => ingreso.categoria)
  ingresos: Ingresos[];

  @ApiProperty({ description: 'Gastos asociados a la categoría' })
  @OneToMany(() => Gastos, gasto => gasto.categoria)
  gastos: Gastos[];
}

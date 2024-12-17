// src/gastos/gastos.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { Categorias } from '../categorias/entities/categoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Gastos {
  @ApiProperty({ description: 'Identificador único del gasto', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Fecha del gasto', example: '2024-04-15' })
  @Column('date')
  fecha: Date;

  @ApiProperty({ description: 'Cantidad del gasto', example: 200.00 })
  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number;

  @ApiProperty({ description: 'ID de la categoría del gasto', example: 2 })
  @Column()
  categoria_id: number;

  @ApiProperty({ description: 'ID del presupuesto asociado', example: 1 })
  @Column()
  presupuesto_id: number;

  @ApiPropertyOptional({ description: 'Etiqueta del gasto', example: 'Alimentación' })
  @Column({ nullable: true })
  etiqueta: string;

  @ApiPropertyOptional({ description: 'Comentario sobre el gasto', example: 'Compra en supermercado' })
  @Column({ type: 'text', nullable: true })
  comentario: string;

  @ApiPropertyOptional({ description: 'Foto del recibo o comprobante', example: 'ruta/a/foto.jpg' })
  @Column({ nullable: true })
  foto: string;

  @ApiProperty({ description: 'Presupuesto asociado al gasto' })
  @ManyToOne(() => Presupuestos, presupuesto => presupuesto.gastos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'presupuesto_id' })
  presupuesto: Presupuestos;

  @ApiProperty({ description: 'Categoría del gasto' })
  @ManyToOne(() => Categorias, categoria => categoria.gastos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categorias;
}

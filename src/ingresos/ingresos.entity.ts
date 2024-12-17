import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Presupuestos } from '../presupuestos/presupuestos.entity';
import { Categorias } from '../categorias/entities/categoria.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Ingresos {
  @ApiProperty({ description: 'Identificador único del ingreso', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Fecha del ingreso', example: '2024-04-15' })
  @Column('date')
  fecha: Date;

  @ApiProperty({ description: 'Cantidad del ingreso', example: 500.00 })
  @Column('decimal', { precision: 10, scale: 2 })
  cantidad: number;

  @ApiProperty({ description: 'ID de la categoría del ingreso', example: 1 })
  @Column()
  categoria_id: number;

  @ApiPropertyOptional({ description: 'Etiqueta del ingreso', example: 'Mensual' })
  @Column({ nullable: true })
  etiqueta: string;

  @ApiPropertyOptional({ description: 'Comentario sobre el ingreso', example: 'Ingreso mensual de salario' })
  @Column({ type: 'text', nullable: true })
  comentario: string;

  @ApiPropertyOptional({ description: 'Foto del recibo o comprobante', example: 'ruta/a/foto.jpg' })
  @Column({ nullable: true })
  foto: string;

  @ApiProperty({ description: 'ID del presupuesto asociado', example: 1 })
  @Column()
  presupuesto_id: number;

  @ManyToOne(() => Presupuestos, presupuesto => presupuesto.ingresos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'presupuesto_id' })
  presupuesto: Presupuestos;

  @ManyToOne(() => Categorias, categoria => categoria.ingresos, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categorias;
}

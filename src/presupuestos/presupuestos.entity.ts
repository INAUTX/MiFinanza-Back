import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { Ingresos } from '../ingresos/ingresos.entity';
import { Gastos } from '../gastos/gastos.entity';

@Entity()
export class Presupuestos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  icono: string;

  @Column('decimal', { precision: 10, scale: 2 })
  presupuesto_inicial: number;

  @ManyToOne(() => Usuarios, usuario => usuario.presupuestos, { onDelete: 'CASCADE' })
  usuario: Usuarios;

  @OneToMany(() => Ingresos, ingreso => ingreso.presupuesto)
  ingresos: Ingresos[];

  @OneToMany(() => Gastos, gasto => gasto.presupuesto)
  gastos: Gastos[];
}

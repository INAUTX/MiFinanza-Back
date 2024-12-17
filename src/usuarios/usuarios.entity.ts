import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Presupuestos } from '../presupuestos/presupuestos.entity';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @OneToMany(() => Presupuestos, presupuesto => presupuesto.usuario)
  presupuestos: Presupuestos[];
}

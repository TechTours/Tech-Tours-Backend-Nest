/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('activities') // Specify the table name
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  animal: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @Column()
  longitude: string;

  @Column()
  latitude: string;
}

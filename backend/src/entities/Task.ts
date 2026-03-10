import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cohort } from './Cohort';
import { User } from './User';
import { TaskStatus } from '../enums';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO, nullable: false })
  status!: TaskStatus;

  @ManyToOne(() => Cohort, (cohort) => cohort.tasks, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'cohort_id' })
  cohort!: Cohort;

  @Column({ type: 'uuid', nullable: false })
  cohort_id!: string; // Explicit column for foreign key

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'assignee_id' })
  assignee!: User | null;

  @Column({ type: 'uuid', nullable: true })
  assignee_id!: string | null; // Explicit column for foreign key

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at!: Date;
}
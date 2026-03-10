import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from './Task';
import { CohortMember } from './CohortMember';

@Entity('cohorts')
export class Cohort {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  updated_at!: Date;

  @OneToMany(() => Task, (task) => task.cohort)
  tasks!: Task[];

  @OneToMany(() => CohortMember, (cohortMember) => cohortMember.cohort)
  cohortMembers!: CohortMember[];
}
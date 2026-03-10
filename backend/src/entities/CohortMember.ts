import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Cohort } from './Cohort';
import { MemberRole } from '../enums';

@Entity('cohort_members')
export class CohortMember {
  @PrimaryColumn({ type: 'uuid' })
  user_id!: string;

  @PrimaryColumn({ type: 'uuid' })
  cohort_id!: string;

  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.MEMBER, nullable: false })
  role!: MemberRole;

  @ManyToOne(() => User, (user) => user.cohortMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Cohort, (cohort) => cohort.cohortMembers, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'cohort_id' })
  cohort!: Cohort;
}
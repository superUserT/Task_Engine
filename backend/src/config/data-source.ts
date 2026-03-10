import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Cohort } from '../entities/Cohort';
import { Task } from '../entities/Task';
import { CohortMember } from '../entities/CohortMember';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Set to true for development, false for production
  logging: false,
  entities: [User, Cohort, Task, CohortMember],
  migrations: [],
  subscribers: [],
});
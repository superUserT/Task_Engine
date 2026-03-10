-- AI-Augmented Task Engine Schema
-- This schema is designed for PostgreSQL and is based on the project description.
-- It establishes the core tables: Users, Cohorts, and Tasks, with a focus on relational integrity.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define custom types (ENUMs) for controlled vocabularies.
-- This improves data integrity and makes the schema more self-documenting.
CREATE TYPE member_role AS ENUM ('lead', 'member');
CREATE TYPE task_status AS ENUM ('backlog', 'todo', 'in_progress', 'done');

-- Table: users
-- Stores user information, including credentials for authentication.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: cohorts
-- Represents a "Team Sprint" or a group of users working together.
CREATE TABLE cohorts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: cohort_members (Join Table)
-- Maps users to cohorts, establishing a many-to-many relationship.
-- The 'role' column can distinguish between different levels of responsibility (e.g., Junior Lead).
CREATE TABLE cohort_members (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    role member_role NOT NULL DEFAULT 'member',
    PRIMARY KEY (user_id, cohort_id)
);

-- Table: tasks
-- The core entity for work items. Each task belongs to a cohort and can be assigned to a user.
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'todo',
    cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL, -- A task can be unassigned
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance on frequently queried columns (foreign keys).
CREATE INDEX idx_tasks_cohort_id ON tasks(cohort_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_cohort_members_user_id ON cohort_members(user_id);
CREATE INDEX idx_cohort_members_cohort_id ON cohort_members(cohort_id);

-- Trigger to automatically update the 'updated_at' timestamp on row modification.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cohorts_updated_at BEFORE UPDATE ON cohorts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

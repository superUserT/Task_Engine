import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById } from '../services/taskService';
import { Task } from '../types/Task';
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const taskData = await getTaskById(id);
          setTask(taskData);
        } catch (error) {
          console.error('Failed to fetch task', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!task) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          Task not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardHeader title={task.title} />
        <CardContent>
          <Typography variant="body1">
            <strong>Status:</strong> {task.status}
          </Typography>
          <Typography variant="body1">
            <strong>Description:</strong> {task.description}
          </Typography>
          {task.assignee && (
            <Typography variant="body1">
              <strong>Assignee:</strong> {task.assignee.name}
            </Typography>
          )}
          {task.cohort && (
            <Typography variant="body1">
              <strong>Cohort:</strong> {task.cohort.name}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskPage;

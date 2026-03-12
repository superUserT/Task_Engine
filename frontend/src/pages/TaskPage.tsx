import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById } from '../services/taskService';
import { Task } from '../types/Task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const taskData = await getTaskById(id);
          setTask(taskData);
        } catch (error) {
          console.error('Failed to fetch task', error);
        }
      }
    };
    fetchTask();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          {task.assignee && (
            <p>
              <strong>Assignee:</strong> {task.assignee.name}
            </p>
          )}
          {task.cohort && (
            <p>
              <strong>Cohort:</strong> {task.cohort.name}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPage;

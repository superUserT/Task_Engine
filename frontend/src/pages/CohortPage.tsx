import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCohortById } from '../services/cohortService';
import { Cohort } from '../types/Cohort';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CohortPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cohort, setCohort] = useState<Cohort | null>(null);

  useEffect(() => {
    const fetchCohort = async () => {
      if (id) {
        try {
          const cohortData = await getCohortById(id);
          setCohort(cohortData);
        } catch (error) {
          console.error('Failed to fetch cohort', error);
        }
      }
    };
    fetchCohort();
  }, [id]);

  if (!cohort) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{cohort.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mt-4 mb-2">Tasks</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohort.tasks?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.assignee?.name || 'Unassigned'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 className="text-xl font-bold mt-4 mb-2">Members</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohort.cohortMembers?.map((member) => (
                <TableRow key={member.user.id}>
                  <TableCell>{member.user.name}</TableCell>
                  <TableCell>{member.user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CohortPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCohortById } from '../services/cohortService';
import { Cohort } from '../types/Cohort';
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const CohortPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCohort = async () => {
      if (id) {
        try {
          const cohortData = await getCohortById(id);
          setCohort(cohortData);
        } catch (error) {
          console.error('Failed to fetch cohort', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCohort();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!cohort) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          Cohort not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardHeader title={cohort.name} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tasks
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Assignee</TableCell>
                </TableRow>
              </TableHead>
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
          </TableContainer>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Members
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cohort.cohortMembers?.map((member) => (
                  <TableRow key={member.user.id}>
                    <TableCell>{member.user.name}</TableCell>
                    <TableCell>{member.user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CohortPage;

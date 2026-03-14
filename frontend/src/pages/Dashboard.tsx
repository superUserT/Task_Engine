import React, { useEffect, useState } from 'react';
import { getCohorts, createCohort } from '../services/cohortService';
import { getTasks } from '../services/taskService';
import { getUsers } from '../services/userService';
import { Cohort } from '../types/Cohort';
import { Task } from '../types/Task';
import { User } from '../types/User';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const Dashboard: React.FC = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newCohortName, setNewCohortName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cohortsData, tasksData, usersData] = await Promise.all([
          getCohorts(),
          getTasks(),
          getUsers(),
        ]);
        setCohorts(cohortsData);
        setTasks(tasksData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCohort = await createCohort({ name: newCohortName });
      setCohorts([...cohorts, newCohort]);
      setNewCohortName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to create cohort', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader
              title="Cohorts"
              action={
                <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                  Create Cohort
                </Button>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cohorts.map((cohort) => (
                      <TableRow key={cohort.id}>
                        <TableCell>{cohort.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Tasks" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Users" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create New Cohort</DialogTitle>
        <form onSubmit={handleCreateCohort}>
          <DialogContent>
            <DialogContentText>
              Enter a name for your new cohort.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cohort Name"
              type="text"
              fullWidth
              value={newCohortName}
              onChange={(e) => setNewCohortName(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;

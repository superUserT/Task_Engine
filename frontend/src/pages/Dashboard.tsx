import React, { useEffect, useState } from 'react';
import { getCohorts, createCohort } from '../services/cohortService';
import { Cohort } from '../types/Cohort';

const Dashboard: React.FC = () => {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [newCohortName, setNewCohortName] = useState('');

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const data = await getCohorts();
        setCohorts(data);
      } catch (error) {
        console.error('Failed to fetch cohorts', error);
      }
    };
    fetchCohorts();
  }, []);

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCohort = await createCohort({ name: newCohortName });
      setCohorts([...cohorts, newCohort]);
      setNewCohortName('');
    } catch (error) {
      console.error('Failed to create cohort', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Your Cohorts</h3>
      <ul>
        {cohorts.map((cohort) => (
          <li key={cohort.id}>{cohort.name}</li>
        ))}
      </ul>
      <form onSubmit={handleCreateCohort}>
        <h3>Create New Cohort</h3>
        <input
          type="text"
          value={newCohortName}
          onChange={(e) => setNewCohortName(e.target.value)}
          placeholder="Cohort Name"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Dashboard;

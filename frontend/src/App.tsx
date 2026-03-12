import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import TaskPage from './pages/TaskPage';
import CohortPage from './pages/CohortPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/cohort/:id" element={<CohortPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

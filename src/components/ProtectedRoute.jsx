import { Navigate } from 'react-router-dom';
import { twilioAuth } from '../services/auth';

export default function ProtectedRoute({ children }) {
  if (!twilioAuth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
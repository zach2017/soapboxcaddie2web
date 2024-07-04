import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import LaundryForm from './pages/protected/LaundryForm';
import ProtectedPage2 from './pages/protected/ProtectedPage2';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected1" element={
          <ProtectedRoute>
            <LaundryForm />
          </ProtectedRoute>
        } />
        <Route path="/protected2" element={
          <ProtectedRoute>
            <ProtectedPage2 />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  );
}

export default App;

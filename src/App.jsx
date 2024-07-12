import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

import LaundryForm from './pages/protected/LaundryForm';
import ProtectedPage2 from './pages/protected/ProtectedPage2';
import Login from './pages/Login';
import TopMenu from './components/TopMenu';

function App() {
  return (
    <div class="row justify-content-center align-items-center" >
      <TopMenu/>
      <div class="container d-flex justify-content-center align-items-center">
        <img src="logo.PNG" alt="Laundry Bag" class="img-fluid" />
      </div>
      <div class="container d-flex justify-content-center ">
        <h2>Choose Peace, Not Laundry.</h2>
        
      </div>
      <div >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/laundryservice" element={
            <ProtectedRoute>
              <LaundryForm />
            </ProtectedRoute>
          } />
          <Route path="/caddieservice" element={
            <ProtectedRoute>
              <ProtectedPage2 />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
      </div>
    </div>
  );
}

export default App;

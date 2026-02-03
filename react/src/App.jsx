import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewLogin from './pages/NewLogin';
import NewRegister from './pages/NewRegister';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newregister" element={<NewRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
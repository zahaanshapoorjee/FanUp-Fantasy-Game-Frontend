import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import FantasyGames from './Pages/FantasyGame/FantasyGame';
import Home from './Pages/Home/Home';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/fantasy" element={<FantasyGames />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

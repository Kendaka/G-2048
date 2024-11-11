import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Grid from './Components/Grid';
import Header from './Components/Header';
import Login from './Components/Login';
import Leaderboard from './Components/Leaderboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        {isLoggedIn ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Grid />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </Router>
  );
};

export default App;

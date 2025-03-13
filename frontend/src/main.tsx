import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import Play from './MemoryCardGame/Play';
import Congratulations from "./MemoryCardGame/Congratulation";
import CongtEasy from "./MemoryCardGame/Congratseasy";
import CongtNormal from "./MemoryCardGame/Congratsnormal";
import History from "./History/History";
import {GameContextProvider} from "./context/game-context";
import {Difficulty} from "./constants/history";
import MemoryGame from "./MemoryCardGame/MemoryGame";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('token');
  // };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/congratulations"
          element={isAuthenticated ? <Congratulations /> : <Navigate to="/login" />}
        />
     
        <Route path="/congt-easy"
          element={isAuthenticated ? <CongtEasy /> : <Navigate to="/login" />}
        />
        <Route path="/congt-normal"
          element={isAuthenticated ? <CongtNormal /> : <Navigate to="/login" />}
        />
        <Route
           path="/easy"
           element={isAuthenticated ? (
             <GameContextProvider defaultDifficulty={Difficulty.EASY}>
               <MemoryGame />
             </GameContextProvider>
           ) : <Navigate to="/login" />}
        />
        <Route
          path="/medium"
          element={isAuthenticated ? (
            <GameContextProvider defaultDifficulty={Difficulty.NORMAL}>
              <MemoryGame />
            </GameContextProvider>
          ) : <Navigate to="/login" />}
        />
        <Route
          path="/memory-card-game"
          element={isAuthenticated ? (
            <GameContextProvider defaultDifficulty={Difficulty.HARD}>
              <MemoryGame />
            </GameContextProvider>
          ) : <Navigate to="/login" />}
        />
        <Route
          path="/play"
          element={isAuthenticated ? <Play /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <History /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import React, { useState, useEffect } from 'react';
import DualForm from './Components/DualForm/DualForm';
import MovieForm from './Components/MovieForm/MovieForm';
import MovieList from './Components/MovieList/MovieList';
import './App.css';

const App = () => {
  const [Movies, setMovies] = useState([]);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (!isAuthenticated)
      return;

  }, [isAuthenticated]);


  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderAuthenticatedApp = () => (
    <>
      <div>
        {isAuthenticated ? `Welcome back ${username}` : " "}
        <MovieForm setMovies={setMovies} />
        <MovieList list={Movies} setMovies={setMovies} />
      </div>
    </>
  );

  return (
    <div className="app">

      {isAuthenticated ? renderAuthenticatedApp() : <DualForm onLoginSuccess={handleAuthSuccess} onRegisterSuccess={handleAuthSuccess} setUsername={setUsername} />}
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import DualForm from './Components/DualForm/DualForm';
import MovieForm from './Components/MovieForm/MovieForm';
import MovieList from './Components/MovieList/MovieList';
import ContactForm from './Components/ContactForm/ContactForm';
import AboutPage from './Components/AboutPage/AboutPage';
import './App.css';

const App = () => {
  const [Movies, setMovies] = useState([]);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (!isAuthenticated)
      return;

      fetch(`${process.env.REACT_APP_EXPRESS_URL}/index/movies/`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not OK');
        }
        return resp.json();
      })
      .then((data) => {
        setMovies(data);
      }).catch((e) => {
        console.log(e)
      })

  }, [isAuthenticated]);


  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderAuthenticatedApp = () => (
    <>
      <div>
        {isAuthenticated ? `Welcome back ${username}` : " "}
        <MovieForm setMovies={setMovies}/>
        <MovieList list={Movies} setMovies={setMovies} />
        <ContactForm setContact={setContact}/>
        <AboutPage/>
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
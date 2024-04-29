import React, { useState } from 'react';

const MovieForm = ({ setMovies }) => {
    const [moviename, setMovieName] = useState('');
    const [movierating, setMovieRating] = useState('');
    const [movienotes, setMovieNotes] = useState('');

    const handleChangeTitle = (e) => {
        setMovieName(e.target.value);
    }; //handle changer for the form object

    const handleChangeRating = (e) => {
        setMovieRating(e.target.value);
    };

    const handChangeNotes = (e) => {
        setMovieNotes(e.target.value);
    };

    const createMovie = () => {
        if(!setMovieName) return; //no empty movies
        if(!setMovieRating) return;
        if(!setMovieNotes) return;

        const movie = {
            name : moviename,
            rating : movierating,
            notes : movienotes 
        };

        fetch(`${process.env.REACT_APP_EXPRESS_URL}/index/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            setMovies(Movies => [...Movies, data]);
            setMovieName('');
            setMovieRating('');
            setMovieNotes('');
            setMessage('Info Sent, Thank You!');
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <div className='dataform'>
            <input
                type='text'
                value={moviename}
                onChange={handleChangeTitle}
                placeholder='Title'
                required
            />
            <input
                type='number'
                value={movierating}
                onChange={handleChangeRating}
                placeholder='Rating, 1-10'
                required
            />
            <input
                type='text'
                value={movienotes}
                onChange={handChangeNotes}
                placeholder='Notes'
                required 
            />
            <button onClick={createMovie}>Add Movie</button>
        </div>
    );
};

export default MovieForm;
import React from 'react';
import Movie from "../Movie/Movie";

const MovieList = ({ list, setMovies }) => {
    const onDelete = (id) => {
        fetch(`${process.env.REACT_APP_EXPRESS_URL}/index/movies/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.status === 204 ? null : response.json();
        }).then(() => {
            setMovies(list.filter(movie => movie._id !== id));
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <ul className="movie-list">
            {
                list.map((movie, index) => {
                    return <Movie key={movie._id} id={movie._id} value={movie} onDelete={() => onDelete(movie._id)} />
                })
            }
        </ul>
    );
};

export default MovieList;
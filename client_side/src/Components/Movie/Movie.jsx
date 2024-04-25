import React from 'react';

const Movie = ({ id, value, onDelete }) => {
    return (
        <li>
            <span className="moviename">{value.name}</span>
            <span className="movierating">{value.rating}</span>
            <span className="movienotes">{value.notes}</span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default Movie;
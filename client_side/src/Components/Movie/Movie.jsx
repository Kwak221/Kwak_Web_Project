import React from 'react';

const Movie = ({ id, value, onDelete }) => {
    return (
        <li>
            <span className="moviename">Title: {value.name}</span><br/>
            <span className="movierating">Rating: {value.rating} out of 10</span><br/>
            <span className="movienotes">Notes: {value.notes}</span><br/>
            <button onClick={onDelete}>Delete</button><br/><br/>
        </li>
    );
};

export default Movie;
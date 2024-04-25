import React, { useState } from 'react';


const MovieForm = ({ setMovies }) => {
    const [newMovie, setNewMovie] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        ating: '',
        notes: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createMovie = () => {
        if (!newMovie) return; // Don't add empty tasks
        const movie = { 
            name: formData.name,
            rating: formData.rating,
            notes: formData.notes
        };

        fetch(`${process.env.EXPRESS_URL}/index/movies`, {
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
            setMovies(movie => [movie, data]);
            setNewMovie('');
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={createMovie}>
                <input
                    name="moviename"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                />
                <input
                    rating="movierating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="Rating Out of 10"
                    required
                />
                <input
                    notes="movienotes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Notes"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MovieForm;
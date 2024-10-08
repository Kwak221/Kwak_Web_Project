import React, { useState } from 'react';

function Register({ onRegisterSuccess, setUsername }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            setMessage('Registration Succes!');
            onRegisterSuccess();
            setUsername(data.user.username);
        }).catch(err => {
            setMessage('Error in Registration. Please Try Again');
            console.error('Login error', err);
        });

    };

    return (
        <div>
            <h2>Sign-up</h2>
            {message && <p>{message}</p>}
            <form onSubmit={registerUser}>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                />
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
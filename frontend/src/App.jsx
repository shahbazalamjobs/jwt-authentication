// frontend/src/components/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLoggedInUser(response.data.username);
            } catch (error) {
                console.error('Fetch user data error:', error.response.data.message);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Login error:', error.response.data.message);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password });
            console.log(response.data.message); // Display success message
        } catch (error) {
            console.error('Signup error:', error.response.data.message);
        }
    };

    const handleLogout = () => {
        setToken('');
        setLoggedInUser('');
    };

    return (
        <div>
            {token ? (
                <div>
                    <p>Welcome, {loggedInUser}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>Signup</button>
                </div>
            )}
        </div>
    );
}

export default App;

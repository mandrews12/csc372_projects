// Component to handle user login and signup using Supabase authentication

import { data } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useState } from 'react';

export default function LoginModal({ isOpen, setIsOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    }

    // API call to handle user login using Supabase authentication
    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
        } else {
            console.log('Login successful:', data);
            closeModal();
        }
    }

    // API call to handle user signup using Supabase authentication
    async function handleSignup() {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) {
            console.log(error);
            setError(error.message);
        } else {
            closeModal();
        }
    }

    if (!isOpen) return null;

    // Modal content for login and signup forms that toggles based on the isSignup state variable
    return (
        <div className="login-modal">
            <div className="login-modal-content">
                <span className="close" onClick={closeModal}>x</span>

                {!isSignup ? (
                    <>
                        <h2>Welcome Back</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button onClick={handleLogin}>Login</button>
                        
                        <hr></hr>
                        <p>
                            Don't have an account?
                            <button onClick={() => setIsSignup(true)}>Sign up</button>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Create Account</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button onClick={handleSignup}>Sign Up</button>

                        <hr></hr>
                        <p>
                            Already have an account?{" "}
                            <button onClick={() => setIsSignup(false)}>Log in</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.error('Error signing up:', error);
    else console.log('User signed up:', user);
  };

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) console.error('Error logging in:', error);
    else console.log('User logged in:', user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up / Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 rounded mb-2">Sign Up</button>
      <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">Login</button>
    </div>
  );
};

export default Auth;
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('Student');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]); // State for storing country list
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch country list from an API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchCountries();
  }, []);

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    if (isSignUp && (!name || !phoneNumber || !country)) {
      setError('Name, phone number, and country are required for sign-up.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError('');

    if (!validateForm()) return;

    try {
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      const user = signUpData.user;

      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, name, phone_number: phoneNumber, email, status, country }]);

        if (profileError) throw profileError;

        console.log('Profile created successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    setError('');

    if (!validateForm()) return;

    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const user = loginData.user;

      if (user) {
        console.log('User logged in successfully');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
            </select>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {countries.map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </>
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={isSignUp ? handleSignUp : handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out mb-4"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
        
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 hover:underline"
        >
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;

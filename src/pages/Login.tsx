import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon, FacebookIcon } from '../components/Icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to log in with Google');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      navigate('/');
    } catch (error) {
      setError('Failed to log in with Facebook');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-4">
          Login
        </button>
      </form>
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
        >
          <GoogleIcon className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <FacebookIcon className="h-5 w-5 mr-2" />
          Sign in with Facebook
        </button>
      </div>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-800">Register</Link>
      </p>
    </div>
  );
};

export default Login;
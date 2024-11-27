import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const LoginModal = () => {
  const { setShowLogin, setShowRegister, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    api
      .post('/login', { username, password })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setIsAuthenticated(true);
        setShowLogin(false);
      })
      .catch((error) => {
        setError(error.response?.data?.error || 'Login failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded shadow-md w-80 relative">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-2 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue text-white w-full py-2 rounded mb-2"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <button
            onClick={handleSwitchToRegister}
            className="text-blue underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

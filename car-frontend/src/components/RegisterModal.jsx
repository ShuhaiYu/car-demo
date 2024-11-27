import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';

const RegisterModal = () => {
  const { setShowRegister, setShowLogin } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setLoading(true);
    api
      .post('/register', { username, password })
      .then(() => {
        alert('Registration successful!');
        setShowRegister(false);
        setShowLogin(true);
      })
      .catch((error) => {
        setError(error.response?.data?.error || 'Registration failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded shadow-md w-80 relative">
        <button
          onClick={() => setShowRegister(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Register</h2>
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
          onClick={handleRegister}
          className="bg-green-500 text-white w-full py-2 rounded mb-2"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center">
          Already have an account?{' '}
          <button
            onClick={handleSwitchToLogin}
            className="text-blue underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;

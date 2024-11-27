import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL || 'http://localhost:3000',
});

// Add a request interceptor to include the Access Token in the Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 and 403 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post('http://localhost:3000/refresh', {
          refreshToken,
        });

        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);

        // Retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Redirect to the home page if the refresh token is invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

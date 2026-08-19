// API Base URL - uses environment variable or defaults to localhost
// In production (Vercel), this will be the same domain (e.g., https://your-app.vercel.app/api)
// In development, it defaults to http://localhost:3000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_BASE_URL;

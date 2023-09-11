import axios from 'axios';
// import type to import interfaces
import type { Degree } from '@/api/types';

const getDegrees = async () => {
  // const baseUrl = import.meta.env.VITE_APP_API_URL;
  const baseUrl = 'http://localhost:3000';
  const url = `${baseUrl}/degrees`;
  // <J> generic type
  const response = await axios.get<Degree[]>(url);
  return response.data;
};

export default getDegrees;

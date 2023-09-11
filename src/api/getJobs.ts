import axios from 'axios';
// import type to import interfaces
import type { Job } from '@/api/types';

const getJobs = async () => {
  // const baseUrl = import.meta.env.VITE_APP_API_URL;
  const baseUrl = 'http://localhost:3000';
  const url = `${baseUrl}/jobs`;
  // <J> generic type
  const response = await axios.get<Job[]>(url);
  return response.data;
};

export default getJobs;

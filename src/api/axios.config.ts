import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosConfig = (
  requireToken: boolean,
  contentType = 'application/json',
): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: 'https://winwin-media.com/api/app', // Replace with your API base URL
    timeout: 10000, // Set a timeout for requests (optional)
    headers: {
      'Content-Type': contentType, // Set common headers
      Accept: 'application/json',
    },
  });

  apiClient.interceptors.request.use(
    async config => {
      if (requireToken) {
        const token = await getToken(); // Replace with your token fetching logic
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return apiClient;
};

const getToken = async (): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem('data');
    const token = data && JSON.parse(data).token;
    return token;
  } catch (error) {
    console.error('Failed to fetch token', error);
    return null;
  }
};

export default axiosConfig;

import axios from 'axios';

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface RegisterResponse {
  message: string;
  data: {
    user_id: string;
    full_name: string;
    email: string;
  };
}

const API_URL = '/api/auth';

export const authService = {
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },
};

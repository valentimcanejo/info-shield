import axios from "axios";

type RegisterData = {
  email: string;
  password: string;
};

export const register = async ({ email, password }: RegisterData) => {
  try {
    const response = await axios.post(`http://192.168.0.2:3001/users`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

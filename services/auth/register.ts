import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

type RegisterProps = {
  email: string;
  password: string;
};

export const register = async ({ email, password }: RegisterProps) => {
  try {
    const response = await api.post("http://192.168.0.2:3001/register", {
      email,
      password,
    });

    await AsyncStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

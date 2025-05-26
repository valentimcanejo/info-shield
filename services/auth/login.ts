import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await api.post("/login", { email, password });
    await AsyncStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { validarToken } from "../services/auth/validateToken";

const AuthContext = createContext<{
  setLogado: any;
  session?: string | null;
  logado: string;
}>({
  session: null,
  setLogado: () => null,
  logado: "",
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [logado, setLogado] = useState("");

  const verifyToken = async () => {
    try {
      const storageLogado = await AsyncStorage.getItem("token");
      console.log("storageLogado", storageLogado);
      if (storageLogado) {
        const tokenValidado = await validarToken({ token: storageLogado });

        if (tokenValidado) {
          setLogado(tokenValidado);
          router.replace("/");
        } else {
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
      router.replace("/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logado,
        setLogado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

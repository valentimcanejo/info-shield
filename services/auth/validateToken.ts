import api from "./api";

type ValidateTokenProps = {
  token: string;
};

export async function validarToken({ token }: ValidateTokenProps) {
  try {
    const response = await api.get("/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      console.log("Token válido:", data);
      return token;
    } else {
      console.log("Token inválido ou expirado");
      return null;
    }
  } catch (error) {
    console.log("Erro ao validar token:", error);
    return null;
  }
}

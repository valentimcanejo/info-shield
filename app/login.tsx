import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import ChangeThemeButton from "../components/change-theme-button";
import { Button, ButtonText } from "../components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../components/ui/form-control";
import { Input, InputField } from "../components/ui/input";
import { CustomText } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
import { login } from "../services/auth/login";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await login({ email, password });
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="items-center justify-center flex-1 px-4 bg-background">
      <View className="absolute z-10 top-16 right-6">
        <ChangeThemeButton />
      </View>

      <VStack className="items-center w-full space-y-8">
        <VStack className="items-center" space="lg">
          <CustomText className="text-3xl font-bold text-primary-500">
            Entrar
          </CustomText>
          <CustomText className="text-xl font-bold">Bem Vindo!</CustomText>
        </VStack>

        <VStack className="items-center w-full" space="xl">
          <FormControl className="w-full">
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Digite o email..."
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Senha</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="Digite a senha..."
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Input>
          </FormControl>

          <Button className="mt-4" shadow fullWidth onPress={handleSubmit}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <Button
            variant="link"
            fullWidth
            onPress={() => router.push("/register")}
          >
            <CustomText>Cadastrar-se</CustomText>
          </Button>
        </VStack>
      </VStack>

      <Toast />
    </View>
  );
}

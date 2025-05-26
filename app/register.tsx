import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { Button, ButtonText } from "../components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../components/ui/form-control";
import { Input, InputField } from "../components/ui/input";
import { CustomText } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
//import { register } from "../services/auth";
import { register } from "../services/auth/register";
import { getErrorMessage } from "../utils/errorHandler";

const schema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data: any) => data.senha === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register: registerInput,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await register({ email, password });
      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso",
      });
      router.replace("/login");
    } catch (error: any) {
      console.log(error);

      const errorMessage = getErrorMessage(error);

      Toast.show({
        type: "error",
        text1: errorMessage,
      });
    }
  };

  return (
    <VStack className="items-center flex-1 w-full p-4 justify-evenly">
      <VStack className="items-center" space="lg">
        <CustomText className="text-4xl font-bold text-primary-500">
          Cadastrar Conta
        </CustomText>
        <CustomText className="font-bold ">
          Cadastrar-se com email e senha
        </CustomText>
      </VStack>
      <VStack className="items-center w-full" space="xl">
        <FormControl className="w-full" isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              placeholder="Digite o email..."
              onChangeText={(text) => setValue("email", text)}
              {...registerInput("email")}
            />
          </Input>
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </FormControl>

        <FormControl className="w-full" isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText>Senha</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              secureTextEntry
              placeholder="Digite a senha..."
              onChangeText={(text) => setValue("password", text)}
              {...registerInput("password")}
            />
          </Input>
          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}
        </FormControl>

        <FormControl className="w-full" isInvalid={!!errors.confirmPassword}>
          <FormControlLabel>
            <FormControlLabelText>Confirmar Senha</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              secureTextEntry
              placeholder="Digite a senha novamente..."
              onChangeText={(text) => setValue("confirmPassword", text)}
              {...registerInput("confirmPassword")}
            />
          </Input>
          {errors.confirmPassword && (
            <Text className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}
        </FormControl>

        <Button
          className="mt-4"
          shadow
          fullWidth
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>Cadastrar-se</ButtonText>
        </Button>
        <Button variant="link" fullWidth onPress={() => router.back()}>
          <CustomText>Já possui uma conta</CustomText>
        </Button>
      </VStack>

      <Toast />
    </VStack>
  );
}

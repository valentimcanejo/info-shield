import { router } from "expo-router";

import { useState } from "react";
import Toast from "react-native-toast-message";
import { Button, ButtonText } from "../components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../components/ui/form-control";
import { Input, InputField } from "../components/ui/input";
import { CustomText } from "../components/ui/text";
import { VStack } from "../components/ui/vstack";
//import { login } from "../services/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    try {
      console.log(email, senha);

      //await login({ email, senha });
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <VStack className="items-center flex-1 w-full p-4 justify-evenly">
      <VStack className="items-center " space="lg">
        <CustomText className="text-3xl font-bold text-primary-500">
          Entrar
        </CustomText>
        <CustomText className="text-xl font-bold">Bem Vindo!</CustomText>
      </VStack>
      <VStack className="items-center w-full" space="xl">
        <FormControl
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className="w-full"
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 ">
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
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
          </Input>
          {/* <FormControlHelper>
            <FormControlHelperText>
              Must be atleast 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError> */}
        </FormControl>
        <Button className="mt-4 " shadow fullWidth onPress={handleSubmit}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <Button
          variant="link"
          fullWidth
          //onPress={() => router.push("/register")}
        >
          <CustomText>Cadastrar-se</CustomText>
        </Button>
      </VStack>

      <Toast />
    </VStack>
  );
}

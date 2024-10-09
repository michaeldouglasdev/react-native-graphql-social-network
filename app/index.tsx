//import "react-native-gesture-handler";
import { Button } from "@/components/button/button";
import { Container } from "@/components/grid/container";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import { TextInput } from "@/components/input/text-input";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  MeDocument,
} from "@/graphql/__generated__/graphql";
import { StorageService } from "@/services/storage.service";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
}
const LoginScreen: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginForm>();
  const [loginFunc, loginData] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  console.log("loginData", loginData);
  const handleLogin = () => {
    loginFunc({
      variables: {
        data: {
          username: "MD",
          password: "123456",
        },
      },
      update: async (cache, { data }) => {
        console.log("update");
        console.log("update data", data, cache);
        if (data) {
          cache.writeQuery({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data.login.user,
            },
          });

          await StorageService.setItem("TOKEN_AUTH", data.login.accessToken);
        }
      },
    });
  };
  return (
    <Container>
      <VBox>
        <TextInput name="username" label="Username" control={control} />

        <VSeparator />
        <TextInput
          name="password"
          label="Password"
          secureTextEntry
          control={control}
        />

        <VSeparator />
        <Button title="Login" onPress={handleLogin} />
      </VBox>
    </Container>
  );
};

export default LoginScreen;

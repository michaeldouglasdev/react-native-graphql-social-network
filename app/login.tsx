//import "react-native-gesture-handler";
import { Button } from "@/components/button/button";
import { Container } from "@/components/grid/container";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import { TextInput } from "@/components/input/text-input";
import { graphql } from "@/graphql/__generated__";
import { LoginDocument } from "@/graphql/__generated__/graphql";
import { MeQuery } from "@/hooks/me.query.hook";
import { StorageService } from "@/services/storage.service";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { Link } from "@/components/link/link.component";

export const LoginMutation = graphql(`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        id
        name
        username
        email
        role
        avatar
      }
      accessToken
      expirationTime
    }
  }
`);
interface LoginForm {
  username: string;
  password: string;
}
const LoginScreen: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginForm>();
  const [loginMutation] = useMutation(LoginDocument);

  const handleLogin: SubmitHandler<LoginForm> = (form) => {
    loginMutation({
      variables: {
        data: {
          username: form.username,
          password: form.password,
        },
      },
      update: async (cache, { data }) => {
        if (data) {
          cache.writeQuery({
            query: MeQuery,
            data: {
              __typename: "Query",
              me: data.login.user,
            },
          });

          await Promise.all([
            StorageService.setItem("ME", data.login.user),
            StorageService.setItemString("TOKEN_AUTH", data.login.accessToken),
          ]);
        }
      },
    });
  };
  return (
    <Container safe>
      <VBox vMargin="large">
        <Text style={styles.heading}>To get started, enter your data</Text>

        <VSeparator size="xlarge" />
        <TextInput name="username" label="Username" control={control} />

        <VSeparator size="large" />
        <TextInput
          name="password"
          label="Password"
          secureTextEntry
          control={control}
        />

        <VSeparator size="large" />
        <Button
          title="Login"
          onPress={handleSubmit(handleLogin)}
          variant="primary"
        />
        <VBox alignItems="center" vMargin="large">
          {/** TODO href */}
          <Link title="Forgot password?" href="/(authenticated)" />
        </VBox>
      </VBox>
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "InterBold",
    fontSize: 24,
    color: "#fff",
  },
});

export default LoginScreen;

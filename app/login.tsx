//import "react-native-gesture-handler";
import { Button } from "@/components/button/button";
import { Container } from "@/components/grid/container";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import { TextInput } from "@/components/input/text-input";
import { getFragmentData, graphql } from "@/graphql/__generated__";
import { LoginDocument } from "@/graphql/__generated__/graphql";
import { MeQuery } from "@/hooks/me.query.hook";
import { StorageService } from "@/services/storage.service";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { Link } from "@/components/link/link.component";
import { HBox } from "@/components/grid/hbox";
import { useLoginMutation } from "@/hooks/login.mutation.hook";

interface LoginForm {
  username: string;
  password: string;
}
const LoginScreen: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginForm>();
  const { loginMutation } = useLoginMutation();

  const handleLogin: SubmitHandler<LoginForm> = (form) => {
    loginMutation({
      variables: {
        dataLogin: {
          username: form.username,
          password: form.password,
        },
      },
    });
  };
  return (
    <Container safe>
      <VBox vMargin="large">
        <Text style={styles.heading}>To get started, enter your data</Text>

        <VSeparator size="xlarge" />
        <TextInput
          name="username"
          label="Username"
          control={control}
          autoCapitalize="none"
        />

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

          <HBox justifyContent="center">
            <Text style={styles.spanLink}>Don't have an account yet? {""}</Text>
            <Link title="Create one" href="/create-account" underscore />
          </HBox>
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
  spanLink: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#aaa",
  },
});

export default LoginScreen;

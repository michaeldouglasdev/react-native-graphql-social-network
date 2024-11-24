import { Button } from "@/components/button/button";
import { Container } from "@/components/grid/container";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import { TextInput } from "@/components/input/text-input";
import { getFragmentData, graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
//import { LoginMutationFragment } from "./login";
import { MeQuery } from "@/hooks/me.query.hook";
import { StorageService } from "@/services/storage.service";
import { useLoginMutation } from "@/hooks/login.mutation.hook";

const CreateAccountScreen_Mutation = graphql(`
  mutation CreateUserAndLogin(
    $dataCreateUser: CreateUserInput!
    $dataLogin: LoginInput!
  ) {
    createUser(data: $dataCreateUser) {
      id
      ...UserAvatar
    }
    ...LoginMutationFragment
  }
`);

type CreateAccountForm = {
  name: string;
  email: string;
  username: string;
  password: string;
};
const CreateAccountScreen: React.FC = () => {
  const { control, handleSubmit } = useForm<CreateAccountForm>();
  const [createUser] = useMutation(CreateAccountScreen_Mutation);
  const { loginMutationUpdate } = useLoginMutation();

  const handleCreateAccount: SubmitHandler<CreateAccountForm> = (form) => {
    const { name, email, password, username } = form;
    createUser({
      variables: {
        dataCreateUser: {
          name,
          email,
          username,
          password,
        },
        dataLogin: {
          username,
          password,
        },
      },
    });
  };
  return (
    <Container>
      <VBox vPadding="large">
        <TextInput name="name" label="Name" control={control} />
        <VSeparator size="large" />

        <TextInput
          name="email"
          label="Email"
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <VSeparator size="large" />

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
          title="Create Account"
          onPress={handleSubmit(handleCreateAccount)}
          variant="primary"
        />
      </VBox>
    </Container>
  );
};

export default CreateAccountScreen;

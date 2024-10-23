import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Container } from "@/components/grid/container";
import { Button } from "@/components/button/button";
import { Avatar } from "@/components/avatar/avatar.component";
import { useRouter } from "expo-router";
import { graphql } from "@/graphql/__generated__";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputArea } from "@/components/input-area/input-area.component";
import { useMeQuery } from "@/hooks/me.query.hook";

/*const CreatePost_MutationFragment = graphql(`
    fragment CreatePost_MutationFragment on Mutation {
      
    }
  `)*/

type FormField = {
  content: string;
};

const CreatePost_Mutation = graphql(`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      ...PostItem
    }
  }
`);

const CreatePostScreen: React.FC = () => {
  const router = useRouter();
  const [createPostMutation] = useMutation(CreatePost_Mutation);
  const { control, handleSubmit, formState } = useForm<FormField>();
  const { isDirty, isValid } = formState;
  const { data } = useMeQuery();

  const handleGoBack = () => {
    router.back();
  };

  const handleCreatePost: SubmitHandler<FormField> = (form) => {
    createPostMutation({
      variables: {
        data: {
          content: form.content,
        },
      },
      onCompleted() {
        router.back();
      },
    });
  };
  return (
    <Container safe>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Button
            title="Post"
            onPress={handleSubmit(handleCreatePost)}
            size="xsmall"
            borderRadius="rounded"
            variant="primary"
            disabled={!isDirty || (isDirty && !isValid)}
          />
        </View>
        <View style={styles.content}>
          <Avatar user={data?.me} />
          <InputArea
            name="content"
            control={control}
            placeholder="What's happening?"
            rules={{ minLength: 1, required: true }}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  cancel: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#FFF",
  },
  content: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 16,
  },
});

export default CreatePostScreen;

import { UserAvatar_UserFragment } from "@/components/avatar/avatar.component";
import { Container } from "@/components/grid/container";
import { Header } from "@/components/header/header.component";
import { TextInput } from "@/components/input/text-input";
import {
  MessageList,
  MessageList_ConversationDetailFragment,
} from "@/components/message/message-list/message-list.component";
import { graphql, useFragment } from "@/graphql/__generated__";
import { useMeQuery } from "@/hooks/me.query.hook";

import { useMutation, useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

export const SendMessage_Mutation = graphql(`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      id
      content
      sender {
        id
        name
        username
        avatar
      }
      createdAt
    }
  }
`);

/*export const ConversationDetailScreen_Query = graphql(`
  query ConversationDetailScreen($dataMessages: MessagesInput!) {
    ...MessagesList
  }
`);*/

export const ConversationDetailScreen_Query = graphql(`
  query ConversationDetailScreen($id: ID!, $dataMessages: MessagesInput!) {
    ...ConversationDetail
  }
`);

type RouteParam = {
  id: string;
};
interface FormField {
  message: string;
}
const ConversationDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<RouteParam>();
  const { control, handleSubmit, reset } = useForm<FormField>();
  const [sendMessage] = useMutation(SendMessage_Mutation);
  const { data } = useQuery(ConversationDetailScreen_Query, {
    variables: {
      id,
      dataMessages: {
        where: {
          conversationId: {
            equals: id,
          },
        },
        connection: {
          last: 20,
        },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const me = useMeQuery();
  const dataUnmasked = useFragment(
    MessageList_ConversationDetailFragment,
    data
  );
  const receiver = dataUnmasked?.conversation.participants.find(
    (participant) => participant.id !== me.data?.me.id
  );

  const handleSubmitMessage: SubmitHandler<FormField> = (form) => {
    sendMessage({
      variables: {
        data: {
          conversationId: id,
          message: form.message,
        },
      },
      update(cache, result) {
        if (result.data) {
          cache.modify({
            id: `ConversationDirect:${id}`,
            fields: {
              messages: (existing = { edges: [] }) => {
                const edge = {
                  cursor: result.data?.sendMessage.id,
                  node: result.data?.sendMessage,
                };

                const edges = [...existing.edges, edge];
                return {
                  ...existing,
                  edges,
                };
              },
            },
          });

          reset();
        }
      },
    });
  };

  return (
    <Container border={false}>
      <Header avatarCenter avatar={receiver} title={receiver?.name} />

      {data ? <MessageList data={data} /> : null}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            name="message"
            border="rounded"
            control={control}
            onSubmitEditing={handleSubmit(handleSubmitMessage)}
            placeholder="Type your text..."
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ConversationDetailScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopColor: "#333333",
    borderTopWidth: 1,
  },
});

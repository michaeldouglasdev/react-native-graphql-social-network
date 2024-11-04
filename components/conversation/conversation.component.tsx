import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import { Avatar } from "../avatar/avatar.component";
import { useMeQuery } from "@/hooks/me.query.hook";
import { HBox } from "../grid/hbox";
import { VBox } from "../grid/vbox";
import { useRouter } from "expo-router";

export const ConversationItemFragment = graphql(`
  fragment ConversationItem on Conversation {
    id
    participants {
      id
      name
      username
      ...UserAvatar
    }
    messages(data: $dataMessages) {
      edges {
        cursor
        node {
          id
          content
          sender {
            id
            name
            username
            ...UserAvatar
          }
          createdAt
        }
      }
    }
  }
`);
type ConversationProps = {
  data: FragmentType<typeof ConversationItemFragment>;
};

export const Conversation: React.FC<ConversationProps> = (props) => {
  const conversation = useFragment(ConversationItemFragment, props.data);
  const { data } = useMeQuery();
  const router = useRouter();
  const receiver = conversation.participants.find(
    (participant) => participant.id != data?.me.id
  );
  if (!conversation || !receiver) {
    return null;
  }
  const lastMessage =
    conversation.messages.edges[conversation.messages.edges.length - 1];

  const lastMessageIsMe = lastMessage.node.sender.id === data?.me.id;

  const handlePress = () => {
    router.navigate({
      pathname: "/(authenticated)/(conversations)/details/[id]",
      params: {
        id: conversation.id,
      },
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Avatar user={receiver} size="large" disabled />
      <VBox>
        <HBox>
          <Text style={styles.name}>{receiver.name}</Text>
          <Text style={styles.username}>@{receiver.username} · </Text>
          <Text style={styles.createdAt}>{lastMessage.node.createdAt}</Text>
        </HBox>
        <Text style={styles.message}>
          {lastMessageIsMe && "You: "}
          {lastMessage.node.content}
        </Text>
      </VBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  name: {
    fontFamily: "InterBold",
    color: "#FFF",
  },
  username: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#aaa",
    marginLeft: 8,
    marginTop: 2,
  },
  createdAt: {
    fontFamily: "Inter",
    fontSize: 12,
    marginTop: 2,
    color: "#aaa",
  },
  message: {
    color: "#CCC",
    marginTop: 2,
  },
});

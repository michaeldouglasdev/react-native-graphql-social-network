import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import {
  Conversation,
  ConversationItemFragment,
} from "../conversation.component";

export const Conversations_QueryFragment = graphql(`
  fragment Conversations_QueryFragment on Query {
    conversations(data: $dataConversations) {
      edges {
        cursor
        node {
          ...ConversationItem
          messages(data: $dataMessages) {
            pageInfo {
              hasPreviousPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`);
type ConversationListProps = {
  data: FragmentType<typeof Conversations_QueryFragment>;
};
export const ConversationList: React.FC<ConversationListProps> = (props) => {
  const data = useFragment(Conversations_QueryFragment, props.data);

  if (!data.conversations) {
    return null;
  }

  const renderItem = (
    data: ListRenderItemInfo<{
      node: FragmentType<typeof ConversationItemFragment>;
    }>
  ) => {
    const conversation = useFragment(ConversationItemFragment, data.item.node);
    return <Conversation data={data.item.node} key={conversation.id} />;
  };

  return (
    <FlatList
      data={data.conversations.edges}
      renderItem={renderItem}
      keyExtractor={(conversation) => conversation.cursor}
    />
  );
};

const styles = StyleSheet.create({});

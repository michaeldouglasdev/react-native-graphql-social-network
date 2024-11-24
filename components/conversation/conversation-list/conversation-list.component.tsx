import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import {
  Conversation,
  ConversationItemFragment,
} from "../conversation.component";
import { Transition } from "@/components/animations/transition.component";
import { VBox } from "@/components/grid/vbox";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Button } from "@/components/button/button";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const data = getFragmentData(Conversations_QueryFragment, props.data);

  if (!data.conversations) {
    return null;
  }

  const renderItem = (
    data: ListRenderItemInfo<{
      node: FragmentType<typeof ConversationItemFragment>;
    }>
  ) => {
    const conversation = getFragmentData(
      ConversationItemFragment,
      data.item.node
    );
    return (
      <Transition index={data.index}>
        <Conversation data={data.item.node} key={conversation.id} />
      </Transition>
    );
  };

  const handleEmptyStateCallToAction = () => {
    router.navigate("/(authenticated)/(conversations)/create");
  };
  return (
    <FlatList
      data={data.conversations.edges}
      renderItem={renderItem}
      keyExtractor={(conversation) => conversation.cursor}
      contentContainerStyle={{ flex: 1 }}
      ListEmptyComponent={() => (
        <View style={styles.emptyStateContainer}>
          <SimpleLineIcons name="ghost" color={"#AAA"} size={64} />

          <Text style={styles.emptyStateText}>
            No conversations yet. Start chatting {"\n"} with your friends!
          </Text>

          <Button
            title="Start a new chat"
            onPress={handleEmptyStateCallToAction}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
    marginHorizontal: 48,
    padding: 16,
    backgroundColor: "#232323",
    borderRadius: 48,
  },
  emptyStateText: {
    marginVertical: 16,
    color: "#CCC",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
  },
});

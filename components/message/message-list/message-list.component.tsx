import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Message, MessageItemFragment } from "../message.component";
import Animated, {
  CurvedTransition,
  FadingTransition,
  JumpingTransition,
  LinearTransition,
} from "react-native-reanimated";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { OrderBy } from "@/graphql/__generated__/graphql";

export const MessageList_ConversationDetailFragment = graphql(`
  fragment ConversationDetail on Query {
    conversation(id: $id) {
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
            ...MessageItem
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
  }
`);
export const MessagesList_PaginationFragment = graphql(`
  query ConversationMessages($dataMessages: MessagesInput!) {
    messages(data: $dataMessages) {
      edges {
        cursor
        node {
          ...MessageItem
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

type MessageListProps = {
  data: FragmentType<typeof MessageList_ConversationDetailFragment>;
};
export const MessageList: React.FC<MessageListProps> = (props) => {
  const data = useFragment(MessageList_ConversationDetailFragment, props.data);
  const [paginate] = useLazyQuery(MessagesList_PaginationFragment);
  const client = useApolloClient();

  const renderItem = (
    data: ListRenderItemInfo<{ node: FragmentType<typeof MessageItemFragment> }>
  ) => {
    const message = useFragment(MessageItemFragment, data.item.node);
    return <Message data={data.item.node} key={message.id} />;
  };

  const handlePagination = () => {
    if (data.conversation.messages.pageInfo.hasPreviousPage) {
      paginate({
        variables: {
          dataMessages: {
            where: {
              conversationId: {
                equals: data.conversation.id,
              },
            },
            connection: {
              last: 10,
              before: data.conversation.messages.pageInfo.startCursor,
            },
            order: {
              createdAt: OrderBy.Asc,
            },
          },
        },
        onCompleted(result) {
          client.cache.modify({
            id: `ConversationDirect:${data.conversation.id}`,
            fields: {
              messages(existing = { edges: [] }) {
                const edges = [...result.messages.edges, ...existing.edges];
                return {
                  ...result.messages,
                  edges,
                };
              },
            },
          });
        },
      });
    }
  };
  return (
    <Animated.FlatList
      onEndReached={handlePagination}
      data={data.conversation.messages.edges}
      renderItem={renderItem}
      keyExtractor={(item) => item.cursor}
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column-reverse",
      }}
      itemLayoutAnimation={LinearTransition}
      inverted
      keyboardDismissMode="interactive"
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

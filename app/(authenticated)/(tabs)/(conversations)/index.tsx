import { StyleSheet } from "react-native";

import { Container } from "@/components/grid/container";
import { Header } from "@/components/header/header.component";
import { FloatingButton } from "@/components/floating-button/floating-button.component";
import { graphql } from "@/graphql/__generated__";
import { useQuery, useSubscription } from "@apollo/client";
import { ConversationList } from "@/components/conversation/conversation-list/conversation-list.component";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { useRouter } from "expo-router";

export const ConversationScreen_ConversationSubscription = graphql(`
  subscription ConversationSubscription($dataMessages: MessagesInput!) {
    conversationSubscribe {
      id
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

export const ConversationsScreen_Query = graphql(`
  query ConversationsScreen(
    $dataConversations: ConversationsInput!
    $dataMessages: MessagesInput!
  ) {
    ...Conversations_QueryFragment
  }
`);
export default function ConversationsScreen() {
  const router = useRouter();

  useSubscription(ConversationScreen_ConversationSubscription, {
    variables: {
      dataMessages: {
        order: {
          createdAt: OrderBy.Asc,
        },
        connection: {
          last: 1,
        },
      },
    },
    onData(data) {
      console.log("conversation subscribe", data);
    },
  });

  const { data } = useQuery(ConversationsScreen_Query, {
    variables: {
      dataConversations: {
        connection: {
          first: 10,
        },
      },
      dataMessages: {
        connection: {
          last: 20,
        },
        order: {
          createdAt: OrderBy.Asc,
        },
      },
    },
    /*onCompleted(data) {
      const { conversations } = getFragmentData(Conversations_QueryFragment, data);
      conversations.edges.map((edge) => {
        const conversation = getFragmentData(ConversationItemFragment, edge.node);

        client.writeQuery<DocumentType<typeof MessagesList_QueryFragment>>({
          query: ConversationDetailScreen_Query,
          variables: {
            dataMessages: {
              where: {
                conversationId: {
                  equals: conversation.id,
                },
              },
              connection: {
                last: 10,
              },
            },
          },
          data: {
            messages: {
              edges: conversation.messages.edges,
              pageInfo: edge.node.messages.pageInfo,
            },
          },
        });
      });
    },*/
  });

  const handlePressFloatingButton = () => {
    router.navigate("/(authenticated)/(conversations)/create");
  };
  return (
    <Container>
      <Header title="Messages" icon="setting" disabledPressAvatar />
      {data ? <ConversationList data={data} /> : null}
      <FloatingButton
        iconName="email-plus-outline"
        onPress={handlePressFloatingButton}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

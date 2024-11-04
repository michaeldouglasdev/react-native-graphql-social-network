import { Container } from "@/components/grid/container";
import { TextInput } from "@/components/input/text-input";
import { UserList } from "@/components/user/user-list/user-list.component";
import {
  DocumentType,
  FragmentType,
  graphql,
  useFragment,
} from "@/graphql/__generated__";
import { OrderBy } from "@/graphql/__generated__/graphql";
import {
  ApolloClient,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ConversationsScreen_Query } from "..";
import { Conversations_QueryFragment } from "@/components/conversation/conversation-list/conversation-list.component";
import { ConversationDetailScreen_Query } from "../details/[id]";

type FormField = {
  search: string;
};

const CreateConversationScreen_SearchQuery = graphql(`
  query SearchUsers($dataUsers: UsersInput!) {
    ...Users_QueryFragment
  }
`);

const CreateConversationScreen_CreateConversationMutation = graphql(`
  mutation CreateConversation(
    $data: CreateConversationInput!
    $dataMessages: MessagesInput!
  ) {
    createConversation(data: $data) {
      id
      createdAt
      participants {
        id
        name
        username
      }
      messages(data: $dataMessages) {
        edges {
          cursor
          node {
            id
            content
            createdAt
            sender {
              id
              name
              username
              avatar
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
  }
`);

const CreateConversationScreen: React.FC = () => {
  const router = useRouter();
  const { control } = useForm<FormField>();
  const [search, { data }] = useLazyQuery(CreateConversationScreen_SearchQuery);
  const [createConversation] = useMutation(
    CreateConversationScreen_CreateConversationMutation
  );
  const client = useApolloClient();
  const handleChangeText = (text: string) => {
    if (text.length > 0) {
      search({
        variables: {
          dataUsers: {
            connection: {
              first: 10,
            },
            where: {
              or: [
                {
                  name: {
                    contains: text,
                  },
                },
                {
                  username: {
                    contains: text,
                  },
                },
              ],
            },
          },
        },
      });
    }
  };

  const handleCreate = (id: string) => {
    console.log("Create init");
    const conversationsMasked = client.readQuery({
      query: ConversationsScreen_Query,
    });

    const conversations = useFragment(
      Conversations_QueryFragment,
      conversationsMasked
    );

    createConversation({
      variables: {
        data: {
          direct: {
            receiverId: id,
          },
        },
        dataMessages: {
          connection: {
            last: 1,
          },
          order: {
            createdAt: OrderBy.Asc,
          },
        },
      },
      update(cache, result) {
        /* if (result.data?.createConversation) {
          const conversationsMasked = cache.readQuery({
            query: ConversationsScreen_Query
          });
          
          const conversations = useFragment(Conversations_QueryFragment, conversationsMasked);

          if (conversations) {
            cache.writeQuery<DocumentType<typeof Conversations_QueryFragment>>({
              query: ConversationsScreen_Query,
              data: {
                conversations: {
                  ...conversations?.conversations,
                  edges: [
                    { },
                    ...conversations.conversations.edges
                  ]
                } 
              }
            })
          }
          
        }*/
      },
      onCompleted(data, clientOptions) {
        if (data.createConversation) {
          router.back();
          router.navigate({
            pathname: "/(authenticated)/(conversations)/details/[id]",
            params: {
              id: data.createConversation.id,
            },
          });
        }
      },
    });
  };
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>New Conversation</Text>
        <TouchableOpacity style={styles.backButton} onPress={router.back}>
          <Text style={styles.backButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Text style={styles.searchText}>To:</Text>
        <TextInput
          name="search"
          control={control}
          border="none"
          size="medium"
          onChangeText={handleChangeText}
          autoFocus
        />
      </View>
      {data ? <UserList data={data} onPress={handleCreate} /> : null}
    </Container>
  );
};

export default CreateConversationScreen;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  backButtonText: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#FFF",
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  searchText: {
    fontFamily: "Inter",
    color: "#FFF",
  },
});

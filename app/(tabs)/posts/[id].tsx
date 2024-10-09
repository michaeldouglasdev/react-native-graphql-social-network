import { Avatar } from "@/components/avatar/avatar";
import { Container } from "@/components/grid/container";
import { HBox } from "@/components/grid/hbox";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import { Post } from "@/components/post/post.component";
import {
  OrderBy,
  PostDocument,
  PostQuery,
  PostQueryVariables,
  RepliesDocument,
  RepliesQuery,
  RepliesQueryVariables,
  ReplyPostDocument,
  ReplyPostMutation,
  ReplyPostMutationVariables,
} from "@/graphql/__generated__/graphql";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";
import { TextInput } from "@/components/input/text-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql } from "@/graphql/__generated__";

const PostScreen_Query = graphql(`
  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {
    post(id: $id) {
      id
      content
      author {
        id
        name
        username
      }
      createdAt
      replies(data: $dataReplies) {
        edges {
          cursor
          node {
            ...PostItem
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        count
      }
    }
  }
`);
interface FormField {
  reply: string;
}
const PostScreen: React.FC = () => {
  const client = useApolloClient();
  const { id }: { id: string } = useLocalSearchParams();
  const navigation = useNavigation();
  const { control, handleSubmit, reset } = useForm<FormField>();

  const { data } = useQuery(PostScreen_Query, {
    variables: {
      id: id,
      dataReplies: {
        connection: {
          first: 10,
        },
        order: {
          createdAt: OrderBy.Desc,
        },
      },
    },
    fetchPolicy: "cache-first",
  });

  const [repliesLazyExecute, { data: repliesDatalazy }] = useLazyQuery<
    RepliesQuery,
    RepliesQueryVariables
  >(RepliesDocument);
  const [replyMutation] = useMutation<
    ReplyPostMutation,
    ReplyPostMutationVariables
  >(ReplyPostDocument);

  useEffect(() => {
    const options: NativeStackNavigationOptions = {
      headerBackTitleVisible: false,
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#1A1919",
      },
      headerTintColor: "#F6009C",
    };
    navigation.setOptions(options);
  }, [navigation]);

  const handleReply: SubmitHandler<FormField> = (data) => {
    replyMutation({
      variables: {
        data: {
          content: data.reply,
          postId: id,
        },
      },
      onCompleted: () => {
        reset();
      },
    });
  };

  //console.log("repliesData", repliesData);
  //console.log("length", repliesData?.replies.edges.length);
  const handleFetchMore = async () => {
    if (!data?.post.replies.pageInfo.hasNextPage) {
      return;
    }
    const lastCursor = data.post.replies.pageInfo.endCursor;
    console.log("lastCursor", lastCursor);

    await repliesLazyExecute({
      variables: {
        data: {
          connection: {
            first: 10,
            after: lastCursor,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
          where: {
            parentPostId: {
              equals: id,
            },
          },
        },
      },
      onCompleted(data) {
        if (data?.replies) {
          client.cache.modify({
            id: client.cache.identify({
              __typename: "Post",
              id,
            }),
            fields: {
              replies(existing = { edges: [] }, { readField }) {
                const existingEdges = existing.edges || [];
                const newEdges = data.replies.edges || [];

                // Filter out duplicate edges
                const mergedEdges = [
                  ...existingEdges,
                  ...newEdges.filter(
                    (newEdge) =>
                      !existingEdges.some(
                        (existingEdge) =>
                          readField("id", existingEdge.node) ===
                          readField("id", newEdge.node)
                      )
                  ),
                ];

                console.log("oncompleted", data.replies);
                return {
                  ...existing,
                  edges: mergedEdges,
                  pageInfo: data.replies.pageInfo,
                };
              },
            },
          });
        }
      },
    });

    console.log("after fetchmore");
  };
  const renderItemPost = (
    data: ListRenderItemInfo<PostQuery["post"]["replies"]["edges"][number]>
  ) => {
    return (
      <Post post={data.item.node} key={data.item.node.id} index={data.index} />
    );
  };

  return (
    <Container style={styles.container} border={false}>
      <VBox>
        <HBox>
          <Avatar />
          <VBox>
            <Text style={styles.name}>{data?.post.author.name}</Text>
            <Text style={styles.username}>@{data?.post.author.username}</Text>
          </VBox>
        </HBox>

        <Text style={styles.content}>{data?.post.content}</Text>

        <HBox>
          <Text style={styles.span}>{data?.post.createdAt}</Text>
        </HBox>
        <VSeparator divider />

        <HBox>
          <Text style={styles.highlight}>{data?.post.replies.count}</Text>
          <Text style={styles.span}>comentários</Text>
        </HBox>
        <VSeparator divider />

        <HBox>
          <Text style={styles.highlight}>0</Text>
          <Text style={styles.span}>Likes</Text>
        </HBox>
        <VSeparator divider />
      </VBox>

      <HBox justifyContent="space-evenly" style={styles.iconContainer}>
        <FontAwesome name="comment-o" style={styles.icon} />
        <AntDesign name="retweet" style={styles.icon} />
        <FontAwesome name="heart-o" style={styles.icon} />
      </HBox>
      <VSeparator divider />
      {data?.post?.replies.edges && (
        <>
          <FlatList
            data={[
              //...data.post.replies.edges,
              ...(data.post?.replies.edges || []),
            ]}
            renderItem={renderItemPost}
            keyExtractor={(item) => item.node.id}
            onEndReached={handleFetchMore}
          />
        </>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          name="reply"
          borderType="rounded"
          control={control}
          onSubmitEditing={handleSubmit(handleReply)}
          placeholder="Type your text..."
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  name: {
    fontFamily: "InterBold",
    color: "#fff",
  },
  username: {
    fontFamily: "Inter",
    marginTop: 4,
    color: "#666",
  },
  content: {
    marginVertical: 24,
    fontFamily: "Inter",
    color: "white",
    fontSize: 16,
  },
  highlight: {
    color: "#fff",
    fontFamily: "InterBold",
    marginRight: 4,
    fontSize: 16,
  },
  span: {
    fontFamily: "Inter",
    color: "#666",
    alignSelf: "flex-end",
  },
  iconContainer: {
    paddingVertical: 4,
  },
  icon: {
    color: "#666",
    fontSize: 20,
  },
  inputWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopColor: "#333333",
    borderTopWidth: 1,
  },
});
export default PostScreen;

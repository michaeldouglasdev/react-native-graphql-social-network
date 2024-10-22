import { Container } from "@/components/grid/container";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInput } from "@/components/input/text-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { DocumentType, graphql } from "@/graphql/__generated__";
import {
  PostDetail,
  PostDetail_QueryFragment,
} from "@/components/post/post-detail/post-detail.component";

const LikePost_Mutation = graphql(`
  mutation LikePost($postId: ID!) {
    likePost(id: $postId)
  }
`);

const UnlikePost_Mutation = graphql(`
  mutation UnlikePost($postId: ID!) {
    unlikePost(id: $postId)
  }
`);

const PostScreen_Query = graphql(`
  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {
    ...PostDetail_QueryFragment
  }
`);

const ReplyPost_Mutation = graphql(`
  mutation ReplyPost($data: ReplyPostInput!) {
    replyPost(data: $data) {
      ...PostItem
    }
  }
`);
interface FormField {
  reply: string;
}
const PostScreen: React.FC = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { control, handleSubmit, reset } = useForm<FormField>();

  const { data, fetchMore } = useQuery(PostScreen_Query, {
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
    fetchPolicy: "cache-and-network",
  });

  const [replyMutation] = useMutation(ReplyPost_Mutation);

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
      update(cache, { data }) {
        const existing = cache.readQuery<
          DocumentType<typeof PostDetail_QueryFragment>
        >({
          query: PostScreen_Query,
          variables: {
            id,
            dataReplies: {
              connection: {
                first: 10,
              },
              order: {
                createdAt: OrderBy.Desc,
              },
            },
          },
        });

        if (!existing) {
          return;
        }

        const newEdge = {
          __typename: "PostEdge",
          // @ts-ignore
          cursor: data?.replyPost.id,
          node: data?.replyPost,
        };
        const existingEdge = existing?.post.replies.edges || [];

        const updatedReplies = {
          ...existing?.post.replies,
          edges: [newEdge, ...existingEdge],
          count: existing.post.replies.count + 1,
        };

        const updatedData = {
          ...existing,
          post: {
            ...existing.post,
            replies: updatedReplies,
          },
        };

        cache.writeQuery({
          query: PostScreen_Query,
          variables: {
            id,
            dataReplies: {
              connection: {
                first: 10,
              },
              order: {
                createdAt: OrderBy.Desc,
              },
            },
          },
          data: updatedData,
        });
      },
    });
  };

  return (
    <Container style={styles.container} border={false}>
      {data ? <PostDetail data={data} fetchMore={fetchMore} /> : null}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust based on your header height
      >
        <View style={styles.inputWrapper}>
          <TextInput
            name="reply"
            borderType="rounded"
            control={control}
            onSubmitEditing={handleSubmit(handleReply)}
            placeholder="Type your text..."
          />
        </View>
      </KeyboardAvoidingView>
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
  iconFill: {
    color: "#F6009C",
  },
  inputWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopColor: "#333333",
    borderTopWidth: 1,
  },
});
export default PostScreen;

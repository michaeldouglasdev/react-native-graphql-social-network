import { Avatar } from "@/components/avatar/avatar.component";
import { HBox } from "@/components/grid/hbox";
import { VBox } from "@/components/grid/vbox";
import { VSeparator } from "@/components/grid/vseparator";
import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  DocumentType,
  FragmentType,
  graphql,
  useFragment,
} from "@/graphql/__generated__";
import { Post, PostItemFragment } from "../post.component";
import { FetchMoreQueryOptions, useMutation } from "@apollo/client";
import {
  FeedPostInput,
  LikesInput,
  OrderBy,
} from "@/graphql/__generated__/graphql";

type PostDetailProps = {
  data: FragmentType<typeof PostDetail_QueryFragment>;
  fetchMore: (
    data: FetchMoreQueryOptions<
      { id: string; dataReplies: FeedPostInput; dataLikes: LikesInput },
      FragmentType<typeof PostDetail_QueryFragment>
    > & {
      updateQuery?: (
        previousQueryResult: FragmentType<typeof PostDetail_QueryFragment>,
        options: {
          fetchMoreResult: FragmentType<typeof PostDetail_QueryFragment>;
          variables: {
            id: string;
            dataReplies: FeedPostInput;
          };
        }
      ) => DocumentType<typeof PostDetail_QueryFragment>;
    }
  ) => void;
};

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

export const PostDetail_QueryFragment = graphql(`
  fragment PostDetail_QueryFragment on Query {
    post(id: $id) {
      id
      content
      author {
        id
        name
        username
        avatar
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
      likes {
        count
        byCurrentUser
      }
    }
  }
`);

export const PostDetail: React.FC<PostDetailProps> = ({
  fetchMore,
  ...props
}) => {
  const { post } = useFragment(PostDetail_QueryFragment, props.data);
  const [likePostMutation] = useMutation(LikePost_Mutation);
  const [unlikePostMutation] = useMutation(UnlikePost_Mutation);

  const handleLikeMainPost = async () => {
    await likePostMutation({
      variables: {
        postId: post.id,
      },
      update(cache) {
        cache.modify({
          id: `Post:${post.id}`,
          fields: {
            likes(existingLikes = {}) {
              const newCount = existingLikes.count + 1;
              return {
                ...existingLikes,
                count: newCount,
                byCurrentUser: true,
              };
            },
          },
        });
      },
      optimisticResponse: {
        likePost: true,
      },
    });
  };

  const handleUnlikeMainPost = async () => {
    await unlikePostMutation({
      variables: {
        postId: post.id,
      },
      update(cache) {
        cache.modify({
          id: `Post:${post.id}`,
          fields: {
            likes(existingLikes = {}) {
              const newCount = existingLikes.count - 1;
              return {
                ...existingLikes,
                count: newCount,
                byCurrentUser: false,
              };
            },
          },
        });
      },
      optimisticResponse: {
        unlikePost: true,
      },
    });
  };

  const handleFetchMore = async () => {
    if (!post.replies.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        id: post.id,
        dataReplies: {
          connection: {
            after: post.replies.pageInfo.endCursor,
            first: 10,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
          where: {
            parentPostId: {
              equals: post.id,
            },
          },
        },
      },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        const prev = useFragment(PostDetail_QueryFragment, previousQueryResult);
        const moreResults = useFragment(
          PostDetail_QueryFragment,
          fetchMoreResult
        );
        moreResults.post.replies.edges = [
          ...prev.post.replies.edges,
          ...moreResults.post.replies.edges,
        ];

        return moreResults;
      },
    });
  };

  const renderItemPost = (
    data: ListRenderItemInfo<{ node: FragmentType<typeof PostItemFragment> }>
  ) => {
    const reply = useFragment(PostItemFragment, data.item.node);

    return <Post data={data.item.node} key={reply.id} index={data.index} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={post?.replies.edges}
        renderItem={renderItemPost}
        keyExtractor={(item) => item.cursor}
        onEndReached={handleFetchMore}
        indicatorStyle="white"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={() => {
          return (
            <VBox>
              <VBox>
                <HBox>
                  <Avatar user={post.author} />
                  <VBox>
                    <Text style={styles.name}>{post.author.name}</Text>
                    <Text style={styles.username}>@{post.author.username}</Text>
                  </VBox>
                </HBox>

                <Text style={styles.content}>{post.content}</Text>

                <HBox>
                  <Text style={styles.span}>{post.createdAt}</Text>
                </HBox>
                <VSeparator divider />

                <HBox>
                  <Text style={styles.highlight}>{post.replies.count}</Text>
                  <Text style={styles.span}>
                    Comment{post.replies.count > 1 ? "s" : ""}
                  </Text>
                </HBox>
                <VSeparator divider />

                <HBox>
                  <Text style={styles.highlight}>{post.likes.count}</Text>
                  <Text style={styles.span}>
                    Like{post.likes.count > 1 ? "s" : ""}
                  </Text>
                </HBox>
                <VSeparator divider />
              </VBox>

              <HBox justifyContent="space-evenly" style={styles.iconContainer}>
                <FontAwesome name="comment-o" style={styles.icon} />
                <AntDesign name="retweet" style={styles.icon} />
                {post.likes.byCurrentUser ? (
                  <TouchableOpacity onPress={handleUnlikeMainPost}>
                    <FontAwesome
                      name="heart"
                      style={[styles.icon, styles.iconFill]}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleLikeMainPost}>
                    <FontAwesome name="heart-o" style={styles.icon} />
                  </TouchableOpacity>
                )}
              </HBox>
              <VSeparator divider />
            </VBox>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
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

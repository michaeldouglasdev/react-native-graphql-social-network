import { DocumentType, graphql } from "@/graphql/__generated__";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Post, PostItemFragment } from "../post/post.component";
import {
  FragmentType,
  useFragment,
} from "@/graphql/__generated__/fragment-masking";
import { FetchMoreQueryOptions, useMutation } from "@apollo/client";

export const Feed_QueryFragment = graphql(`
  fragment Feed_QueryFragment on Query {
    feed(data: $data) {
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
    }
  }
`);

type FeedProps = {
  data: FragmentType<typeof Feed_QueryFragment>;
  onFetchMore: () => void;
  /*onFetchMore: (
    data: FetchMoreQueryOptions<
      { data: FeedPostInput },
      FragmentType<typeof Feed_QueryFragment>
    > & {
      updateQuery?: (
        previousQueryResult: FragmentType<typeof Feed_QueryFragment>,
        options: {
          fetchMoreResult: FragmentType<typeof Feed_QueryFragment>;
          variables: {
            data: FeedPostInput;
            //dataLikes: LikesInput;
          };
        }
      ) => DocumentType<typeof Feed_QueryFragment>;
    }
  ) => void;*/
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

export const Feed: React.FC<FeedProps> = ({ onFetchMore, ...props }) => {
  const data = useFragment(Feed_QueryFragment, props.data);
  const [likePostMutation] = useMutation(LikePost_Mutation);
  const [unlikePostMutation] = useMutation(UnlikePost_Mutation);

  const handleLike = async (postId: string) => {
    await likePostMutation({
      variables: {
        postId: postId,
      },
      update(cache) {
        cache.modify({
          id: `Post:${postId}`,
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
          optimistic: true,
        });
      },
      optimisticResponse: {
        likePost: true,
      },
    });
  };

  const handleUnlike = async (postId: string) => {
    await unlikePostMutation({
      variables: {
        postId: postId,
      },
      update(cache) {
        cache.modify({
          id: `Post:${postId}`,
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

  const handleFetchMore = () => {
    onFetchMore();
  };

  const renderItemPost = (
    data: ListRenderItemInfo<{ node: FragmentType<typeof PostItemFragment> }>
  ) => {
    const post = useFragment(PostItemFragment, data.item.node);
    return (
      <Post
        data={data.item.node}
        key={post.id}
        onLike={handleLike}
        onUnlike={handleUnlike}
        index={data.index}
      />
    );
  };

  if (!data.feed) {
    return null;
  }

  return (
    <FlatList
      data={data.feed.edges}
      renderItem={renderItemPost}
      keyExtractor={(item) => item.cursor}
      onEndReachedThreshold={0.1}
      onEndReached={handleFetchMore}
      indicatorStyle="white"
    />
  );
};

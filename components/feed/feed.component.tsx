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

export const Feed: React.FC<FeedProps> = ({ onFetchMore, ...props }) => {
  const data = useFragment(Feed_QueryFragment, props.data);

  const handleFetchMore = () => {
    onFetchMore();
  };

  const renderItemPost = (
    data: ListRenderItemInfo<{ node: FragmentType<typeof PostItemFragment> }>
  ) => {
    const post = useFragment(PostItemFragment, data.item.node);
    return <Post data={data.item.node} key={post.id} index={data.index} />;
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

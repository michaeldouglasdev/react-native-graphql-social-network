import { graphql } from "@/graphql/__generated__";
import { ListRenderItemInfo } from "react-native";
import { Post, PostItemFragment } from "../post/post.component";
import {
  FragmentType,
  getFragmentData,
} from "@/graphql/__generated__/fragment-masking";
import { DocumentNode, useApolloClient } from "@apollo/client";
import { SwipeToDelete } from "../gestures/swipe-to-delete.component";
import Animated from "react-native-reanimated";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { Transition } from "../animations/transition.component";
import { useMeQuery } from "@/hooks/me.query.hook";

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
  dataQuery: DocumentNode;
};

export const Feed: React.FC<FeedProps> = ({
  onFetchMore,
  dataQuery,
  ...props
}) => {
  const feed = getFragmentData(Feed_QueryFragment, props.data);
  const client = useApolloClient();
  const { data } = useMeQuery();
  const handleFetchMore = () => {
    onFetchMore();
  };

  const renderItemPost = ({
    item,
    index,
  }: ListRenderItemInfo<{ node: FragmentType<typeof PostItemFragment> }>) => {
    const post = getFragmentData(PostItemFragment, item.node);
    const deletePost = () => {
      const filtered = feed.feed.edges.filter((edge) => edge.cursor != post.id);
      client.writeQuery({
        query: dataQuery,
        data: {
          feed: {
            ...feed.feed,
            edges: [...filtered],
          },
        },
        variables: {
          data: {
            where: {
              parentPostId: {
                equals: null,
              },
            },
            order: {
              createdAt: OrderBy.Desc,
            },
            connection: {
              first: 10,
            },
          },
        },
      });
    };
    return (
      <Transition index={index}>
        <SwipeToDelete
          onDelete={deletePost}
          enabled={post.author.id === data?.me.id}
        >
          <Post data={item.node} key={post.id} index={index} />
        </SwipeToDelete>
      </Transition>
    );
  };

  if (!feed.feed) {
    return null;
  }

  return (
    <Animated.FlatList
      data={feed.feed.edges}
      renderItem={renderItemPost}
      keyExtractor={(item) => item.cursor}
      onEndReachedThreshold={0.1}
      onEndReached={handleFetchMore}
      indicatorStyle="white"
    />
  );
};

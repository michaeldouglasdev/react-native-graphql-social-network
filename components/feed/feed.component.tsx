import { DocumentType, graphql } from "@/graphql/__generated__";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Post, PostItemFragment } from "../post/post.component";
import {
  FragmentType,
  useFragment,
} from "@/graphql/__generated__/fragment-masking";
import {
  DocumentNode,
  FetchMoreQueryOptions,
  useApolloClient,
  useMutation,
} from "@apollo/client";
import { SwipeToDelete } from "../gestures/swipe-to-delete.component";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideOutLeft,
} from "react-native-reanimated";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { HomeScreen_Query } from "@/app/(authenticated)/(tabs)/(posts)";
import { Transition } from "../animations/transition.component";

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
  const data = useFragment(Feed_QueryFragment, props.data);
  const client = useApolloClient();

  const handleFetchMore = () => {
    onFetchMore();
  };

  const renderItemPost = ({
    item,
    index,
  }: ListRenderItemInfo<{ node: FragmentType<typeof PostItemFragment> }>) => {
    const post = useFragment(PostItemFragment, item.node);
    const deletePost = () => {
      const filtered = data.feed.edges.filter((edge) => edge.cursor != post.id);
      client.writeQuery({
        query: dataQuery,
        data: {
          feed: {
            ...data.feed,
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
        <SwipeToDelete onDelete={deletePost}>
          <Post data={item.node} key={post.id} index={index} />
        </SwipeToDelete>
      </Transition>
    );
  };

  if (!data.feed) {
    return null;
  }

  return (
    <Animated.FlatList
      data={data.feed.edges}
      renderItem={renderItemPost}
      keyExtractor={(item) => item.cursor}
      onEndReachedThreshold={0.1}
      onEndReached={handleFetchMore}
      indicatorStyle="white"
    />
  );
};

import { router } from "expo-router";

import { Container } from "@/components/grid/container";
import { Post, PostData } from "@/components/post/post.component";
import {
  FeedDocument,
  FeedQuery,
  FeedQueryVariables,
  OrderBy,
} from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { FlatList, ListRenderItemInfo } from "react-native";

const Home: React.FC = () => {
  const { data, fetchMore } = useQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    {
      variables: {
        data: {
          connection: {
            first: 30,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
        },
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const renderItemPost = (
    data: ListRenderItemInfo<FeedQuery["feed"]["edges"][number]>
  ) => {
    return <Post post={data.item.node} key={data.item.node.id} />;
  };

  const handleFetchMore = () => {
    if (data?.feed.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          data: {
            connection: {
              first: 10,
              after: data?.feed.pageInfo.endCursor,
            },
            order: {
              createdAt: OrderBy.Desc,
            },
          },
        },
      });
    }
  };
  /*const handlePostPress = (post: PostData) => {
    router.navigate('')
  }*/
  return (
    <Container>
      {/*data?.posts ? (
        <FlashList
          data={data?.posts}
          renderItem={renderItemPost}
          estimatedItemSize={61}
        />
      ) : null*/}
      {!!data?.feed ? (
        <FlatList
          data={data?.feed.edges}
          renderItem={renderItemPost}
          keyExtractor={(item) => item.node.id}
          onEndReached={handleFetchMore}
        />
      ) : null}
    </Container>
  );
};

export default Home;

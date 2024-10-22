import { Container } from "@/components/grid/container";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { graphql, useFragment } from "@/graphql/__generated__";
import { Feed, Feed_QueryFragment } from "@/components/feed/feed.component";
import { FloatingButton } from "@/components/floating-button/floating-button.component";
import { useRouter } from "expo-router";

export const HomeScreen_Query = graphql(`
  query HomeScreen($data: FeedPostInput!) {
    ...Feed_QueryFragment
  }
`);

const Home: React.FC = () => {
  const router = useRouter();
  const { data, fetchMore } = useQuery(HomeScreen_Query, {
    variables: {
      data: {
        where: {
          parentPostId: {
            equals: null,
          },
        },
        connection: {
          first: 6,
        },
        order: {
          createdAt: OrderBy.Desc,
        },
      },
    },
  });

  const handleClickFloatingButton = () => {
    //router.navigate("/(authenticated)/create-post");
    router.navigate("/create-post");
  };
  const handleFetchMore = () => {
    const response = useFragment(Feed_QueryFragment, data);

    if (!response?.feed.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        data: {
          where: {
            parentPostId: null,
          },
          connection: {
            first: 10,
            after: response?.feed.pageInfo.endCursor,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
        },
      },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        const prev = useFragment(Feed_QueryFragment, previousQueryResult);
        const moreResult = useFragment(Feed_QueryFragment, fetchMoreResult);

        moreResult.feed.edges = [...prev.feed.edges, ...moreResult.feed.edges];

        return moreResult;
      },
    });
  };
  return (
    <Container>
      {data ? <Feed data={data} onFetchMore={handleFetchMore} /> : null}
      <FloatingButton iconName="plus" onPress={handleClickFloatingButton} />
    </Container>
  );
};

export default Home;

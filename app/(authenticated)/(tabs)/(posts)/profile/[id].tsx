import { Container } from "@/components/grid/container";
import { PostDetail_QueryFragment } from "@/components/post/post-detail/post-detail.component";
import {
  ProfileDetailListPost,
  ProfileDetailListPost_QueryFragment,
} from "@/components/profile-detail/profile-detail-list-post.component";
import {
  ProfileDetail,
  UserDetail_QueryFragment,
} from "@/components/profile-detail/profile-detail.component";
import { graphql, useFragment } from "@/graphql/__generated__";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { useMeQuery } from "@/hooks/me.query.hook";
import { useQuery } from "@apollo/client";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const ProfileScreen_Query = graphql(`
  query User(
    $id: ID!
    $dataFeed: FeedPostInput!
    $includeUser: Boolean = true
  ) {
    ...UserDetail_QueryFragment
    ...ProfileDetailListPost_QueryFragment
  }
`);
const ProfileScreen: React.FC = () => {
  const { id }: { id: string } = useLocalSearchParams();

  const { data, fetchMore } = useQuery(ProfileScreen_Query, {
    variables: {
      id,
      dataFeed: {
        where: {
          authorId: {
            equals: id,
          },
        },
        connection: {
          first: 10,
        },
        order: {
          createdAt: OrderBy.Desc,
        },
      },
    },
  });

  const handleFetchMore = () => {
    const feed = useFragment(ProfileDetailListPost_QueryFragment, data);

    if (!feed?.feed.pageInfo.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        id,
        dataFeed: {
          where: {
            authorId: {
              equals: id,
            },
          },
          connection: {
            first: 10,
            after: feed?.feed.pageInfo.endCursor,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
        },
        includeUser: false,
      },
      updateQuery(prevQueryResult, { fetchMoreResult }) {
        const prev = useFragment(
          ProfileDetailListPost_QueryFragment,
          prevQueryResult
        );
        const moreResult = useFragment(
          ProfileDetailListPost_QueryFragment,
          fetchMoreResult
        );

        moreResult.feed.edges = [...prev.feed.edges, ...moreResult.feed.edges];

        return {
          ...prev,
          ...moreResult,
        };
      },
    });
  };
  return (
    <Container>
      {data ? (
        <>
          <ProfileDetail data={data} />
          <ProfileDetailListPost data={data} onFetchMore={handleFetchMore} />
        </>
      ) : null}
    </Container>
  );
};

export default ProfileScreen;

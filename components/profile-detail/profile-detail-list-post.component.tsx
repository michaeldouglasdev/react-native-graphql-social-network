import React from "react";
import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Post, PostItemFragment } from "../post/post.component";

export const ProfileDetailListPost_QueryFragment = graphql(`
  fragment ProfileDetailListPost_QueryFragment on Query {
    feed(data: $dataFeed) {
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

type ProfileDetailListPostProps = {
  data: FragmentType<typeof ProfileDetailListPost_QueryFragment>;
  onFetchMore: () => void;
};
export const ProfileDetailListPost: React.FC<ProfileDetailListPostProps> = ({
  onFetchMore,
  ...props
}) => {
  const data = getFragmentData(ProfileDetailListPost_QueryFragment, props.data);

  const renderItemPost = (
    data: ListRenderItemInfo<{
      node: FragmentType<typeof PostItemFragment>;
    }>
  ) => {
    const post = getFragmentData(PostItemFragment, data.item.node);

    return <Post data={data.item.node} key={post.id} index={data.index} />;
  };

  const handleFetchMore = () => {
    onFetchMore();
  };
  return (
    <>
      {!!data.feed ? (
        <FlatList
          data={data.feed.edges}
          renderItem={renderItemPost}
          keyExtractor={(item) => item.cursor}
          onEndReached={handleFetchMore}
          onEndReachedThreshold={0.1}
          indicatorStyle="white"
        />
      ) : null}
    </>
  );
};

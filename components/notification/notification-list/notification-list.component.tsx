import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import React from "react";
import { ListRenderItemInfo, Text } from "react-native";
import {
  Notification,
  NotificationItemFragment,
} from "../notification.component";
import Animated, { LinearTransition } from "react-native-reanimated";

export const NotificationList_QueryFragment = graphql(/* GraphQL */ `
  fragment NotificationList_QueryFragment on Query {
    notifications(data: $data) {
      edges {
        cursor
        node {
          ...NotificationItem
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

type NotificationListProps = {
  data: FragmentType<typeof NotificationList_QueryFragment>;
};
export const NotificationList: React.FC<NotificationListProps> = (props) => {
  const data = useFragment(NotificationList_QueryFragment, props.data);

  const renderItem = (
    data: ListRenderItemInfo<{
      node: FragmentType<typeof NotificationItemFragment>;
    }>
  ) => {
    const notification = useFragment(NotificationItemFragment, data.item.node);

    return <Notification notification={data.item.node} key={notification.id} />;
  };

  return (
    <Animated.FlatList
      data={data.notifications.edges}
      renderItem={renderItem}
      itemLayoutAnimation={LinearTransition}
      keyExtractor={(item) => item.cursor}
    />
  );
};

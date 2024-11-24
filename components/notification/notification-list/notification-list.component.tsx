import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import React from "react";
import {
  Button,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Notification,
  NotificationItemFragment,
} from "../notification.component";
import Animated, { LinearTransition } from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

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
  const data = getFragmentData(NotificationList_QueryFragment, props.data);

  const renderItem = (
    data: ListRenderItemInfo<{
      node: FragmentType<typeof NotificationItemFragment>;
    }>
  ) => {
    const notification = getFragmentData(
      NotificationItemFragment,
      data.item.node
    );

    return <Notification notification={data.item.node} key={notification.id} />;
  };

  return (
    <Animated.FlatList
      data={data.notifications.edges}
      renderItem={renderItem}
      itemLayoutAnimation={LinearTransition}
      keyExtractor={(item) => item.cursor}
      contentContainerStyle={{ flex: 1 }}
      ListEmptyComponent={() => (
        <View style={styles.emptyStateContainer}>
          <SimpleLineIcons name="ghost" color={"#AAA"} size={64} />

          <Text style={styles.emptyStateText}>No notifications yet.</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
    marginHorizontal: 48,
    padding: 16,
    backgroundColor: "#232323",
    borderRadius: 48,
  },
  emptyStateText: {
    marginVertical: 16,
    color: "#CCC",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
  },
});

import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import { Container } from "@/components/grid/container";
import { useQuery, useSubscription } from "@apollo/client";

import { Notification } from "@/components/notification/notification.component";
import { graphql } from "@/graphql/__generated__";
import { NotificationItemFragment } from "@/graphql/__generated__/graphql";

const NotificationList_QueryFragment = graphql(/* GraphQL */ `
  fragment NotificationList_QueryFragment on Query {
    notifications {
      ...NotificationItem
    }
  }
`);

const NotificationScreen_Subscription = graphql(/* GraphQL */ `
  subscription Notification_ScreenSubscription {
    notificationSubscribe {
      ...NotificationItem
    }
  }
`);

const NotificationScreen_Query = graphql(/* GraphQL */ `
  query Notification_Query {
    ...NotificationList_QueryFragment
  }
`);
const NotificationsScreen: React.FC = () => {
  const { data: dataSubscription } = useSubscription(
    NotificationScreen_Subscription
  );

  console.log("dataSubscription", dataSubscription);
  const { data } = useQuery(NotificationScreen_Query);

  const renderItem = (data: ListRenderItemInfo<NotificationItemFragment>) => {
    return <Notification notification={data.item} />;
  };
  return (
    <Container>
      <FlatList data={data?.notifications} renderItem={renderItem} />
    </Container>
  );
};

export default NotificationsScreen;

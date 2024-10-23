import { Container } from "@/components/grid/container";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import { DocumentType, graphql, useFragment } from "@/graphql/__generated__";
import {
  NotificationList,
  NotificationList_QueryFragment,
} from "@/components/notification/notification-list/notification-list.component";
import { NotificationItemFragment } from "@/components/notification/notification.component";
import { NotificationEdge } from "@/graphql/__generated__/graphql";

const NotificationSubscribe_SubscriptionFragment = graphql(`
  fragment NotificationSubscribe_SubscriptionFragment on Subscription {
    notificationSubscribe {
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
  query Notifications($data: NotificationsInput!) {
    ...NotificationList_QueryFragment
  }
`);

const NotificationsScreen: React.FC = () => {
  const { data } = useQuery(NotificationScreen_Query, {
    variables: {
      data: {
        connection: {
          first: 2,
        },
      },
    },
  });
  useSubscription(NotificationScreen_Subscription, {
    onData(options) {
      console.log("Subscription onData", options);
      const { data, client } = options;
      const cacheData = client.cache.readQuery({
        query: NotificationScreen_Query,
      });
      const query = useFragment(NotificationList_QueryFragment, cacheData);

      const newNotification = useFragment(
        NotificationItemFragment,
        data.data?.notificationSubscribe
      );

      const newNotificationItem: any =
        data.data?.notificationSubscribe; /*= useFragment(
          NotificationItemFragment,
          newNotification?.notificationSubscribe
        );*/

      if (!query || !newNotification || !newNotificationItem) {
        return;
      }

      const newEdge = {
        cursor: newNotificationItem.id,
        node: newNotificationItem,
      };
      const notifications = [newEdge, ...query.notifications.edges];
      client.cache.writeQuery<
        DocumentType<typeof NotificationList_QueryFragment>
      >({
        query: NotificationScreen_Query,
        data: {
          notifications: {
            ...query.notifications,
            edges: notifications,
          },
        },
      });
    },
  });

  return (
    <Container>{data ? <NotificationList data={data} /> : null}</Container>
  );
};

export default NotificationsScreen;

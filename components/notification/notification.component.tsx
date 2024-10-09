import { graphql } from "@/graphql/__generated__";
import { NotificationItemFragment } from "@/graphql/__generated__/graphql";
import { ReplyPostNotification } from "./reply-post-notification.component";

function isReplyPostNotification(
  notification: NotificationItemFragment
): notification is NotificationItemFragment & {
  __typename: "ReplyPostNotification";
} {
  return notification.__typename === "ReplyPostNotification";
}

const NotificationItem = graphql(/* GraphQL */ `
  fragment NotificationItem on Notification {
    id
    createdAt
    fromUser {
      id
      name
      username
    }
    ... on ReplyPostNotification {
      post {
        id
        content
      }
    }
  }
`);

type NotificationProps = {
  notification: NotificationItemFragment;
};
export const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (isReplyPostNotification(notification)) {
    return <ReplyPostNotification notification={notification} />;
  }

  return null;
};

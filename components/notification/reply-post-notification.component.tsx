import { StyleSheet, Text, View } from "react-native";
import { VBox } from "../grid/vbox";
import { HBox } from "../grid/hbox";

import { Avatar } from "../avatar/avatar";
import {
  isReplyPostNotification,
  NotificationItemFragment,
} from "@/graphql/__generated__/graphql";

type NotificationProps = {
  notification: NotificationItemFragment & {
    __typename: "ReplyPostNotification";
  };
};

export const ReplyPostNotification: React.FC<NotificationProps> = ({
  notification,
}) => {
  return (
    <View style={styles.container}>
      <HBox>
        <Avatar />
        <VBox>
          <HBox>
            <Text style={styles.name}>{notification.fromUser.name}</Text>
            <Text style={styles.notificationText}>has replied your post</Text>
          </HBox>
          <Text style={styles.content}>{notification.post.content}</Text>
        </VBox>
      </HBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  name: {
    fontFamily: "InterBold",
    color: "#fff",
  },
  notificationText: {
    fontFamily: "Inter",
    color: "#fff",
    marginLeft: 12,
  },
  content: {
    paddingTop: 12,
    fontFamily: "Inter",
    color: "#AAA",
  },
});

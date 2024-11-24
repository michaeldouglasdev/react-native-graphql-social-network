import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { VBox } from "../grid/vbox";
import { HBox } from "../grid/hbox";

import { Avatar } from "../avatar/avatar.component";
import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import { useRouter } from "expo-router";

export const ReplyPostNotificationItemFragment = graphql(`
  fragment ReplyPostNotificationItem on ReplyPostNotification {
    id
    createdAt
    fromUser {
      id
      name
      username
      ...UserAvatar
    }
    post {
      id
      content
    }
  }
`);
type NotificationProps = {
  notification: FragmentType<typeof ReplyPostNotificationItemFragment>;
};

export const ReplyPostNotification: React.FC<NotificationProps> = (props) => {
  const notification = getFragmentData(
    ReplyPostNotificationItemFragment,
    props.notification
  );

  const router = useRouter();

  const handleClickPost = () => {
    router.navigate({
      pathname: "/(authenticated)/(tabs)/(posts)/details/[id]",
      params: {
        id: notification.post.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <HBox>
        <Avatar user={notification.fromUser} />
        <TouchableOpacity onPress={handleClickPost}>
          <VBox>
            <HBox>
              <Text style={styles.name}>{notification.fromUser.name}</Text>
              <Text style={styles.username}>
                @{notification.fromUser.username}
              </Text>

              <Text style={styles.notificationText}>has replied your post</Text>
            </HBox>
            <Text style={styles.content}>{notification.post.content}</Text>
          </VBox>
        </TouchableOpacity>
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
  username: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#aaa",
    marginLeft: 4,
    marginTop: 2,
  },
  notificationText: {
    fontFamily: "Inter",
    color: "#fff",
    marginLeft: 4,
  },
  content: {
    paddingTop: 12,
    fontFamily: "Inter",
    color: "#AAA",
  },
});

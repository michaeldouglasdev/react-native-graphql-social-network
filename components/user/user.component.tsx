import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "../avatar/avatar.component";
import { VBox } from "../grid/vbox";

export const UserItemFragment = graphql(`
  fragment UserItem on User {
    id
    name
    username
    ...UserAvatar
  }
`);

type UserProps = {
  data: FragmentType<typeof UserItemFragment>;
  onPress: (id: string) => void;
};
export const UserItem: React.FC<UserProps> = ({ onPress, ...props }) => {
  const user = useFragment(UserItemFragment, props.data);

  if (!user) {
    return null;
  }

  const handlePress = () => {
    onPress(user.id);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Avatar user={user} />
      <VBox hPadding="small">
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </VBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  name: {
    color: "#FFF",
  },
  username: {
    color: "#AAA",
  },
});

import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import { useMeQuery } from "@/hooks/me.query.hook";
import { StyleSheet, Text, View } from "react-native";

export const MessageItemFragment = graphql(`
  fragment MessageItem on Message {
    id
    content
    createdAt
    sender {
      id
      name
      username
      ...UserAvatar
    }
  }
`);

type MessageProps = {
  data: FragmentType<typeof MessageItemFragment>;
};
export const Message: React.FC<MessageProps> = (props) => {
  const message = useFragment(MessageItemFragment, props.data);
  const { data } = useMeQuery();
  const senderIsMe = message.sender.id === data?.me.id;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, senderIsMe && styles.textMe]}>
        {message.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    fontFamily: "Inter",
    color: "#FFF",
    padding: 8,
    backgroundColor: "#333333",
    alignSelf: "flex-start",
    borderRadius: 12,
    overflow: "hidden",
  },
  textMe: {
    backgroundColor: "#F6009C",
    alignSelf: "flex-end",
  },
});

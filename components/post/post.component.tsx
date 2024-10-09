import { router } from "expo-router";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

import { HBox } from "../grid/hbox";
import { Avatar } from "../avatar/avatar";
import { VBox } from "../grid/vbox";
import { graphql } from "@/graphql/__generated__";
import {
  FragmentType,
  getFragmentData,
} from "@/graphql/__generated__/fragment-masking";
import { PostItemFragment } from "@/graphql/__generated__/graphql";

const PostItemFragment2 = graphql(`
  fragment PostItem on Post {
    id
    content
    createdAt
    author {
      id
      name
      username
    }
    replies {
      count
    }
  }
`);

interface PostProps {
  post: PostItemFragment; //FragmentType<typeof PostItemFragment>; //PostItemFragment;
  index?: number;
}
export const Post: React.FC<PostProps> = ({ index = 0, post, ...props }) => {
  //const post = getFragmentData(PostItemFragment, props.post);

  const handlePostPress = () => {
    router.navigate({
      pathname: "/(tabs)/posts/[id]",
      params: {
        id: post.id,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePostPress}>
      <View style={styles.container}>
        <HBox>
          <Avatar />

          <VBox>
            <HBox>
              <Text style={styles.name}>{post.author.name}</Text>
              <Text style={styles.username}>@{post.author.username} · </Text>
              <Text style={styles.createdAt}>{post.createdAt}</Text>
              <Text style={styles.name}>- {index}</Text>
            </HBox>
            <Text style={styles.content}>{post.content}</Text>

            <HBox>
              <HBox>
                <FontAwesome name="comment-o" style={styles.icon} />
                <Text style={styles.iconLabel}>{post.replies.count}</Text>
              </HBox>
              <HBox>
                <AntDesign name="retweet" style={styles.icon} />
                <Text style={styles.iconLabel}>0</Text>
              </HBox>
              <HBox>
                <FontAwesome name="heart-o" style={styles.icon} />
                <Text style={styles.iconLabel}>0</Text>
              </HBox>
            </HBox>
          </VBox>
        </HBox>
      </View>
    </TouchableOpacity>
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
    marginLeft: 8,
  },
  createdAt: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#aaa",
  },
  content: {
    fontFamily: "Inter",
    color: "#eee",
    marginTop: 16,
    marginBottom: 8,
  },
  icon: {
    color: "#FFF",
    fontSize: 16,
  },
  iconLabel: {
    color: "#FFF",
    marginLeft: 8,
    marginRight: 56,
  },
});

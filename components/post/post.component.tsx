import { router, useRouter } from "expo-router";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

import { HBox } from "../grid/hbox";
import { Avatar } from "../avatar/avatar.component";
import { VBox } from "../grid/vbox";
import { graphql } from "@/graphql/__generated__";
import {
  FragmentType,
  useFragment,
} from "@/graphql/__generated__/fragment-masking";
//import { PostItemFragment } from "@/graphql/__generated__/graphql";

export const PostItemFragment = graphql(`
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
    likes {
      count
      byCurrentUser
    }
  }
`);

interface PostProps {
  data: FragmentType<typeof PostItemFragment>;
  index?: number;
  onLike: (postId: string) => void;
  onUnlike: (postId: string) => void;
}
export const Post: React.FC<PostProps> = ({
  index = 0,
  onLike,
  onUnlike,
  ...props
}) => {
  const router = useRouter();
  const post = useFragment(PostItemFragment, props.data);

  const handleLike = () => {
    onLike(post.id);
  };

  const handleUnlike = () => {
    onUnlike(post.id);
  };

  const handlePostPress = () => {
    router.navigate({
      pathname: "/(authenticated)/(tabs)/(posts)/details/[id]",
      //pathname: "/(tabs)/(posts)/details/[id]",

      params: {
        id: post.id,
      },
    });
  };

  const handleClickAvatar = () => {
    router.navigate({
      pathname: "/(authenticated)/(tabs)/(posts)/profile/[id]",
      //pathname: "/(tabs)/(posts)/profile/[id]",

      params: {
        id: post.author.id,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePostPress}>
      <View style={styles.container}>
        <HBox>
          <TouchableOpacity onPress={handleClickAvatar}>
            <Avatar user={post.author} />
          </TouchableOpacity>
          <VBox expanded>
            <HBox justifyContent="space-between">
              <HBox>
                <Text style={styles.name}>{post.author.name}</Text>
                <Text style={styles.username}>@{post.author.username} · </Text>
                <Text style={styles.createdAt}>{post.createdAt}</Text>
              </HBox>
              <Text style={styles.index}># {index}</Text>
            </HBox>
            <Text style={styles.content}>{post.content}</Text>
            <Text style={styles.content}>{post.id}</Text>

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
                {post.likes.byCurrentUser ? (
                  <TouchableOpacity onPress={handleUnlike}>
                    <FontAwesome
                      name="heart"
                      style={[styles.icon, styles.iconFill]}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleLike}>
                    <FontAwesome name="heart-o" style={styles.icon} />
                  </TouchableOpacity>
                )}
                <Text style={styles.iconLabel}>{post.likes.count}</Text>
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
  iconFill: {
    color: "#F6009C",
  },
  iconLabel: {
    color: "#FFF",
    marginLeft: 8,
    marginRight: 56,
  },
  index: {
    color: "#aaa",
    fontSize: 11,
  },
});

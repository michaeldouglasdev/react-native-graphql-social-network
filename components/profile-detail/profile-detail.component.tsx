import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../avatar/avatar.component";
import { FragmentType, graphql, useFragment } from "@/graphql/__generated__";
import { VBox } from "../grid/vbox";
import { HBox } from "../grid/hbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { VSeparator } from "../grid/vseparator";
import { Button } from "../button/button";
import { MeQuery, useMeQuery } from "@/hooks/me.query.hook";
import { useMutation } from "@apollo/client";

export const FollowUser_Mutation = graphql(`
  mutation FollowUser($id: ID!) {
    followUser(id: $id)
  }
`);
export const UnfollowUser_Mutation = graphql(`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id)
  }
`);

export const UserDetail_QueryFragment = graphql(`
  fragment UserDetail_QueryFragment on Query {
    user(id: $id) @include(if: $includeUser) {
      id
      name
      username
      createdAt
      followers {
        count
        byCurrentUser
      }
      following {
        count
        byCurrentUser
      }
    }
  }
`);

type ProfileDetailProps = {
  data: FragmentType<typeof UserDetail_QueryFragment>;
};
export const ProfileDetail: React.FC<ProfileDetailProps> = (props) => {
  const { user } = useFragment(UserDetail_QueryFragment, props.data);
  const { data: me } = useMeQuery();
  const [followUser] = useMutation(FollowUser_Mutation);
  const [unfollowUser] = useMutation(UnfollowUser_Mutation);

  if (!user) {
    return;
  }

  const handleFollowUser = () => {
    followUser({
      variables: {
        id: user.id,
      },
      update(cache) {
        if (me?.me) {
          cache.modify({
            id: `User:${me.me.id}`,
            fields: {
              following(existing) {
                const newCount = existing.count + 1;
                return {
                  ...existing,
                  count: newCount,
                };
              },
            },
          });
        }
        if (user) {
          cache.modify({
            id: `User:${user.id}`,
            fields: {
              followers(existing) {
                const newCount = existing.count + 1;
                return {
                  ...existing,
                  count: newCount,
                  byCurrentUser: true,
                };
              },
            },
          });
        }
      },
    });
  };

  const handleUnfollowUser = () => {
    unfollowUser({
      variables: {
        id: user.id,
      },
      update(cache) {
        if (me?.me) {
          cache.modify({
            id: `User`,
            fields: {
              following(existing) {
                const newCount = existing.count + 1;
                return {
                  ...existing,
                  count: newCount,
                };
              },
            },
          });
        }
        if (user) {
          cache.modify({
            id: `User:${user.id}`,
            fields: {
              followers(existing) {
                const newCount = existing.count - 1;
                return {
                  ...existing,
                  count: newCount,
                  byCurrentUser: false,
                };
              },
            },
          });
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <VBox>
        <HBox justifyContent="space-between">
          <View>
            <Avatar size="xlarge" style={styles.avatar} />
          </View>
          <View style={styles.profileActions}>
            {me?.me.id === user.id ? (
              <Button
                title="Edit Profile"
                variant="white"
                borderRadius="rounded"
                size="xsmall"
                outline
                outlineGhost
                width={120}
                onPress={() => null}
              />
            ) : user.followers.byCurrentUser ? (
              <Button
                title="Following"
                variant="white"
                borderRadius="rounded"
                size="xsmall"
                outline
                outlineGhost
                width={120}
                onPress={handleUnfollowUser}
              />
            ) : (
              <Button
                title="Follow"
                variant="white"
                borderRadius="rounded"
                size="xsmall"
                width={120}
                onPress={handleFollowUser}
              />
            )}
          </View>
        </HBox>
        <View style={styles.content}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.description}>Senior Software Engineer</Text>

          <HBox alignItems="center" vMargin="small">
            <AntDesign name="calendar" style={styles.icon} />
            <Text style={styles.span}>Joined at {user.createdAt}</Text>
          </HBox>

          <HBox>
            <HBox>
              <Text style={styles.bold}>{user.following.count}</Text>
              <Text style={styles.span}>Following</Text>
            </HBox>
            <HBox hMargin="small">
              <Text style={styles.bold}>{user.followers.count}</Text>
              <Text style={styles.span}>Followers</Text>
            </HBox>
          </HBox>
        </View>
      </VBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  background: {
    backgroundColor: "#F6009C",
    height: 160,
    width: "100%",
  },
  avatar: {
    position: "absolute",
    top: -36,
  },
  profileActions: {
    paddingVertical: 12,
  },
  content: {},
  name: {
    fontFamily: "InterBold",
    fontSize: 24,
    color: "#fff",
  },
  username: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#666",
  },
  description: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
  },
  span: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  icon: {
    fontSize: 16,
    color: "#666",
  },
  bold: {
    fontFamily: "InterBold",
    fontSize: 16,
    color: "#fff",
  },
});
